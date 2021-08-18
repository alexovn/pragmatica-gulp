import gulp from 'gulp';
import config from './gulp/config';

//ES6 tasks import
import fontsBundle from './gulp/tasks/fonts';
import favicons from './gulp/tasks/favicons';
import images from './gulp/tasks/images';

//Tasks build
const getTaskBuild = task => require('./gulp/tasks/' + task).build(gulp);

gulp.task('clean', getTaskBuild('clean'));
gulp.task('copy', getTaskBuild('copy'));
gulp.task('server', () => getTaskBuild('server'));
gulp.task('nunjucks', () => getTaskBuild('nunjucks'));
gulp.task('styles', () => getTaskBuild('styles'));
gulp.task('sprite:svg', () => getTaskBuild('sprite-svg'));
gulp.task('list-pages', getTaskBuild('list-pages'));
gulp.task('webpack', getTaskBuild('webpack'));

//Tasks watch
const getTaskWatch = task => require('./gulp/tasks/' + task).watch(gulp);

gulp.task('copy:watch', getTaskWatch('copy'));
gulp.task('nunjucks:watch', getTaskWatch('nunjucks'));
gulp.task('styles:watch', getTaskWatch('styles'));
gulp.task('sprite:svg:watch', getTaskWatch('sprite-svg'));
gulp.task('list-pages:watch', getTaskWatch('list-pages'));
gulp.task('webpack:watch', getTaskWatch('webpack'));

//Environments
const setmodeProd = done => {
  config.setEnv('production');
  config.logEnv();
  done();
}
const setmodeDev = done => {
  config.setEnv('development');
  config.logEnv();
  done();
}

//Task manager
gulp.task(
  'build',
  gulp.series(
    setmodeProd,
    'clean',
    'sprite:svg',
    'styles',
    'nunjucks',
    'webpack',
    'list-pages',
    'copy',
    images.images,
    fontsBundle.fontsBundle,
    favicons.favicons,
  )
);

gulp.task(
  'build:dev',
  gulp.series(
    setmodeDev,
    'clean',
    'sprite:svg',
    'styles',
    'nunjucks',
    'webpack',
    'list-pages',
    'copy',
    images.images,
    fontsBundle.fontsBundle,
  )
);

gulp.task(
  'watch',
    gulp.parallel(
    'copy:watch',
    'nunjucks:watch',
    'sprite:svg:watch',
    'list-pages:watch',
    'webpack:watch',
    'styles:watch',
    // imagesWatcher.imagesWatcher,
  )
);

gulp.task('default', gulp.series(['build:dev', 'server', 'watch']));