'use strict';

var _Css = require('../laravel-elixir/dist/tasks/shared/Css');

var _Css2 = _interopRequireDefault(_Css);

var _laravelElixir = require('laravel-elixir');

var _laravelElixir2 = _interopRequireDefault(_laravelElixir);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

var config = _laravelElixir2.default.config;

/*
 |----------------------------------------------------------------
 | Stylus Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Stylus, including minification and
 | and auto-prefixing. Stylus is one of the CSS pre-precessors
 | supported by Elixir, along with the Less CSS processor.
 |
 */

_laravelElixir2.default.config.css.stylus = {
    folder: 'stylus',
    search: '/**/*.styl',
    plugin: require('gulp-stylus'),
    pluginOptions: {
        use: [
            require('poststylus')(['lost'])
        ]
    }
};

var gulpTask = function gulpTask(src, output, options) {
    var paths = prepGulpPaths(src, output);

    new _laravelElixir2.default.Task('stylus', function () {
        return (0, _Css2.default)({
            name: 'Stylus',
            compiler: require('gulp-stylus'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.stylus.pluginOptions
        });
    }).watch(paths.src.baseDir + '/**/*.styl').ignore(paths.output.path);
};

_laravelElixir2.default.extend('stylus', function () {
    gulpTask.apply(this, arguments);
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var prepGulpPaths = function prepGulpPaths(src, output) {
    return new _laravelElixir2.default.GulpPaths().src(src, config.get('assets.css.stylus.folder')).output(output || config.get('public.css.outputFolder'), 'app.css');
};
