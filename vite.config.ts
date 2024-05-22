import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    server: { port: 3333 },
    build: { target: 'esnext' },
    publicDir: "./assets",
});
