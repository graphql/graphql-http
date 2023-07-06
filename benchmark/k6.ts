import { check, fail } from 'k6';
import { Options } from 'k6/options';
import { Counter, Trend } from 'k6/metrics';
import http, { RefinedResponse } from 'k6/http';

const port = parseInt(__ENV.PORT || '');
if (isNaN(port)) {
  throw new Error('Missing PORT environment variable!');
}

export const options: Options = {
  scenarios: {
    get: {
      executor: 'constant-vus',
      vus: 20,
      duration: '10s',
      gracefulStop: '3s',
      env: { SCENARIO: 'get' },
    },
    post: {
      executor: 'constant-vus',
      vus: 20,
      duration: '10s',
      gracefulStop: '3s',
      env: { SCENARIO: 'post' },
    },
  },
};

const scenarioMetrics: Record<
  string,
  { runs: Counter; oks: Counter; duration: Trend }
> = {};
for (const scenario of Object.keys(options.scenarios || {})) {
  scenarioMetrics[scenario] = {
    runs: new Counter(`query_runs(${scenario})`),
    oks: new Counter(`query_oks(${scenario})`),
    duration: new Trend(`query_duration(${scenario})`, true),
  };
}

export default function () {
  const scenario = __ENV.SCENARIO;
  const metrics = scenarioMetrics[scenario];
  if (!metrics) {
    fail(`unavailable metrics for scenario ${scenario}`);
  }

  const begin = Date.now();
  metrics.runs.add(1);

  let res: RefinedResponse<'text'>;
  switch (scenario) {
    case 'get':
      res = http.get(`http://localhost:${port}/graphql?query={hello}`);
      break;
    case 'post':
      res = http.post(
        `http://localhost:${port}/graphql`,
        JSON.stringify({ query: '{hello}' }),
        { headers: { 'Content-Type': 'application/json' } },
      );
      break;
    default:
      fail(`unexpected scenario ${scenario}`);
  }
  const ok = check(res, {
    'status is 200': (res) => res.status === 200,
    'headers contain application/json content-type': (res) =>
      String(res.headers['Content-Type']).includes('application/json'),
    'response is {"data":{"hello":"world"}}': (res) =>
      res.body === '{"data":{"hello":"world"}}',
  });

  metrics.oks.add(ok ? 1 : 0);

  metrics.duration.add(Date.now() - begin);
}
