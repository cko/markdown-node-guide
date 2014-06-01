var gulp = require('gulp');
var markdownpdf = require('gulp-markdown-pdf');

gulp.task('default', function () {
    // read file sample.md, transform it to pdf und write the result to the output directory
    gulp.src('sample.md')
        .pipe(markdownpdf({
            // there seem to be no other way than configuring the paths relatively
            // to the node module
            cssPath: '../../../../../pdf.css',
            runningsPath: '../../../../running.js'
        }))
        .pipe(gulp.dest('output'));
});
