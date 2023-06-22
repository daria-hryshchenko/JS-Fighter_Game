import { defineConfig } from 'vite';
import viteConfig from './vite.config';

const config = () => {
    return defineConfig({
        viteConfig,
        base: '/JS-Fighter_Game/',
        server: {
            host: 'localhost',
            port: 8000
        }
    });
};

export default config;
