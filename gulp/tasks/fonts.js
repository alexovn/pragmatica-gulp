"use strict";

import config from '../config';

import { src, dest } from "gulp";
import gulp from "gulp";

import fs from "fs";
import c from 'ansi-colors';
import plumber from "gulp-plumber";

import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import fonter from "gulp-fonter";
const browserSync = require("browser-sync").create();

const srcPath = 'src/';


function fonts() {
    src(config.src.fonts)
        .pipe(plumber())
        .pipe(ttf2woff())
        .pipe(dest(config.dest.fonts))
    return src(config.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(config.dest.fonts))
        .pipe(browserSync.stream())
}

function fonts_otf() {
    return src("./" + srcPath + "/fonts/*.otf")
        .pipe(plumber())
        .pipe(fonter({
            formats: ["ttf"]
        }))
        .pipe(dest("./" + srcPath + "/fonts/"))
}

function fontstyle(cb) {
    let file_content = fs.readFileSync(srcPath + "styles/main/dev/generated/_fonts.scss");
    if (file_content == "") {
        fs.writeFile(srcPath + "styles/main/dev/generated/_fonts.scss", "", cb);
        return fs.readdir(config.dest.fonts, function (err, items) {
            if (err) {
                throw err
            } else if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split(".");
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(srcPath + "styles/main/dev/generated/_fonts.scss", '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    } else {
        console.log(c.yellow.bold.underline("fonts.scss has a data"))
    }
    cb()
}

const fontsBundle = gulp.series(fonts_otf, fonts, fontstyle);

exports.fontsBundle = fontsBundle;