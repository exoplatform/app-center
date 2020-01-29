const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {

    context: path.resolve(__dirname, '.'),
    // set the entry point of the application
    // can use multiple entry

    entry: {
        adminSetup: "./src/main/webapp/vue-apps/adminSetup/adminSetup.js",
        userSetup: "./src/main/webapp/vue-apps/userSetup/userSetup.js",
        myApplications: "./src/main/webapp/vue-apps/myApplications/myApplications.js",
        appLauncher: "./src/main/webapp/vue-apps/appLauncher/main.js"
    },
    output: {
        filename: 'javascript/vue/[name].bundle.js',
        libraryTarget: 'amd'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader']
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    externals: {
        vue: 'Vue',
        vuetify: 'Vuetify',
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ],
};