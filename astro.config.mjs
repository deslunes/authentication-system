import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import node from "@astrojs/node";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  optimizeDeps: {
		exclude: ["oslo", "vite"]
	},
  integrations: [
    db(),
    react(),
    tailwind({
      applyBaseStyles: false,
    })],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});