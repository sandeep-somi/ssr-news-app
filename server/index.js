
require('ignore-styles')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

require('@babel/register')({
  ignore: [/(node_module)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
})

require('./server')