const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

/* gulp top level function

gulp.task - Define tasks
gulp.src = point to files to use
gulp.dest - points to folder to output
gulp.watch - watch files and folders for changes
*/

// Copy all html files across to the dist folder

gulp.task('copyHTML', async () => {
   await gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// This task will optimise the images

gulp.task('imageMin', async () => {
   await gulp
      .src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'));
});

// These three npm packages are chained together and remove white space and comments (minify), combine all js files into one file and then transpile them to es5 so older browsers can use them respectively//

gulp.task('minifyAndCombineJS', async () => {
   await gulp
      .src('src/js/*.js')
      /* I am getting a runtime error when using this package to transpile es6 to es5 so I have removed it for now until I can investigate the issue further
      /*  .pipe(
         babel({
            presets: ['babel-preset-env'],
         })
      )  */
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

// Combile SASS to minifed CSS //

gulp.task('sass', async () => {
   await gulp
      .src('src/css/*.scss')
      .pipe(concat('style.css'))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

// a task called default will run each time gulp is run, so using the 'default and using the parallel method we can call all
// functions at once. This task below has been commented out because it is manual way of running gulp, however the watch task below is will update all the time when
// I make changes so is far better

gulp.task(
   'default',
   gulp.parallel(['sass', 'minifyAndCombineJS', 'imageMin', 'copyHTML'])
);

// This will watch for file updates on the src files and run the task to update the dist file, this means the dist file
// is always up to date and therefore i can run live server on the dist file which means I dont have to run sass watch if I dont want to.

/*
gulp.task('watch', () => {
   gulp.watch('src/index.html', gulp.series('copyHTML'));
   gulp.watch('src/js/*.js', gulp.series('minifyAndCombineJS'));
   gulp.watch('src/images/*', gulp.series('imageMin'));
   gulp.watch('src/sass/*.scss', gulp.series('sass'));
 });
 
 gulp.task('default', gulp.series('watch')); */
