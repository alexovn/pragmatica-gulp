"use strict";

import config from '../config';
import { src, dest } from "gulp";

import newer from "gulp-newer";
import imagemin from "gulp-imagemin";
import gulpif from "gulp-if";

import yargs from 'yargs';
const argv = yargs.argv;
const production = !!argv.production;

function images() {
    return src(config.src.img)
        .pipe(newer(config.dest.img))
        .pipe(gulpif(production, imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 70, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ])))
        .pipe(dest(config.dest.img))
}

exports.images = images;