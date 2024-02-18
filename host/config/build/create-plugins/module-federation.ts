import { container } from "webpack";
import { BuildOptions } from "../types";

export const createModuleFederationPlugin = ({packageJson, moduleFederationOptions }: BuildOptions) => {
    const { remotes } = moduleFederationOptions
    return new container.ModuleFederationPlugin({
        name: packageJson.name,
        filename: 'remoteEntry.js',
        // @todo вынести?
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
        },
        remotes: remotes
    })
}