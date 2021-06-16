import createDOMElement from './createDOMElement'

/**
 * @description HTML原生节点的渲染
 * @param {Object} virtualDOM 需要转换的VDOM
 * @param {HtmlElement} container 需要挂载到的HTML节点
 */
export default function mountNativeElement(virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM)

  // 将 Virtual DOM 挂载到真实 DOM 对象的属性中 方便在对比时获取其 Virtual DOM
  newElement.__virtualDOM__ = virtualDOM

  // 获取组件实例对象
  const component = virtualDOM.component
  // 如果组件实例对象存在
  if (component) {
    // 保存 DOM 对象
    component.setDOM(newElement)
  }

  container.appendChild(newElement)
}
