const R = require('ramda')
const webpack = require('webpack')


const tests = {
  js: /\.jsx?$/,
  style: /\.(s[ac]?ss|css)$/,
}

const rules = ({ PATHS }) => [
  {
    enforce: 'pre',
    test: tests.js,
    include: [
      PATHS.app,
    ],
    loaders: [
      'eslint-loader',
    ],
  },
  {
    test: tests.js,
    include: [
      PATHS.app,
    ],
    use: [
      'postjss/webpack/report-loader',
      'babel-loader',
      'postjss/webpack/hot-loader',
    ],
  },
]

const plugins = () => [
  new webpack.NoEmitOnErrorsPlugin(),
]

const lens = {
  byCond: cond => R.lens(
    R.filter(cond),
    R.useWith(R.map, [R.compose(R.when(cond), R.identity)])
  ),
}


module.exports = options => ({
  tests,
  lens,

  conf: {
    resolve: {
      extensions: ['.js', '.jsx', '.sss', '.json'],
    },

    devtool: 'eval',

    plugins: plugins(options),

    module: { rules: rules(options) },
  },
})
