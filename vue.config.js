const path = require('path')
const themePath = path.resolve(__dirname, 'src/assets/theme/default/index.less')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${themePath}";`
        }
      },
      css: {
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
        modules: {
          localIdentName: '[name]-[hash]'
        },
        localsConvention: 'camelCaseOnly'
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@views', path.resolve('src/views'))
      .set('@comp', path.resolve('src/components'))
      .set('@img', path.resolve('src/assets/images'))
      .set('@data', path.resolve('src/assets/data'))
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://www.sportlive8.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
      '/ws': {
        target: 'http://www.sportlive8.com',
        changeOrigin: true,
        pathRewrite: {
          '^/ws': '/ws'
        },
        ws: true
      }
    }
    // https: true
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
}
