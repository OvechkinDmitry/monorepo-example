import { Configuration } from "webpack";
import { buildWebpack } from "./config/build/webpack";
import path from "path";
import packageJson from './package.json'

export interface BuildEnv {
    mode: Configuration['mode'],
    port: number,
}

export default (env: BuildEnv): Configuration => {
    const mode = env.mode || 'development';
    const port = env.port || 3000;
    const isDev = mode === 'development';

    return buildWebpack({
        port,
        mode,
        isDev,
        packageJson,
        moduleFederationOptions: {
          remotes: {
               'page_one': 'page_one@http://localhost:3001/remoteEntry.js',
          }
        },
        paths: {
           html: path.resolve(__dirname, 'public', 'index.html'),
           entry: path.resolve(__dirname, 'src', 'index.ts'),
           output: path.resolve(__dirname, 'build')
        },
    })
}