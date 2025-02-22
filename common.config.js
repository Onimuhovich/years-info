const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

const BUILD_DIR = path.resolve(__dirname, "build");
const PUBLIC_DIR = path.resolve(__dirname, "public");
const STATIC_DIR = path.resolve(__dirname, "static");

const plugins = [
  new FileManagerPlugin({
    events: {
      onStart: {
        delete: [BUILD_DIR],
      },
      onEnd: {
        copy: [
          {
            source: STATIC_DIR,
            destination: BUILD_DIR,
          },
        ],
      },
    },
  }),
  new HtmlWebpackPlugin({
    template: path.join(PUBLIC_DIR, "index.html"),
    filename: "index.html",
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve(PUBLIC_DIR, "favicon.svg"),
    prefix: "/favicons/",
    outputPath: path.resolve(BUILD_DIR, "favicons"),
    mode: "webapp",
    inject: (htmlPlugin) => {
      path.basename(htmlPlugin.options.filename) === "index.html";
    },
    favicons: {
      icons: {
        appleIcon: false, // Apple touch icons.
        appleStartup: false, // Apple startup images.
        android: false, // Android homescreen icon.
        favicons: true, // Regular favicons.
        coast: false, // Opera Coast icon.
        firefox: false, // Firefox OS icons.
        windows: false, // Windows 8 tile icons.
        yandex: false, // Yandex browser icon.
      },
    },
    cache: false,
  }),
  new HotModuleReplacementPlugin(),
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
};

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    filename: "build.js",
    path: BUILD_DIR,
    publicPath: "/",
  },
  performance: {
    hints: false,
  },
  plugins,
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Using a cache to avoid of recompilation
          },
        },
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
                namedExport: true,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash][ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      '@*': path.resolve(__dirname, 'src/*'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
