"use strict";

const { src, dest, watch } = require("gulp"),
  rename = require("gulp-rename"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  concat = require("gulp-concat"),
  terser = require("gulp-terser"),
  babel = require("gulp-babel"),
  replace = require("gulp-string-replace"),
  htmlmin = require("gulp-htmlmin");

const paths = {
  styles: {
    src: "./styles/**/*.css",
    dest: "./dist/css/",
  },
  scripts: {
    src: "./scripts/*.js",
    dest: "./dist/js/",
  },
  fonts: {
    src: "./fonts/*",
    dest: "./dist/fonts/",
  },
  libs: {
    src: "./libs/*/*",
    dest: "./dist/libs/",
  },
  images: {
    src: "./images/*",
    dest: "./dist/images/",
  },
  data: {
    src: "./data/*",
    dest: "./dist/data/",
  },
};

async function build() {
  style();
  script();
  fonts();
  copyFiles();
  replaceStrings();
}

function style() {
  return src(paths.styles.src)
    .pipe(concat("site.css"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest(paths.styles.dest));
}

function script() {
  return src(paths.scripts.src)
    .pipe(concat("site.min.js"))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest(paths.scripts.dest));
}

function fonts() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

function copyFiles() {
  src(paths.libs.src).pipe(dest(paths.libs.dest));
  src(paths.images.src).pipe(dest(paths.images.dest));
  src(paths.data.src).pipe(dest(paths.data.dest));
}

function replaceStrings() {
  return src(["./index.html"])
    .pipe(replace('<script src="./scripts/utils.js"></script>', ""))
    .pipe(replace('<script src="./scripts/DataStore.js"></script>', ""))
    .pipe(replace('<script src="./scripts/ListView.js"></script>', ""))
    .pipe(replace('<script src="./scripts/Table.js"></script>', ""))
    .pipe(replace('<link rel="stylesheet" href="./styles/fonts.css">', ""))
    .pipe(replace('<link rel="stylesheet" href="./styles/table.css">', ""))

    .pipe(replace("./scripts/main.js", "./js/site.min.js"))
    .pipe(replace("./styles/main.css", "./css/site.min.css"))

    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
}

exports.script = script;
exports.style = style;
exports.build = build;
exports.fonts = fonts;
exports.replaceStrings = replaceStrings;

exports.default = function () {
  watch(paths.styles.src, style);
  watch(paths.scripts.src, script);
};
