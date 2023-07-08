const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    allowedHosts: [".onrender.com"],
  },
  transpileDependencies: true,
});
