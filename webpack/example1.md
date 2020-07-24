#### 在 `package.json` 中设置

```json
"scripts": {
    "bundle": "webpack"
  },
```

这个 `scripts` 对象叫做命令映射表， 可以将一些复杂的命令行给进行简化，这样在开发者进行输入 命令时，降低输入的复杂度

在此处`npm run bundle` 等同于 `npx webpack`



#### 运行 `npx webpack` 或者 `npm run bundle` 

```powershell

> example1@1.0.0 bundle xxxxx\notes\webpack\example1
> webpack

Hash: 5e62105d7d218a2bfda2
Version: webpack 4.43.0
Time: 60ms
Built at: 2020-07-23 23:18:21
  Asset      Size  Chunks             Chunk Names
main.js  6.29 KiB    main  [emitted]  main
Entrypoint main = main.js
[./js/content.js] 141 bytes {main} [built]
[./js/footer.js] 140 bytes {main} [built]
[./js/header.js] 141 bytes {main} [built]
[./js/index.js] 231 bytes {main} [built]
```

`Hash`：本次打包唯一的hash值

`Version`：本次打包所使用的webpack版本号

`Time`：本次打包所用时间

`Built at`：本次打包的时间

`asset`：打包的最终文件( 可能有多个文件 )

`size`：文件大小

`chunks`：文件对应的ID

`chunk Name`：文件对应的名字



#### `entry` 入口文件

指示 webpack 应该使用哪个模块，来作为构建其内部*依赖图*的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

**单个入口语法**

```js
const config = {
  entry: './index.js'
}

// or

const config = {
  entry: ['./index.js']
}

// or

const config = {
  entry: {
    index: './index.js'
  }
}
```

**多个入口语法**

```js
const config = {
  entry: ['./index2.js', './index2.js']
}

// or

const config = {
  entry: {
    index1: './index1.js',
    index2: './index2.js'
  }
}
```



#### `output` 输出

可以控制 webpack 如何向硬盘写入编译文件

在 webpack 中配置 `output` 属性的最低要求是，将它的值设置为一个对象，包括以下两点：

- `filename` 用于输出文件的文件名。
- 目标输出目录 `path` 的**绝对路径**。

```js
const config = {
  output: {
    filename: 'main.js',
    path: './bundle'
  }
}
```

此配置将一个单独的 `main.js` 文件输出到 `./bundle` 目录中。

多个入口文件，需要对应多个出口时，则应该使用**占位符**来确保每个文件具有唯一的名称。

```js
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}

// 输出 写入到硬盘：./dist/app.js, ./dist/search.js
```



#### `mode` 打包模式

通过选择 `development` 或 `production` 之中的一个，来设置 `mode` 参数，你可以启用相应模式下的 webpack 内置的优化

`production` ：默认 代码会被压缩

`production` ：代码会保持原本的缩进格式 适合阅读



#### `loader` 载入器

当在 `index.js` 中引入图片文件时

```js
import img from '../images/laopo.jpg'
console.log(`img的类型--->${typeof img}--->${img}`)
```

此时打包就会报错

```powershell
ERROR in ./src/images/laopo.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
 @ ./src/js/index.js 5:0-37 6:32-35 6:42-45
```

报错提示： `You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.`

意思即为：*<u>您可能需要一个适当的加载器来处理此文件类型，目前没有配置加载器来处理此文件</u>*。

打包处理出现了问题，是因为webpack默认<u>只知道如何打包js文件</u>，但是其他文件就不知道如何打包，这个时候我们就需要自己主动去定义能够解析图片文件的<u>loader</u>了

**`loader` 配置方案**

```js
module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
```

`module` 属性里面是一个对象，对象的 `rules` 属性值是一个数据，内部的每个数组项目都是对某一 类文件进行 `loader` 的配置对象

`test`：就是筛选特定的文件，一般就是以后缀名为识别码

`use`：就是采用哪个具体的 `loader`

此时再进行一次打包

```powershell
Hash: 9718c06a6b0a41b43a0a
Version: webpack 4.43.0
Time: 116ms
Built at: 2020-07-24 21:47:05
                               Asset      Size  Chunks             Chunk Names
ff67a56a1f576aacff981d986c377725.jpg  27.8 KiB          [emitted]
                             main.js   7.2 KiB    main  [emitted]  main
Entrypoint main = main.js
[./src/images/laopo.jpg] 80 bytes {main} [built]
[./src/js/content.js] 141 bytes {main} [built]
[./src/js/footer.js] 140 bytes {main} [built]
[./src/js/header.js] 141 bytes {main} [built]
[./src/js/index.js] 328 bytes {main} [built]
```

可以发现除了 `main.js` 外，多了一个 `ff67a56a1f576aacff981d986c377725.jpg` 的文件

这次打包引入了一个 `loader` === > `file-loader` 

**`file-loader` 帮助我做的事情**

1. 当 `file-loader` 检测到 `.jpg` 图片时，会把该图片资源移动到 `output` 的指定文件夹下，并且给图片设置名字（改名字可以自定义或是设置为默认的md5值）
2. 当把图片挪到 `output` 的指定文件夹之后， `file-loader` 会把该图片相对于 `output` 指定的文件夹的相对位置参数作为返回值,返回给引入文件时定义的变量 
3. 上述动作不限于图片，可以用于一切文件，

**`file-loader` 的详细配置**

在 `user` 里面添加一个 `options` 的属性，可以给对应的 `loader` 进行更详细的配置，具体的配置可[参考文档](https://www.webpackjs.com/loaders/)

```js
rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'my_[name].[ext]',
            outputPath: './images'
          }
        }
      }
    ]
```

打包后，图片的路径为 `/bundle/images/my_laopo.jpg` 即重新配置了文件名和路径

```powershell
              Asset      Size  Chunks             Chunk Names
images/my_laopo.jpg  27.8 KiB          [emitted]
            main.js  7.18 KiB    main  [emitted]  main
```

同样的，如果需要打包多种图片类型只需要配置

```js
test: /\.(png|jpg|gif)$/
```

如果引入的是网络图片，如 `https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3104253719,1351275423&fm=26&gp=0.jpg` 则可以使用 `url-loader` ，具体配置可[参考文档](https://www.webpackjs.com/loaders/)

```js
rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'my_[name].[ext]',
            outputPath: './images'
          }
        }
      }
    ]
```



