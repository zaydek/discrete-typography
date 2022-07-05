import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"

export default defineConfig({
	build: {
		target: "esnext",
		polyfillDynamicImport: false,
	},
	plugins: [solidPlugin()],
})
