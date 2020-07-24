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

