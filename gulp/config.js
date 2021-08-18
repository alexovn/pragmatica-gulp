import util from 'gulp-util';

const production = util.env.production || util.env.prod || util.env._.indexOf('build') !== -1 || false;

const destPath = 'dist/';
const srcPath = 'src/'

const config = {
    env: 'development',
    production: production,

    src: {
        root:          srcPath,
        templates:     srcPath + 'templates',
        templatesData: srcPath + 'templates/data',
        pagelist:      srcPath + 'index.yaml',
        styles:        srcPath + 'styles',
        stylesGen:     srcPath + 'styles/main/dev/generated',
        js:            srcPath + 'js',
        img:          [srcPath + 'img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', "!" + srcPath + 'img/favicon/*.{jpg,jpeg,png,gif}'],
        svg:           srcPath + 'img/svg',
        favicon:       srcPath + 'img/favicon/*.{jpg,jpeg,png,gif}',
        // path to png sources for sprite:png task
        iconsPng:      srcPath + 'icons',
        // path to svg sources for sprite:svg task
        iconsSvg:      srcPath + 'icons',
        // path to svg sources for iconfont task
        iconsFont:     srcPath + 'icons',
        fonts:         srcPath + 'fonts/*.ttf',
    },
    dest: {
        root:          destPath,
        html:          destPath,
        css:           destPath + 'css',
        js:            destPath + 'js',
        img:           destPath + 'img',
        fonts:         destPath + 'fonts',
        lib:           destPath + 'lib',
        data:          destPath + 'data',
        media:         destPath + 'media',
        favicons:      destPath + 'img/favicons',
    },
    watch: {
        img:           srcPath + 'img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
    },

    setEnv: function (env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function () {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;