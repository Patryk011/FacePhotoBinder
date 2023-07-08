const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "https://photo-binder.onrender.com",
    },
  },
  transpileDependencies: true,
});
