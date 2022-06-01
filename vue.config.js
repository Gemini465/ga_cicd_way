const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = defineConfig({
  lintOnSave: false,
  publicPath: '/',
  productionSourceMap: false,
  transpileDependencies: true,
  filenameHashing: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = `js/[name][chunkhash:8]${process.env.VERSION}.js`;
      config.output.chunkFilename = `js/[name][chunkhash:8]${process.env.VERSION}.js`;

      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][name].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      );
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
      );

      // config.plugins.push(
      //   new PurgecssPlugin({
      //     path: glob.sync(
      //       `${path.resolve(__dirname, './src')}/**/*.{tsx,less,scss,css}`,
      //       +{ nodir: true },
      //     ),
      //   }),
      // );

      config.optimization.minimizer.push(
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'],
            },
            ecma: 6,
            mangle: true,
            output: { comment: false },
            warning: false,
          },
          sourceMap: false,
        }),
      );

      config.optimization.minimizer.push(
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            mangle: true,
            compress: {
              pure_funcs: ['console.log'],
            },
          },
        }),
      );

      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin());

      config.optimization = {
        splitChunks: {
          cacheGroups: {
            common: {
              name: 'common',
              chunks: 'all',
              minSize: 1,
              minChunks: 2,
              priority: 60,
              test: /[\\/]src[\\/]js[\\/]/,
              maxInitialRequests: 5,
            },
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 100,
              minSize: 0,
              maxInitialRequests: 5,
              minChunks: 1,
            },
            styles: {
              name: 'styles',
              test: /\.(sa|sc|le|c)ss$/,
              chunks: 'all',
              enforce: true,
            },
            runtimeChunk: { name: 'manifest' },
          },
        },
      };
    }

    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({
    //     bypassOnDebug: true,
    //   })
    //   .end();

    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
    };
  },
  // devServer: {
  //   host: 'localhost',
  //   port: 8080,
  //   open: false,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8090',
  //       changedTouches: true,
  //       pathRewrite: {
  //         '/api': '',
  //       },
  //     },
  //   },
  // },
});

// const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 去掉注释
// const CompressionWebpackPlugin = require('compression-webpack-plugin'); // 开启压缩
// const { HashedModuleIdsPlugin } = require('webpack');
//
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
//
// const isProduction = process.env.NODE_ENV === 'production';
//
// // cdn 预加载使用
// const externals = {
//   vue: 'Vue',
//   'vue-router': 'VueRouter',
//   vuex: 'Vuex',
//   axios: 'axios',
//   'element-ui': 'ELEMENT',
// };
//
// const cdn = {
//   // 开发环境
//   dev: {
//     css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
//     js: [],
//   },
//   // 生产环境
//   build: {
//     css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
//     js: [
//       'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
//       'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
//       'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
//       'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
//       'https://unpkg.com/element-ui/lib/index.js',
//     ],
//   },
// };
//
// module.exports = {
//   lintOnSave: false, // 关闭 eslint
//   productionSourceMap: false,
//   publicPath: './',
//   outputDir: process.env.outputDir, // 生成文件的目录名称
//   chainWebpack: (config) => {
//     config.resolve.alias.set('@', resolve('src'));
//
//     // 压缩图片
//     config.module
//       .rule('images')
//       .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
//       .use('image-webpack-loader')
//       .loader('image-webpack-loader')
//       .options({ bypassOnDebug: true });
//
//     // webpack 会默认给 commonChunk 打进 chunk-vendors，所以需要对 webpack 的配置进行 delete
//     config.optimization.delete('splitChunks');
//
//     config.plugin('html').tap((args) => {
//       if (process.env.NODE_ENV === 'production') {
//         args[0].cdn = cdn.build;
//       }
//       if (process.env.NODE_ENV === 'development') {
//         args[0].cdn = cdn.dev;
//       }
//       return args;
//     });
//
//     config
//       .plugin('webpack-bundle-analyzer')
//       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
//   },
//
//   configureWebpack: (config) => {
//     const plugins = [];
//
//     if (isProduction) {
//       plugins.push(
//         new UglifyJsPlugin({
//           uglifyOptions: {
//             output: {
//               comments: false, // 去掉注释
//             },
//             warnings: false,
//             compress: {
//               drop_console: true,
//               drop_debugger: false,
//               pure_funcs: ['console.log'], //移除 console
//             },
//           },
//         }),
//       );
//       // 服务器也要相应开启 gzip
//       plugins.push(
//         new CompressionWebpackPlugin({
//           algorithm: 'gzip',
//           test: /\.(js|css)$/, // 匹配文件名
//           threshold: 10000, // 对超过 10k 的数据压缩
//           deleteOriginalAssets: false, // 不删除源文件
//           minRatio: 0.8, // 压缩比
//         }),
//       );
//
//       // 用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
//       plugins.push(new HashedModuleIdsPlugin());
//
//       // 开启分离 js
//       config.optimization = {
//         runtimeChunk: 'single',
//         splitChunks: {
//           chunks: 'all',
//           maxInitialRequests: Infinity,
//           minSize: 1000 * 60,
//           cacheGroups: {
//             vendor: {
//               test: /[\\/]node_modules[\\/]/,
//               name(module) {
//                 // 排除 node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
//                 const packageName = module.context.match(
//                   /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
//                 )[1];
//                 return `npm.${packageName.replace('@', '')}`;
//               },
//             },
//           },
//         },
//       };
//
//       // 取消 webpack 警告的性能提示
//       config.performance = {
//         hints: 'warning',
//         //入口起点的最大体积
//         maxEntrypointSize: 1000 * 500,
//         //生成文件的最大体积
//         maxAssetSize: 1000 * 1000,
//         //只给出 js 文件的性能提示
//         assetFilter: function (assetFilename) {
//           return assetFilename.endsWith('.js');
//         },
//       };
//
//       // 打包时 npm 包转 CDN
//       config.externals = externals;
//     }
//
//     return { plugins };
//   },
//
//   pluginOptions: {
//     // 配置全局 less
//     'style-resources-loader': {
//       preProcessor: 'less',
//       patterns: [resolve('./src/style/theme.less')],
//     },
//   },
//   devServer: {
//     open: false, // 自动启动浏览器
//     host: '0.0.0.0', // localhost
//     port: 6060, // 端口号
//     https: false,
//     hotOnly: false, // 热更新
//     proxy: {
//       '^/sso': {
//         target: process.env.VUE_APP_SSO, // 重写路径
//         ws: true, //开启 WebSocket
//         secure: false, // 如果是 https 接口，需要配置这个参数
//         changeOrigin: true,
//       },
//     },
//   },
// };
