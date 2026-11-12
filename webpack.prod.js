import { merge } from "webpack-merge";
import common from "./webpack.common.js";

export default merge(common, {
  mode: "production",

  optimization: {
    minimize: {
      html: {
        collapseWhitespace: "smart",
        removeRedundantAttributes: "smart",
        sortAttributes: true,
        sortTokenLists: true,
        mergeStyles: true,
      },
    },
  },
});
