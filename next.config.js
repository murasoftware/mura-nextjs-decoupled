// next.config.js
const withTM = require('next-transpile-modules')(['mura.js'],{resolveSymlinks:true}); // pass the modules you would like to see transpiled

module.exports = withTM({
  exportTrailingSlash: true,
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) {

    let newPathMap = {...defaultPathMap};
    delete newPathMap['/edit/[...page]'];
    return newPathMap;
  },
});
