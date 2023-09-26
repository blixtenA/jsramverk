const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
    transpileDependencies: true,
    // Other Vue CLI configurations go here
});

module.exports.publicPath = "./"; // You can add other configurations here
