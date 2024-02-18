import path from 'path';
import packageJson from './package.json'
import {BuildMode, buildWebpack} from '@packages/build-config'

export interface BuildEnv {
    mode: BuildMode,
    port: number,
}

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const port = env.port || 3001;
    const isDev = mode === 'development';

    return buildWebpack({
        isDev,
        mode,
        port,
        packageJson,
        paths: {
            html: path.resolve(__dirname, 'public', 'index.html'),
            entry: path.resolve(__dirname, 'src', 'index.ts'),
            output: path.resolve(__dirname, 'build'),
        },
        moduleFederationOptions: {
            exposes: {
                './page_one': './src/app.tsx'
            },
        }
    })
}