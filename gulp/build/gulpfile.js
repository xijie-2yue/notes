// 入口文件
const fs = require('fs')
const { Transform } = require('stream')

exports.build = () => {
  // 文件读取流
  const read = fs.createReadStream('reset.css')
  // 文件写入流
  const write = fs.createWriteStream('reset.min.css')
  // 文件转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      // 核心转换过程的实现
      // chunk => 读取流中读取到的内容（Buffer）
      const input = chunk.toString()
      const output = input
        .replace(/\s+/g, '') // 替换所有空白字库
        .replace(/\/\*.+?\*\//g) // 替换掉css的注释
      callback(null, output)
    },
  })

  // 把读取出来的文件 先转换 再导入写入流
  read.pipe(transform).pipe(write)

  return read
}
