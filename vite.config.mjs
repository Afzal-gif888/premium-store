/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      styles: path.resolve(__dirname, "./src/styles"),
      utils: path.resolve(__dirname, "./src/utils"),
      "inventory-management": path.resolve(__dirname, "./src/inventory-management"),
      "product-details": path.resolve(__dirname, "./src/product-details"),
      collection: path.resolve(__dirname, "./src/collection"),
      homepage: path.resolve(__dirname, "./src/homepage"),
      store: path.resolve(__dirname, "./src/store"),
    },
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: false,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    exclude: ['server/**', 'node_modules/**']
  }
});