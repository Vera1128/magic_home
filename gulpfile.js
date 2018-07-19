// 引入 gulp
var gulp = require('gulp');

// 引入组件
var plugins = require('gulp-load-plugins')();//加载其他插件
require('gulp-connect');
var proxy = require('http-proxy-middleware');

//配置
jshint_config = {
  eqeqeq: false,
  forin: false,
  debug: true,
  asi: false,
  strict: false
};
autoprefixer_config = {
  browsers: [
    'last 2 versions',
    'safari 5',
    'ie 8',
    'ie 9',
    'ie 6-7',
    'opera <= 12',
    'ios <= 8',
    'android <= 4',
    'Firefox <= 20'
  ],
  cascade: true,
  remove: false
};

// 检查脚本
gulp.task('lint', function () {
  gulp.src('./scripts/!(vendor)/*.js')
    .pipe(plugins.jshint(jshint_config))
    .pipe(plugins.jshint.reporter('default'));
  //.pipe(plugins.connect.reload());
});

// 编译Sass
gulp.task('sass', function () {
  gulp.src('./styles/**/*.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer(autoprefixer_config))
    .pipe(gulp.dest('./templates/'))
    .pipe(plugins.connect.reload());
});

//babel
gulp.task('babel', function () {
  gulp.src('./es6/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./templates/'));
    // .pipe(plugins.connect.reload());
});

// 压缩js文件 测试year_anchor_formal压缩后的js有用
gulp.task('minScripts', function () {
  gulp.src('./es6/turntable/js/*.js')
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./templates/turntable/js/'))
});
gulp.task('concatScripts', function () {
  gulp.src(['./templates/dialer/internal/activities/city2/js/*.js', '!./templates/dialer/internal/activities/city2/js/city2.js', '!./templates/dialer/internal/activities/city2/js/common.min.js'])
    .pipe(plugins.concat('common.js'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./templates/dialer/internal/activities/city2/js/'))
});
// 压缩css  测试了一下year_anchor_formal压缩后的css可用
gulp.task('minifyCss', () => {
  gulp.src('./templates/turntable/css/index.css')
    .pipe(plugins.cleanCss({compatibility: 'ie8'}))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest('./templates/turntable/css/'))
});

//压缩图片
gulp.task('imagemin', function(){
  gulp.src(['./andesres/image/dialer/*/*.*','!./andesres/image/dialer/dest'])
    .pipe(plugins.imagemin({
      optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('./andesres/image/dialer/dest'))
});

// 合并，压缩文件
gulp.task('scripts', function () {
  gulp.src('./scripts/*.js')
    .pipe(plugins.concat('all.js'))
    .pipe(gulp.dest('./dist'))
    .pipe(plugins.rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});
gulp.task('webserver', function () {
  plugins.connect.server({
    livereload: true,
    port: 8086,
    // host: '10.0.15.103'
    // host: '192.168.0.101'
    middleware: function (connect, opt) {
      return [
        proxy('/register/validate', {
          target: 'http://www.chubaogame.cn/register/validate',
          changeOrigin:true,
          pathRewrite: {'^/register/validate' : ''},
        }),
        proxy('/pcrimg', {
          target: 'http://www.chubaogame.cn/pcrimg',
          changeOrigin:true,
          pathRewrite: {'^/pcrimg' : ''},
        }),
        proxy('/register', {
          target: 'http://www.chubaogame.cn/register',
          changeOrigin:true,
          pathRewrite: {'^/register' : ''},
        }),
        proxy('/artical_list', {
          target: 'http://10.0.32.219:8877/artical_list',
          changeOrigin:true,
          pathRewrite: {'^/artical_list' : ''},
        })
      ]
    }
  });
});

gulp.task('html', function () {
  gulp.src('./templates/**/*.html')
    .pipe(plugins.connect.reload());
});

gulp.task('js', function () {
  gulp.src('./templates/**/*.js')
    .pipe(plugins.connect.reload());
});

gulp.task('css', function () {
  gulp.src('./templates/**/*.css')
    .pipe(plugins.connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./templates/**/*.html'], ['html']);
  gulp.watch(['./*.html'], ['html']);
  gulp.watch('./styles/**/*.scss', ['sass']);
  gulp.watch('./es6/**/*.js', ['babel']);
});
// 默认任务
gulp.task('default', function () {
  gulp.run('sass', 'watch', 'webserver', 'babel');
});