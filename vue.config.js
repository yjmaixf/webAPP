const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: 'public/icons/icon.ico',
        },
      },
      chainWebpackMainProcess: (config) => {
        config.output.filename((file) => {
          if (file.chunk.name === "index") {
            return "background.js";
          } else {
            return "[name].js";
          }
        });
      },
    },
  },
  transpileDependencies: true,
})
