# Laravel Mix clean-css
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-clean-css.svg?style=flat-square)](https://npmjs.com/package/laravel-mix-clean-css)
[![npm](https://img.shields.io/npm/dt/laravel-mix-clean-css.svg?style=flat-square)](https://www.npmjs.com/package/laravel-mix-clean-css)
[![Software License](https://img.shields.io/npm/l/laravel-mix-clean-css.svg?style=flat-square)](LICENSE)

This extension adds support for [clean-css](https://github.com/jakubpawlowicz/clean-css) to [Laravel Mix](https://github.com/JeffreyWay/laravel-mix) by using the [clean-css-loader](https://github.com/retyui/clean-css-loader).

## Installation

```
npm i -D laravel-mix-clean-css
```

## Usage

Require the extension inside your ``webpack.mix.js`` and add clean-css configurations like this:

```javascript
const mix = require('laravel-mix');

require('laravel-mix-clean-css');

mix
  .sass('src/app.scss', 'dist')
  .sass('src/app.sass', 'dist')
  .less('src/app.less', 'dist')
  .stylus('src/app.styl', 'dist')

  // Run clean-css on all stylesheets
  .cleanCss({
    level: 2,
    format: mix.inProduction() ? false : 'beautify' // Beautify only in dev mode
  })
```

For more information about clean-css configurations please refer to their [documentation](https://github.com/jakubpawlowicz/clean-css/blob/master/README.md).