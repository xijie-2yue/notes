import isFunction from './isFunction'
import mountComponent from './mountComponent'
import mountNativeElement from './mountNativeElement'

/**
 * @description 转化为真实DOM并挂载
 * @param {Object} virtualDOM 需要转换的VDOM
 * @param {HtmlElement} container 需要挂载到的HTML节点
 */
export default function mountElement(virtualDOM, container) {
  // 无论是类组件还是函数组件 其实本质都是函数
  // 即若 Virtual DOM 判断为函数 就说明其为组件
  if (isFunction(virtualDOM)) {
    // 如果是组件 调用 mountComponent 方法进行组件渲染
    mountComponent(virtualDOM, container)
  } else {
    mountNativeElement(virtualDOM, container)
  }
}
