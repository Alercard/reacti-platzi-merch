const path = require('path'); // path lo incluye node
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // para trabajar con html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // punto de entrada que va a leer webpack para saber donde se encuentran los demas puntos de entradas para preparar el proyecto
  output: {
    // configuracion de en donde se generaran los archivos del ejecucion
    path: path.resolve(__dirname, 'dist'), // en donde va a generar los archivos de salida
    filename: 'bundle.js', // como se va a llamar el archivo de salida
    publicPath: '/' // importantisimo para resolver rutas con react-router
  },
  mode: 'development',
  resolve: {
    // configuracion de los archivos que va a escuchar
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // template a utilizar
      filename: './index.html', // como se va a preparar el archivo cuando se envie a produccion
    }),
    new MiniCssExtractPlugin({
      // indico donde generar el css final
      filename: 'assets/[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/manifest.json', to: '' },
        { from: 'public/service-worker.js', to: '' },
        { from: 'public/icon.png', to: 'assets' },
      ],
    }),
  ],
  devServer: {
    // configuracion de un servidor web de desarrollo
    static: path.join(__dirname, './dist'),
    compress: true,
    port: 3005,
    historyApiFallback: true // asi podremos acceder a la informacion y mostrar las rutas sin que marque una error
  },
};
