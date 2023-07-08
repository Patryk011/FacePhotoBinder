const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    port: process.env.PORT || 8080,
    host: "0.0.0.0",
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "https://photo-binder.onrender.com",
    },
  },
  transpileDependencies: true,
});
