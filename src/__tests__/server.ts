import fetch from 'node-fetch';
import { serverAudits } from '../test/server';

import { schema } from './fixtures/simple';
import { startTServer } from './utils/tserver';

const server = startTServer({ schema });

const audits = serverAudits({ url: server.url, fetchFn: fetch });
for (const audit of audits) {
  it(audit.name, async () => {
    const result = await audit.fn();
    if (result.status !== 'ok') {
      throw result.reason;
    }
  });
}
