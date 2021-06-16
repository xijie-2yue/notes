import createDOMElement from './createDOMElement'

/**
 * @description HTML原生节点的渲染
 * @param {Object} virtualDOM 需要转换的VDOM
 * @param {HtmlElement} container 需要挂载到的HTML节点
 */
export default function mountNativeElement(virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM)
  container.appendChild(newElement)
}
