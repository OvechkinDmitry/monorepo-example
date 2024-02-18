import {Configuration, HotModuleReplacementPlugin} from "webpack";
import { createModuleFederationPlugin } from "./create-plugins";
import HTMLWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types";


export const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
    const { isDev, paths, packageJson } = options
    const plugins: Configuration['plugins'] = [
        new HTMLWebpackPlugin({
            title: packageJson.name || "", //title html-ки
            template: paths.html,
            publicPath: '/'
        }),
        createModuleFederationPlugin(options),
    ]

    if(isDev){
        plugins.push(new HotModuleReplacementPlugin())
    }

    if(!isDev){
        // ex. плагины не для дев сборки (минификация и пр.)
    }


    return plugins
}