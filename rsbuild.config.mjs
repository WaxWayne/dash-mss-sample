import path from "path";
import { defineConfig } from "@rsbuild/core";

const __dirname = process.cwd();
const webRoot = path.join(__dirname, "dist");

export default defineConfig({
  tools: {
    htmlPlugin: {
      filename: "index.html",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
  },
  source: {
    include: [/[\\/]node_modules[\\/]/],
    entry: {
      main: ["core-js/stable", "whatwg-fetch", "./src/index.ts"],
    },
  },
  output: {
    minify: false,
    target: "web",
    filename: `[name]-[chunkhash].js`,
    chunkFilename: `[chunkhash].js`,
    distPath: {
      root: webRoot,
    },
  },
  performance: {
    chunkSplit: {
      strategy: "split-by-experience",
    },
  },
  html: {
    inject: "head",
    scriptLoading: "defer",
    template: "./src/index.html",
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: [/[\\/]node_modules[\\/]/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
            externalHelpers: true,
            transform: {
              react: {
                runtime: "automatic",
                development: false,
                refresh: false,
              },
            },
          },
        },
      },
      {
        test: /(\/esm\/.*\.js|\.mjs)$/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "ecmascript",
            },
            externalHelpers: true,
          },
        },
      },
    ],
  },
});
