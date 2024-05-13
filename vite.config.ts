import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import devServer from "@hono/vite-dev-server";
import esbuild from "esbuild"
import { remixDevTools } from "remix-development-tools";
import { flatRoutes } from "remix-flat-routes";

installGlobals();

export default defineConfig({

  server: {
    port: 3000,
    https: {
      key: "./server/dev/key.pem",
      cert: "./server/dev/cert.pem",
    },
    warmup: {
      clientFiles: [
        "./app/entry.client.tsx",
        "./app/root.tsx",
        "./app/routes/**/*",
      ]
    },
    optimizeDeps: {
      include: ["./app/routes/**/*"],
    },
  },
  plugins: [
    devServer({
      injectClientScript: false,
      entry: "server/index.ts",
      exclude: [/^\/(app)\/.+/, /^\/@.+$/, /^\/node_modules\/.*/],
    }),
    remixDevTools(),
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async defineRoutes => {
        return flatRoutes('routes', defineRoutes)
      },
      serverBuildFile: "remix.js",
      buildEnd: async () => {
        await esbuild
          .build({
            alias: { "~": "./app" },
            outfile: "build/server/index.js",
            entryPoints: ["server/index.ts"],
            external: ["./build/server/*"],
            platform: "node",
            format: "esm",
            packages: "external",
            bundle: true,
            logLevel: "info"
          })
          .catch((error: unknown) => {
            console.error(error);
            process.exit(1);
          })
      }
    }),
    tsconfigPaths()],
});
