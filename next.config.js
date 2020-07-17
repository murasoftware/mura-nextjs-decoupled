module.exports = {
  exportTrailingSlash: true,
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId },
  ) {
    let newPathMap = { ...defaultPathMap };
    delete newPathMap['/edit/[...page]'];
    return newPathMap;
  },
  env: {
    YOUTUBE_API_KEY: 'AIzaSyBclsDr4KBSDGPxso1FdKF0Hcn0Z4ky8Uk',
    YOUTUBE_API: 'https://www.googleapis.com/youtube/v3/videos',
  },
};
