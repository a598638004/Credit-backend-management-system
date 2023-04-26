const { defineConfig } = require('@vue/cli-service');
const TerserPlugin = require("terser-webpack-plugin");
const isProduction = process.env.NODE_ENV === 'production'
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

let plugins = [];
let externals = {
    // '你import form的东西': 'CDN向外暴露的对象名'
};
let cdn = {
    build:{
        js:[
            "https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js",
            "https://unpkg.com/vuex@3.6.2/dist/vuex.min.js",
            'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
            'https://unpkg.com/vue-router@3.6.5/dist/vue-router.min.js',
        ]
    },
    dev:{
        js:[],
        css:[]
    }
}


// 是生产环境
if (isProduction) {
    plugins.push(new NodePolyfillPlugin())

    // CDN优化 不处理，而是全局使用右边的名字遍历
    externals = {
        vue:'Vue',
        'vue-router':'VueRouter',
        axios:'axios',
        vuex:'Vuex'
    }

    // 压缩混淆
    plugins.push(new TerserPlugin({
        terserOptions: {
            output: {
                comments: false, // 去除注释
            },
            warnings: false, // 去除黄色警告,
            compress: {
                drop_console: true,
                drop_debugger: true, // 特定情况需要利用debugger防止调试
                pure_funcs: ['console.log'], // 移除console.log 避免console.error
            }
        }
    }))
    // Gzip压缩大于10kb以上的js|json|css文件
    plugins.push(new CompressionWebpackPlugin({
        test:/\.(js|json|css)$/i,  // 图片一般不Gzip压缩 webpack-image-loader
        threshold:10240, // 只有在10kb以上才压缩
    }))
}



module.exports = {

    ...defineConfig({
        transpileDependencies: true
    }),
    productionSourceMap:!isProduction,
    configureWebpack: {
        devServer: {
            // open: true,
            // host: '127.0.0.1',
            proxy: {
                '/api': {
                    logLevel: 'debug',
                    // "@vue/cli-service": "~5.0.0",
                    logProvider:()=>console,
                    target: 'http://1.116.64.64:5004/',
                }
            }
        },
        plugins,
        externals
    },
    // 再加工
    chainWebpack(config){
        // 去除html-webpack-plugin
        config.plugin('html').tap(args=>{
            // 只是处理一个html=>index.html
            if (isProduction) {
                args[0].myCdn = cdn.build;
            } else {
                args[0].myCdn = cdn.dev;
            }
            return args;
        })
    }
}

//   // devServer:{
//   //   open:true,
//   //   host:'127.0.0.1',
//   // }
//   // 配置对象会最终和cli默认的配置进行合并
//   // configureWebpack: {
//   //   devServer: {
//   //   //   open: true,
//   //   //   host: '127.0.0.1',

//   //     proxy:{
//   //       '/api':{
//   //         target:'http://1.116.64.64:5004',
//   //         logLevel:'info'
//   //       },
//   //       '/baidu':{
//   //         target:'http://baidu.com'
//   //       }
//   //     }

//   //   }
//   // }
//   // chainWebpack 获取到 配置对象进行链式操作
// }



