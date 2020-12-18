const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js'],
    // add the alias object
    alias: {
      components: path.resolve(__dirname, '../../components'),
      hooks: path.resolve(__dirname, '../../hooks'),
      api: path.resolve(__dirname, '../../utils/api'),
      utils: path.resolve(__dirname, '../../utils'),
      test: path.resolve(__dirname, '../../test'),
      pages: path.resolve(__dirname, '../../components'),
    },
  },
}
