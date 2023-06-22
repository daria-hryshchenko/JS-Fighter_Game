import { defineConfig } from 'vite';

const config = () => {
    return defineConfig({
        base: 'https://daria-hryshchenko.github.io/JS-Fighter_Game/',
        server: {
            host: 'localhost',
            port: 8000
        }
    });
};

export default config;
