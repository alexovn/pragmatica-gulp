"use strict";

import config from '../config';
import { src, dest } from "gulp";
import favicon from "gulp-favicons";

function favicons() {
    return src(config.src.favicon)
        .pipe(favicon({
            icons: {
                appleIcon: true,
                favicons: true,
                online: false,
                appleStartup: false,
                android: false,
                firefox: false,
                yandex: false,
                windows: false,
                coast: false
            }
        }))
        .pipe(dest(config.dest.favicons))
}
exports.favicons = favicons;