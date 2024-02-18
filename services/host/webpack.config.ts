import { BuildMode, buildWebpack} from "@packages/build-config";
import path from "path";
import packageJson from './package.json'

export interface BuildEnv {
    mode: BuildMode,
    port: number,
}

export default (env: BuildEnv) => {
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