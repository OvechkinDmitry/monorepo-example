import path from 'path';
import { Configuration, HotModuleReplacementPlugin, container } from "webpack";
import HTMLWebpackPlugin from 'html-webpack-plugin';
import packageJson from './package.json'
// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export interface BuildEnv {
    mode: Configuration['mode'],
    port: number,
}

export default (env: BuildEnv): Configuration => {
    const mode = env.mode || 'development';
    const port = env.port || 3001;
    const isDev = mode === 'development';

    return {
        mode: mode,
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HTMLWebpackPlugin({
                title: 'page-one', //title html-ки
                template: path.resolve(__dirname, 'public', 'index.html'),
                publicPath: '/'
            }),
            new container.ModuleFederationPlugin({
                name: 'page_one',
                filename: 'remoteEntry.js',
                exposes: {
                    './page_one': './src/app.tsx'
                },
                shared: {
                    ...packageJson.dependencies,
                    react: {
                      eager: true,
                      singleton: true,
                      requiredVersion: packageJson.dependencies['react']
                    },
                    'react-dom': {
                       eager: true,
                       singleton: true,
                       requiredVersion: packageJson.dependencies['react-dom']
                    },
                }
            }),
            ...(isDev && [
                // new HotModuleReplacementPlugin()
            ])
        ],
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        ...(isDev && {
            devServer: {
                port: port,
                open: true,
                historyApiFallback: true,
                hot: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                }
            }
        })
    }
}