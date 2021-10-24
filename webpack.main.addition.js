module.exports = {
  module: {
    rules: [
      {
        test: /\.(ico|png|ttf|otf|eot|woff|woff2|svg|mp3)$/,
        loader: 'file-loader'
      },
    ]
  }
}