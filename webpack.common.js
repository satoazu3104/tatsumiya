const mergeRulePlus = require('postcss-merge-rules-plus');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

const webpackConfig = (MODE) => {

  const cssSafeList = ['hoge'];

  const filePath = {
    js: './src/js/',
    ejs: './src/ejs/',
    sass: './src/scss/',
  };

  const enabledSourceMap = MODE === "development";
  
  console.log(MODE);


  //ベース設定読み込み
  const path = require("path");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CopyPlugin = require("copy-webpack-plugin");
  const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");


  //sassファイル分割
  const entriesScss = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, `${filePath.sass}**/**.scss`)], {
    ignore: path.resolve(__dirname, `${filePath.sass}**/_*.scss`),
  })();
  const cssGlobPlugins = (entriesScss) => {
    return Object.keys(entriesScss).map(key => new MiniCssExtractPlugin({
        //出力ファイル名
        filename: `assets/css/[name].css`
        //filename: `../my-app/src/[name].css`
      })
    );
  };


  //jsファイル分割
  const entriesJS = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, `${filePath.js}**/*.js`)], {
    ignore: path.resolve(__dirname, `${filePath.js}**/_*.js`),
  })();
  

  const entriesImg = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, `${filePath.img}**/*.(png|jpe?g)$/i`)])();


  //ejsビルド
  const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, `${filePath.ejs}**/*.ejs`)], {
    ignore: path.resolve(__dirname, `${filePath.ejs}**/_*.ejs`),
  })();
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const { htmlWebpackPluginTemplateCustomizer } = require("template-ejs-loader");
  const htmlGlobPlugins = (entries) => {
    return Object.keys(entries).map(key => new HtmlWebpackPlugin({
      //出力ファイル名
      filename: `../${key}.php`,
      //ejsファイルの読み込み
      template: htmlWebpackPluginTemplateCustomizer({
        htmlLoaderOption: {
          //ファイル自動読み込みと圧縮を無効化
          sources: false,
          minimize: false
        },
        templatePath: `${filePath.ejs}${key}.ejs`,
      }),

      //JS・CSS自動出力と圧縮を無効化
      inject: false,
      minify: false,
    })
    );
  };

  //ビルド設定を各jsファイルへ渡す
  return {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: 'development',
    

    devServer: {
      static: path.resolve(__dirname, 'src'),
      open: true
    },
    target: ['web', 'es5'], //ローカルサーバのホットリロードを有効化する

    //JS書き出しファイル読み込み
    entry: entriesJS,

    //JS書き出し設定
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].js',
      clean: true, //ビルド時にdistフォルダをクリーンアップする
    },

    module: {
      rules: [
         //ejs
        {
          test: /\.ejs$/i,
          use: ['html-loader','template-ejs-loader']
        },

        //babel-loader
        {
          // 拡張子 .js の場合
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              // Babel を利用する
              loader: "babel-loader",
              // Babel のオプションを指定する
              options: {
                presets: [
                  "@babel/preset-env",
                  [
                    "@babel/preset-react",
                    {
                      // Reactで使用する関数をBABELをトランスパイルします
                      // 通常は"React.createElement.xxxx"を記述しますが、WordPressのブロックエディターはWordPress用のReactを使用するため、以下のように記述します
                      pragma: "wp.element.createElement",
                      pragmaFrag: "wp.element.Fragment",
                      development: "development",
                    },
                  ],
                ],
              },
            },
          ],
        },

        //Sass
        {
          test: /\.scss/, // 対象となるファイルの拡張子
          use: [
            // CSSファイルを書き出すオプションを有効にする
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                // オプションでCSS内のurl()メソッドの取り込みを禁止する
                url: false,
                // ソースマップの利用有無
                sourceMap: true,

                // Sass+PostCSSの場合は2を指定
                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 2
              }
            },
            // PostCSSのための設定
            {
              loader: "postcss-loader",
              options: {
                // PostCSS側でもソースマップを有効にする
                sourceMap: true,
                postcssOptions: {
                  plugins: [
                    ['autoprefixer', {}],
                    ['postcss-normalize-charset', {},],
                    ['postcss-sort-media-queries', {}],
                    ['postcss-merge-rules', {}],
                    //['postcss-merge-selectors',{}],
                    ['css-declaration-sorter', {order:'smacss'}],
                    require('cssnano')({ preset: ['default', { autoprefixer: false, normalizeWhitespace: false, discardComments: false, mergeRules: false }] }),
                  ],
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                // ソースマップの利用有無
                sourceMap: true 
              },
            },
            {
              loader: "glob-import-loader",
              options: {
                resolve: {}
              },
            },
          ],
        },

        //CSS内の画像読み込み設定
        {
          test: /\.(gif|png|jpg|svg|webp)$/,
          // 閾値以上だったら埋め込まずファイルとして分離する
          type: "asset",
          parser: {
            dataUrlCondition: {
              // 4KB以上だったら埋め込まずファイルとして分離する
              maxSize: 4 * 1024,
            },
          },
          //書き出し設定
          generator: {
            filename: 'assets/images/[name][ext]'
          }
        },

      ],
    },

    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },

    plugins: [
      // assets.phpファイルを出力する
      new DependencyExtractionWebpackPlugin(),
      // CSS出力
      ...cssGlobPlugins(entriesScss),
      // ejs出力
      ...htmlGlobPlugins(entries),
      
      // webp出力
      new ImageminWebpWebpackPlugin({
        config: [{
          test: /\.(png|jpe?g)$/i, // 対象ファイル
          options: {
            quality:  80 // 画質
          }
        }],
        overrideExtension: true,
        detailedLogs: false,
        silent: false,
        strict: true
      }),

      //ディレクトリコピー
      new CopyPlugin({
        patterns: [
          //画像コピー
          {
            from: path.resolve(__dirname, 'src/images/'),
            to: path.resolve(__dirname, 'dist/assets/images'),
          },
        ],
      }),
    ],
    
    devtool: 'source-map'
  };
}
module.exports = { webpackConfig };
