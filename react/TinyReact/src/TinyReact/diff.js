import createDOMElement from './createDOMElement'
import isFunction from './isFunction'
import mountElement from './mountElement'
import updateElementNode from './updateElementNode'
import updateTextNode from './updateTextNode'

/**
 * @description VDOM 比对算法
 * @param {Object} virtualDOM 需要渲染的VDOM
 * @param {HtmlElement} container 需要挂载到的HTML节点
 * @param {HtmlElement} oldDOM 旧的HTML节点
 */
export default function diff(virtualDOM, container, oldDOM) {
  // 获取更新前的 virtual DOM
  const oldVirtualDOM = oldDOM && oldDOM.__virtualDOM__
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果不存在 不需要对比 直接将 Virtual DOM 转换为真实 DOM
    mountElement(virtualDOM, container)
  } else if (
    // 如果 Virtual DOM 类型不一样
    virtualDOM.type !== oldVirtualDOM.type &&
    // 并且 Virtual DOM 不是组件 因为组件要单独进行处理
    !isFunction(virtualDOM)
  ) {
    // 根据 Virtual DOM 创建真实 DOM 元素
    const newDOM = createDOMElement(virtualDOM)
    // 用创建出来的真实 DOM 元素 替换旧的 DOM 元素
    oldDOM.parentNode.replaceChild(newDOM, oldDOM)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 类型相同则直接修改节点内容
    if (virtualDOM.type === 'text') {
      // 文本节点
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 元素节点
      updateElementNode(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 递归对比 Virtual DOM 的子元素
    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })
  }
}
