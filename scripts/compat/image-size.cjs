const fs = require("node:fs");
const path = require("node:path");

function createImageSizeCompatibility(imageSizeModule) {
  function imageSize(input) {
    const data = typeof input === "string" ? fs.readFileSync(input) : input;
    return imageSizeModule.imageSize(data);
  }

  return Object.assign(imageSize, imageSizeModule, {
    default: imageSize,
    imageSize,
  });
}

function installImageSizeCompatibility() {
  const metroDirectory = path.dirname(require.resolve("metro/package.json"));
  const modulePath = require.resolve("image-size", { paths: [metroDirectory] });
  const imageSizeModule = require(modulePath);
  const compatibilityModule = createImageSizeCompatibility(imageSizeModule);
  require.cache[modulePath].exports = compatibilityModule;
  return compatibilityModule;
}

module.exports = {
  createImageSizeCompatibility,
  installImageSizeCompatibility,
};
