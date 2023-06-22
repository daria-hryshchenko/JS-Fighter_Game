import { defineConfig } from 'vite';

const config = () => {
    return defineConfig({
        base: '/JS-Fighter_Game/',
        server: {
            host: 'localhost',
            port: 8000
        }
    });
};

export default config;
