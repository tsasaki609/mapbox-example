module.exports = {
  devServer: {
    proxy: {
      "^/search/local": {
        target: "https://map.yahooapis.jp",
        changeOrigin: true
      },
      "^/search": {
        target: "https://www.google.com",
        changeOrigin: true
      }
    }
  }
};
