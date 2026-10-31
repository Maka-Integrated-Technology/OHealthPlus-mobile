import assert from "node:assert/strict";
import test from "node:test";

import { acceptedAdvisories, evaluateAudit } from "./dependency-audit-policy.mjs";

const beforeDeadline = new Date("2026-10-03T00:00:00Z");

function auditFor(packageName, url) {
  return {
    metadata: { vulnerabilities: { total: 1 } },
    vulnerabilities: {
      [packageName]: {
        via: [{ title: "test advisory", url }],
      },
    },
  };
}

for (const [id, advisory] of acceptedAdvisories) {
  test(`accepts reviewed advisory ${id} for ${advisory.packageName}`, () => {
    const audit = auditFor(
      advisory.packageName,
      `https://github.com/advisories/${id}`,
    );

    assert.equal(evaluateAudit(audit, beforeDeadline).length, 1);
  });
}

test("requires ownership and an expiry date for every temporary exception", () => {
  for (const advisory of acceptedAdvisories.values()) {
    assert.equal(advisory.reviewBy, "2026-11-14");
    assert.match(advisory.reason, /OHealthPlus-mobile\/issues\/50/);
  }
});

test("rejects an advisory that is not explicitly reviewed", () => {
  const audit = auditFor(
    "example-package",
    "https://github.com/advisories/GHSA-aaaa-bbbb-cccc",
  );

  assert.throws(() => evaluateAudit(audit, beforeDeadline), /Unapproved dependency advisories/);
});

test("rejects an accepted advisory reported against another package", () => {
  const audit = auditFor(
    "example-package",
    "https://github.com/advisories/GHSA-gcqx-w48m-w2h4",
  );

  assert.throws(() => evaluateAudit(audit, beforeDeadline), /Unapproved dependency advisories/);
});

test("accepts a transitive finding only when it reaches a reviewed advisory", () => {
  const audit = auditFor(
    "deepmerge",
    "https://github.com/advisories/GHSA-gcqx-w48m-w2h4",
  );
  audit.vulnerabilities["@expo/config"] = { via: ["deepmerge"] };
  audit.metadata.vulnerabilities.total = 2;

  assert.equal(evaluateAudit(audit, beforeDeadline).length, 1);
});

test("rejects a transitive finding with a missing advisory root", () => {
  const audit = {
    metadata: { vulnerabilities: { total: 1 } },
    vulnerabilities: {
      "@expo/config": { via: ["deepmerge"] },
    },
  };

  assert.throws(() => evaluateAudit(audit, beforeDeadline), /missing advisory dependency/);
});

test("accepts a dependency cycle when it also reaches a reviewed root", () => {
  const audit = auditFor(
    "deepmerge",
    "https://github.com/advisories/GHSA-gcqx-w48m-w2h4",
  );
  audit.vulnerabilities["@expo/config"] = { via: ["expo", "deepmerge"] };
  audit.vulnerabilities.expo = { via: ["@expo/config"] };
  audit.metadata.vulnerabilities.total = 3;

  assert.equal(evaluateAudit(audit, beforeDeadline).length, 1);
});

test("rejects expired advisory exceptions", () => {
  const audit = auditFor(
    "deepmerge",
    "https://github.com/advisories/GHSA-gcqx-w48m-w2h4",
  );

  assert.throws(
    () => evaluateAudit(audit, new Date("2026-11-15T00:00:00Z")),
    /exception expired/,
  );
});

test("rejects unsupported audit output", () => {
  assert.throws(() => evaluateAudit({}), /unsupported result/);
});

test("rejects audit output with inconsistent vulnerability metadata", () => {
  const audit = auditFor(
    "deepmerge",
    "https://github.com/advisories/GHSA-gcqx-w48m-w2h4",
  );
  audit.metadata.vulnerabilities.total = 0;

  assert.throws(() => evaluateAudit(audit), /inconsistent vulnerability metadata/);
});
