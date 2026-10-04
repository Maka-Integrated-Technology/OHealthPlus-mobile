import assert from "node:assert/strict";
import test from "node:test";

import { evaluateAudit } from "./dependency-audit-policy.mjs";

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

test("accepts a reviewed advisory for its expected package", () => {
  const audit = auditFor(
    "braces",
    "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm",
  );

  assert.equal(evaluateAudit(audit, beforeDeadline).length, 1);
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
    "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm",
  );

  assert.throws(() => evaluateAudit(audit, beforeDeadline), /Unapproved dependency advisories/);
});

test("accepts a transitive finding only when it reaches a reviewed advisory", () => {
  const audit = auditFor(
    "braces",
    "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm",
  );
  audit.vulnerabilities.micromatch = { via: ["braces"] };
  audit.metadata.vulnerabilities.total = 2;

  assert.equal(evaluateAudit(audit, beforeDeadline).length, 1);
});

test("rejects a transitive finding with a missing advisory root", () => {
  const audit = {
    metadata: { vulnerabilities: { total: 1 } },
    vulnerabilities: {
      micromatch: { via: ["braces"] },
    },
  };

  assert.throws(() => evaluateAudit(audit, beforeDeadline), /missing advisory dependency/);
});

test("accepts a dependency cycle when it also reaches a reviewed root", () => {
  const audit = auditFor(
    "braces",
    "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm",
  );
  audit.vulnerabilities.metro = { via: ["metro-config", "braces"] };
  audit.vulnerabilities["metro-config"] = { via: ["metro"] };
  audit.metadata.vulnerabilities.total = 3;

  assert.equal(evaluateAudit(audit, beforeDeadline).length, 1);
});

test("rejects expired advisory exceptions", () => {
  const audit = auditFor(
    "braces",
    "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm",
  );

  assert.throws(
    () => evaluateAudit(audit, new Date("2026-11-04T00:00:00Z")),
    /exception expired/,
  );
});

test("rejects unsupported audit output", () => {
  assert.throws(() => evaluateAudit({}), /unsupported result/);
});

test("rejects audit output with inconsistent vulnerability metadata", () => {
  const audit = auditFor(
    "braces",
    "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm",
  );
  audit.metadata.vulnerabilities.total = 0;

  assert.throws(() => evaluateAudit(audit), /inconsistent vulnerability metadata/);
});
