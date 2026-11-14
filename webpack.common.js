import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("webpack").Configuration} */
const config = {
  entry: "./src/index.html",

  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  experiments: {
    html: true,
    css: true,
  },

  devtool: "source-map",

  plugins: [],

  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};

export default config;
