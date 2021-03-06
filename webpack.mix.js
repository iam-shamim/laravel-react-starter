const mix = require('laravel-mix');
require('laravel-mix-react-css-modules');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.webpackConfig({
    output: {
        filename:'[name].js',
        chunkFilename: 'js/mix/chunks/[name].js'
    }
});
mix.react('resources/js/app.js', 'public/js/mix/').reactCSSModules().version();
//mix.sass('resources/sass/app.scss', 'public/css').version();
mix.styles([
    'public/bootstrap/css/bootstrap.css',
    'public/bootstrap/css/bootstrap-grid.css',
    'node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css',
    'resources/css/app.css'
],'public/css/mix/app.css').version();