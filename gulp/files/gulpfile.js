// 入口文件
const { src, dest } = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

// 读取 src/reset.css 中的文件 导入到 dist/reset.css 中
// exports.default = () => {
//   return src('src/reset.css').pipe(dest('dist'))
// }

// 读取 src 下的所有 css 文件 并导入到 dist 中的同名文件中
// exports.default = () => {
//   return src('src/*.css').pipe(cleanCss()).pipe(dest('dist'))
// }

// 使用 gulp-clean-css 插件压缩css代码
exports.default = () => {
  return src('src/*.css')
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'))
}
