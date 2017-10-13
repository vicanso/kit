module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-normalize': {},
    precss: {},
    'postcss-nested-props': {},
    'postcss-calc': {},
    'postcss-pxtorem': {
      propList: ['*']
    },
    'postcss-custom-properties': {},
    'postcss-hexrgba': {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
  },
};
