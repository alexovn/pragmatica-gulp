import gulp from 'gulp';
import config from '../config.js';
// // npm i gulp-cache gulp-imagemin imagemin-pngquant imagemin-zopfli imagemin-mozjpeg imagemin-giflossy -f
// import cache from 'gulp-cache';
// import imagemin from 'gulp-imagemin';
// import imageminPngquant from 'imagemin-pngquant';
// import imageminZopfli from 'imagemin-zopfli';
// import imageminMozjpeg from 'imagemin-mozjpeg';
// import imageminGiflossy from 'imagemin-giflossy';

// gulp.task('copy:img', () => gulp
//     .src([
//         config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
//         '!' + config.src.img + '/svgo/**/*.*',
//         '!' + config.src.img + '/favicon/**/*.*'
//     ])
//     .pipe(gulp.dest(config.dest.img))
// );

// gulp.task('compress:img', () => gulp
//     .src([
//         config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
//     ])
//     .pipe(cache(imagemin([
//         imageminPngquant({
//             speed: 1,
//             // quality: [0.95, 1] //lossy settings
//             quality: [0.9, 0.95]
//         }),
//         imageminZopfli({
//             more: true
//             // iterations: 50 // very slow but more effective
//         }),
//         // imagemin.gifsicle({
//         //     interlaced: true,
//         //     optimizationLevel: 3
//         // }),
//         //gif very light lossy, use only one of gifsicle or Giflossy
//         imageminGiflossy({
//             optimizationLevel: 3,
//             optimize: 3, //keep-empty: Preserve empty transparent frames
//             lossy: 2
//         }),
//         imagemin.svgo({
//             plugins: [{
//                 removeViewBox: false
//             }]
//         }),
//         //jpg lossless
//         imagemin.mozjpeg({
//             progressive: true
//         }),
//         //jpg very light lossy, use vs jpegtran
//         imageminMozjpeg({
//             quality: 90
//         })
//     ])))
//     .pipe(gulp.dest(config.dest.img))
// );

gulp.task('copy:data', () => gulp
    .src(config.src.data + '/**/*.*')
    .pipe(gulp.dest(config.dest.data))
);

gulp.task('copy:media', () => gulp
    .src(config.src.media + '/**/*.*')
    .pipe(gulp.dest(config.dest.media))
);

// gulp.task('copy:rootfiles', () => gulp
//     .src(config.src.root + '/*.{ico,html}')
//     .pipe(gulp.dest(config.dest.root))
// );

let build;

if (config.env === "development") {
    build = gulp => gulp.series('copy:media');
} else {
    build = gulp => gulp.series('copy:media');
}


const watch = gulp => () => gulp.watch(config.src.img + '/*', gulp.parallel('copy:media'));

module.exports.build = build;
module.exports.watch = watch;