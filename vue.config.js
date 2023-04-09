const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://1.116.64.64:5004/',
          changeOrigin: true
        }
      }
    },
    // 结局报fs模块找不到的bug
    resolve: {
      fallback:{
        fs: false
      }
    },
    externals: {
      './cptable': 'var cptable',
    },
    plugins: [new NodePolyfillPlugin()]
  },

}



// module.exports = {
//     chainWebpack: config => {
//      }, devServer: {
//          proxy:
//          {
//              '/api':
//              {
//                  target: 'http://1.116.64.64:5004/',  
//                  changeOrigin: true,
//              },
//          },
//      }
//  }