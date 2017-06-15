/*
 * @Author: iceStone
 * @Date:   2016-01-25 18:54:36
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-01-26 14:16:10
 */

'use strict';



/*
/!*基本使用*!/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

gulp.task('test', function () {
    gulp.src('src/img/!*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});
*/



/*gulp-imagemin其他参数*/
/*var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

gulp.task('testImagemin', function () {
    gulp.src('src/img/!*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});*/



/*深度压缩图片*/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
//确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
    pngquant = require('imagemin-pngquant');

gulp.task('test', function () {
    gulp.src('src/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('dist/img'));
});


/*你也许听过 LiveReload ，一个监听文件变化的工具并能自动刷新服务。如果仅仅是样式的改变都不需要重新加载。一旦有改变页面立即刷新。

 然而 BrowserSync 更进一步：它能实现LiveReload所有功能，但是不需要安装浏览器插件并且它可以在所有连接的浏览器上同步操作例如滚动，点击，刷新或填充表单。
 移动设备上也同样有效。BrowserSync甚至支持开发服务器。这就是我在开发服务器上只用BrowserSync来实现实时刷新的原因。*/
var browserSync = require('browser-sync').create();

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// 代理

/*gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "你的域名或IP"
    });
});*/





/*
/!*只压缩修改的图片。压缩图片时比较耗时，在很多情况下我们只修改了某些图片，没有必要压缩所有图片，使用”gulp-cache”只压缩修改的图片，没有修改的图片直接从缓存文件读取（C:\Users\Administrator\AppData\Local\Temp\gulp-cache）。*!/
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
//确保本地已安装gulp-cache [cnpm install gulp-cache --save-dev]
    cache = require('gulp-cache');

gulp.task('testImagemin', function () {
    gulp.src('src/img/!*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});*/
