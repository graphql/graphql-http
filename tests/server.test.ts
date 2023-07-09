import { it } from 'vitest';
import { createTHandler } from './utils/thandler';
import { serverAudits } from '../src/audits/server';
import { schema } from './fixtures/simple';

const { fetch } = createTHandler({ schema });

for (const audit of serverAudits({ url: 'http://localhost', fetchFn: fetch })) {
  it(audit.name, async () => {
    const result = await audit.fn();
    if (result.status !== 'ok') {
      throw result.reason;
    }
  });
}
