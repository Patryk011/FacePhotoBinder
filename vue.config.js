const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  transpileDependencies: true,
});
