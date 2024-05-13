// vite.config.ts
import { vitePlugin as remix } from "file:///Users/lucasmontegu/www/troper/node_modules/@remix-run/dev/dist/index.js";
import { installGlobals } from "file:///Users/lucasmontegu/www/troper/node_modules/@remix-run/node/dist/index.js";
import { defineConfig } from "file:///Users/lucasmontegu/www/troper/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/lucasmontegu/www/troper/node_modules/vite-tsconfig-paths/dist/index.mjs";
import devServer from "file:///Users/lucasmontegu/www/troper/node_modules/@hono/vite-dev-server/dist/index.js";
import esbuild from "file:///Users/lucasmontegu/www/troper/node_modules/esbuild/lib/main.js";
import { remixDevTools } from "file:///Users/lucasmontegu/www/troper/node_modules/remix-development-tools/dist/index.js";
installGlobals();
var vite_config_default = defineConfig({
  server: {
    port: 3e3,
    https: {
      key: "./server/dev/key.pem",
      cert: "./server/dev/cert.pem"
    },
    warmup: {
      clientFiles: [
        "./app/entry.client.tsx",
        "./app/root.tsx",
        "./app/routes/**/*"
      ]
    },
    optimizeDeps: {
      include: ["./app/routes/**/*"]
    }
  },
  plugins: [
    devServer({
      injectClientScript: false,
      entry: "server/index.ts",
      exclude: [/^\/(app)\/.+/, /^\/@.+$/, /^\/node_modules\/.*/]
    }),
    remixDevTools(),
    remix({
      /* routes: async (defineRoutes) => {
        return defineRoutes((route) => {
          route("/", "app/routes/_index.tsx");
        });
      }, */
      serverBuildFile: "remix.js",
      buildEnd: async () => {
        await esbuild.build({
          alias: { "~": "./app" },
          outfile: "build/server/index.js",
          entryPoints: ["server/index.ts"],
          external: ["./build/server/*"],
          platform: "node",
          format: "esm",
          packages: "external",
          bundle: true,
          logLevel: "info"
        }).catch((error) => {
          console.error(error);
          process.exit(1);
        });
      }
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbHVjYXNtb250ZWd1L3d3dy90cm9wZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9sdWNhc21vbnRlZ3Uvd3d3L3Ryb3Blci92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbHVjYXNtb250ZWd1L3d3dy90cm9wZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSBcIkByZW1peC1ydW4vZGV2XCI7XG5pbXBvcnQgeyBpbnN0YWxsR2xvYmFscyB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IGRldlNlcnZlciBmcm9tIFwiQGhvbm8vdml0ZS1kZXYtc2VydmVyXCI7XG5pbXBvcnQgZXNidWlsZCBmcm9tIFwiZXNidWlsZFwiXG5pbXBvcnQgeyByZW1peERldlRvb2xzIH0gZnJvbSBcInJlbWl4LWRldmVsb3BtZW50LXRvb2xzXCI7XG4vKiBpbXBvcnQgeyBmbGF0Um91dGVzIH0gZnJvbSBcInJlbWl4LWZsYXQtcm91dGVzXCI7ICovXG5cbmluc3RhbGxHbG9iYWxzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBodHRwczoge1xuICAgICAga2V5OiBcIi4vc2VydmVyL2Rldi9rZXkucGVtXCIsXG4gICAgICBjZXJ0OiBcIi4vc2VydmVyL2Rldi9jZXJ0LnBlbVwiLFxuICAgIH0sXG4gICAgd2FybXVwOiB7XG4gICAgICBjbGllbnRGaWxlczogW1xuICAgICAgICBcIi4vYXBwL2VudHJ5LmNsaWVudC50c3hcIixcbiAgICAgICAgXCIuL2FwcC9yb290LnRzeFwiLFxuICAgICAgICBcIi4vYXBwL3JvdXRlcy8qKi8qXCIsXG4gICAgICBdXG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcIi4vYXBwL3JvdXRlcy8qKi8qXCJdLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBkZXZTZXJ2ZXIoe1xuICAgICAgaW5qZWN0Q2xpZW50U2NyaXB0OiBmYWxzZSxcbiAgICAgIGVudHJ5OiBcInNlcnZlci9pbmRleC50c1wiLFxuICAgICAgZXhjbHVkZTogWy9eXFwvKGFwcClcXC8uKy8sIC9eXFwvQC4rJC8sIC9eXFwvbm9kZV9tb2R1bGVzXFwvLiovXSxcbiAgICB9KSxcbiAgICByZW1peERldlRvb2xzKCksXG4gICAgcmVtaXgoe1xuICAgICAgLyogcm91dGVzOiBhc3luYyAoZGVmaW5lUm91dGVzKSA9PiB7XG4gICAgICAgIHJldHVybiBkZWZpbmVSb3V0ZXMoKHJvdXRlKSA9PiB7XG4gICAgICAgICAgcm91dGUoXCIvXCIsIFwiYXBwL3JvdXRlcy9faW5kZXgudHN4XCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0sICovXG4gICAgICBzZXJ2ZXJCdWlsZEZpbGU6IFwicmVtaXguanNcIixcbiAgICAgIGJ1aWxkRW5kOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGVzYnVpbGRcbiAgICAgICAgICAuYnVpbGQoe1xuICAgICAgICAgICAgYWxpYXM6IHsgXCJ+XCI6IFwiLi9hcHBcIiB9LFxuICAgICAgICAgICAgb3V0ZmlsZTogXCJidWlsZC9zZXJ2ZXIvaW5kZXguanNcIixcbiAgICAgICAgICAgIGVudHJ5UG9pbnRzOiBbXCJzZXJ2ZXIvaW5kZXgudHNcIl0sXG4gICAgICAgICAgICBleHRlcm5hbDogW1wiLi9idWlsZC9zZXJ2ZXIvKlwiXSxcbiAgICAgICAgICAgIHBsYXRmb3JtOiBcIm5vZGVcIixcbiAgICAgICAgICAgIGZvcm1hdDogXCJlc21cIixcbiAgICAgICAgICAgIHBhY2thZ2VzOiBcImV4dGVybmFsXCIsXG4gICAgICAgICAgICBidW5kbGU6IHRydWUsXG4gICAgICAgICAgICBsb2dMZXZlbDogXCJpbmZvXCJcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3I6IHVua25vd24pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0USxTQUFTLGNBQWMsYUFBYTtBQUNoVCxTQUFTLHNCQUFzQjtBQUMvQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGVBQWU7QUFDdEIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMscUJBQXFCO0FBRzlCLGVBQWU7QUFFZixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUUxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sYUFBYTtBQUFBLFFBQ1g7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjO0FBQUEsTUFDWixTQUFTLENBQUMsbUJBQW1CO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixvQkFBb0I7QUFBQSxNQUNwQixPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUMsZ0JBQWdCLFdBQVcscUJBQXFCO0FBQUEsSUFDNUQsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLElBQ2QsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU1KLGlCQUFpQjtBQUFBLE1BQ2pCLFVBQVUsWUFBWTtBQUNwQixjQUFNLFFBQ0gsTUFBTTtBQUFBLFVBQ0wsT0FBTyxFQUFFLEtBQUssUUFBUTtBQUFBLFVBQ3RCLFNBQVM7QUFBQSxVQUNULGFBQWEsQ0FBQyxpQkFBaUI7QUFBQSxVQUMvQixVQUFVLENBQUMsa0JBQWtCO0FBQUEsVUFDN0IsVUFBVTtBQUFBLFVBQ1YsUUFBUTtBQUFBLFVBQ1IsVUFBVTtBQUFBLFVBQ1YsUUFBUTtBQUFBLFVBQ1IsVUFBVTtBQUFBLFFBQ1osQ0FBQyxFQUNBLE1BQU0sQ0FBQyxVQUFtQjtBQUN6QixrQkFBUSxNQUFNLEtBQUs7QUFDbkIsa0JBQVEsS0FBSyxDQUFDO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUFDO0FBQ25CLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
