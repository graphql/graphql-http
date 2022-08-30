import fetch from 'node-fetch';
import { serverAudits } from '../audits/server';

import { schema } from './fixtures/simple';
import { startTServer } from './utils/tserver';

const server = startTServer({ schema });

for (const audit of serverAudits({ url: server.url, fetchFn: fetch })) {
  it(audit.name, async () => {
    const result = await audit.fn();
    if (result.status !== 'ok') {
      throw result.reason;
    }
  });
}
