const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        win: {
          icon: 'public/icons/icon.ico',
        },
        mac: {
          icon: './public/app.png'
        },
        productName: '中控台'
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
