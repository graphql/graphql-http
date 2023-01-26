import { Audit, serverAudits } from '../audits';

it('should have globally unique audit ids', () => {
  const ids: string[] = [];

  for (const audit of serverAudits({
    url: 'http://localhost',
    fetchFn: () => {
      // noop
    },
  })) {
    expect(ids).not.toContain(audit.id);
    ids.push(audit.id);
  }
});

it('should not change globally unique audit ids', () => {
  const audits: Omit<Audit, 'fn'>[] = [];

  serverAudits({
    url: 'http://localhost',
    fetchFn: () => {
      // noop
    },
  }).forEach(({ fn, ...audit }) => audits.push(audit));

  // update me if new audits are added or deleted,
  // but existing ones SHOULD NOT CHANGE semantically
  expect(audits).toMatchSnapshot();
});
