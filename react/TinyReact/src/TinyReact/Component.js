import diff from './diff'

/**
 * @description 类组件的构造函数
 */
export default class Component {
  constructor(props) {
    this.props = props
  }

  setState(state) {
    // setState 方法被子类调用 此处this指向子类实例对象
    // 所以改变的是子类的 state 对象
    this.state = Object.assign({}, this.state, state)

    // 通过调用 render 方法获取最新的 Virtual DOM
    let virtualDOM = this.render()
    // 获取页面中正在显示的 DOM 对象 通过它可以获取其对象的 Virtual DOM 对象
    let oldDOM = this.getDOM()
    // 获取真实 DOM 对象对应的父级容器对象
    let container = oldDOM.parentNode
    // 比对
    diff(virtualDOM, container, oldDOM)
  }

  // 保存 DOM 对象的方法
  setDOM(dom) {
    this.__dom__ = dom
  }

  // 获取 DOM 对象的方法
  getDOM() {
    return this.__dom__
  }

  updateProps(props) {
    this.props = props
  }

  // 生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, preState) {}
  componentWillUnmount() {}
}
