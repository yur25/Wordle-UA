import gulp from 'gulp';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSyncLib from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

const sass = gulpSass(dartSass);
const browserSync = browserSyncLib.create();

// Функція для динамічного імпорту
async function loadAutoprefixer() {
    const module = await import('gulp-autoprefixer');
    return module.default;
}

// Компіліруємо SCSS → CSS
gulp.task('styles', async function () {
    const autoprefixer = await loadAutoprefixer();

    return gulp.src('src/browser/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Мініфікація JS
gulp.task('scripts', function () {
    return gulp.src('src/browser/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});
// Запуск локального сервера
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('src/browser/**/*.scss', gulp.series('styles'));
    gulp.watch('src/browser/**/*.js', gulp.series('scripts'));
    gulp.watch('*.html').on('change', browserSync.reload);
});

// Завдання за замовчуванням
gulp.task('default', gulp.series('styles', 'scripts', 'serve'));