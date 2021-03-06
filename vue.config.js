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
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // ????????????
// const CompressionWebpackPlugin = require('compression-webpack-plugin'); // ????????????
// const { HashedModuleIdsPlugin } = require('webpack');
//
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }
//
// const isProduction = process.env.NODE_ENV === 'production';
//
// // cdn ???????????????
// const externals = {
//   vue: 'Vue',
//   'vue-router': 'VueRouter',
//   vuex: 'Vuex',
//   axios: 'axios',
//   'element-ui': 'ELEMENT',
// };
//
// const cdn = {
//   // ????????????
//   dev: {
//     css: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css'],
//     js: [],
//   },
//   // ????????????
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
//   lintOnSave: false, // ?????? eslint
//   productionSourceMap: false,
//   publicPath: './',
//   outputDir: process.env.outputDir, // ???????????????????????????
//   chainWebpack: (config) => {
//     config.resolve.alias.set('@', resolve('src'));
//
//     // ????????????
//     config.module
//       .rule('images')
//       .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
//       .use('image-webpack-loader')
//       .loader('image-webpack-loader')
//       .options({ bypassOnDebug: true });
//
//     // webpack ???????????? commonChunk ?????? chunk-vendors?????????????????? webpack ??????????????? delete
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
//               comments: false, // ????????????
//             },
//             warnings: false,
//             compress: {
//               drop_console: true,
//               drop_debugger: false,
//               pure_funcs: ['console.log'], //?????? console
//             },
//           },
//         }),
//       );
//       // ??????????????????????????? gzip
//       plugins.push(
//         new CompressionWebpackPlugin({
//           algorithm: 'gzip',
//           test: /\.(js|css)$/, // ???????????????
//           threshold: 10000, // ????????? 10k ???????????????
//           deleteOriginalAssets: false, // ??????????????????
//           minRatio: 0.8, // ?????????
//         }),
//       );
//
//       // ??????????????????????????????????????? hash ???????????? id, ????????????????????????
//       plugins.push(new HashedModuleIdsPlugin());
//
//       // ???????????? js
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
//                 // ?????? node_modules ????????? @ ???????????? ,???????????????????????????
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
//       // ?????? webpack ?????????????????????
//       config.performance = {
//         hints: 'warning',
//         //???????????????????????????
//         maxEntrypointSize: 1000 * 500,
//         //???????????????????????????
//         maxAssetSize: 1000 * 1000,
//         //????????? js ?????????????????????
//         assetFilter: function (assetFilename) {
//           return assetFilename.endsWith('.js');
//         },
//       };
//
//       // ????????? npm ?????? CDN
//       config.externals = externals;
//     }
//
//     return { plugins };
//   },
//
//   pluginOptions: {
//     // ???????????? less
//     'style-resources-loader': {
//       preProcessor: 'less',
//       patterns: [resolve('./src/style/theme.less')],
//     },
//   },
//   devServer: {
//     open: false, // ?????????????????????
//     host: '0.0.0.0', // localhost
//     port: 6060, // ?????????
//     https: false,
//     hotOnly: false, // ?????????
//     proxy: {
//       '^/sso': {
//         target: process.env.VUE_APP_SSO, // ????????????
//         ws: true, //?????? WebSocket
//         secure: false, // ????????? https ?????????????????????????????????
//         changeOrigin: true,
//       },
//     },
//   },
// };
