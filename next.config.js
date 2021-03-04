module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });
    return config;
  },
  images: {
    domains: ["media.rawg.io", "storage.googleapis.com"],
  },
};
