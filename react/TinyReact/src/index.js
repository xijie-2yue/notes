import TinyReact from './TinyReact'

const root = document.getElementById('root')

const virtualDOM = (
  <div className="container">
    <h1>Hello Tiny React!</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert('你好')}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
  </div>
)

// console.log(virtualDOM)
// TinyReact.render(virtualDOM, root)

const Hello = (props) => <p>Hello {props.target}!</p>

// TinyReact.render(<Hello target="World" />, root)

class Person extends TinyReact.Component {
  constructor(props) {
    // 将 props 传递给父类 子类继承父类的 props 子类自然就有 props 数据了
    // 否则 props 仅仅是 constructor 函数的参数而已
    // 将 props 传递给父类的好处是 当 props 发生更改时 父类可以帮助更新 props 更新组件视图
    super(props)
  }

  render() {
    return (
      <div>
        <p>姓名：{this.props.name}</p>
        <p>年龄：{this.props.age}</p>
      </div>
    )
  }
}

TinyReact.render(<Person name="张三" age={18} />, root)
