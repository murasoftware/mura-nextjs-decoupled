module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) {

    let newPathMap = {...defaultPathMap};
    delete newPathMap['/edit/[...page]'];
    return newPathMap;
  },
};
