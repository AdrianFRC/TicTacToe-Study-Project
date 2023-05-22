const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

/**
 * Most of this setup is directly from Webpack documentation
 * @see https://webpack.js.org/guides/typescript/
 */
module.exports = {
  mode: process.env.NODE_ENV ?? "development",
  entry: "./src/entrypoint.tsx",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },

      /**
       * CSS Loader
       *
       * This will load our per-component CSS files
       */
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
};
