const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const { installImageSizeCompatibility } = require("./image-size.cjs");

const imageSize = installImageSizeCompatibility();
const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

test("reads dimensions from a byte buffer", () => {
  assert.deepEqual(imageSize(onePixelPng), {
    height: 1,
    type: "png",
    width: 1,
  });
});

test("preserves Metro's file-path input contract", (context) => {
  const fixtureDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "image-size-compat-"));
  const fixturePath = path.join(fixtureDirectory, "pixel.png");
  context.after(() => fs.rmSync(fixtureDirectory, { force: true, recursive: true }));
  fs.writeFileSync(fixturePath, onePixelPng);

  assert.deepEqual(imageSize(fixturePath), {
    height: 1,
    type: "png",
    width: 1,
  });
});
