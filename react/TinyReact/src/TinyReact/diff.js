import mountElement from './mountElement'

/**
 * @description VDOM 比对算法
 * @param {Object} virtualDOM 需要渲染的VDOM
 * @param {HtmlElement} container 需要挂载到的HTML节点
 * @param {HtmlElement} oldDOM 旧的HTML节点
 */
export default function diff(virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果不存在 不需要对比 直接将 Virtual DOM 转换为真实 DOM
    mountElement(virtualDOM, container)
  }
}
