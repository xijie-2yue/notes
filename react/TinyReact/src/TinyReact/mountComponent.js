import isFunction from './isFunction'
import isFunctionalComponent from './isFunctionalComponent'
import mountNativeElement from './mountNativeElement'

/**
 * @description 渲染组件
 * @param {Object} virtualDOM
 * @param {HTMLElement} container
 */
export default function mountComponent(virtualDOM, container) {
  // 存放组件调用后返回的 Virtual DOM 的容器
  let nextVirtualDOM = null

  // 区分函数型组件和类组件
  if (isFunctionalComponent(virtualDOM)) {
    // 函数组件 调用 buildFunctionalComponent 方法处理函数组件
    nextVirtualDOM = buildFunctionalComponent(virtualDOM)
  } else {
    // 类组件
  }

  // 判断得到的 Virtual Dom 是否是组件
  if (isFunction(nextVirtualDOM)) {
    // 如果是组件 继续调用 mountComponent 解剖组件
    mountComponent(nextVirtualDOM, container)
  } else {
    // 如果是 Native Element 就去渲染
    mountNativeElement(nextVirtualDOM, container)
  }
}

// 通过 Virtual DOM 中的 type 属性获取到组件函数并调用
// 调用组件函数时将 Virtual DOM 对象中的 props 属性传递给组件函数 这样在组件中就可以通过 props 属性获取数据了
// 组件返回要渲染的 Virtual DOM
function buildFunctionalComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {})
}
