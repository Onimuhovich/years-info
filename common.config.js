const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

const BUILD_DIR = path.resolve(__dirname, "build");
const PUBLIC_DIR = path.resolve(__dirname, "public");

const plugins = [
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
  },
  performance: {
    hints: false,
  },
  plugins,
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: true,
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[hash].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash]/[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@*": path.resolve(__dirname, "src/*"),
    }
  },
  devServer: {
    port: 3000,
    open: true,
    hot: false,
    liveReload: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
    },
  },
};
