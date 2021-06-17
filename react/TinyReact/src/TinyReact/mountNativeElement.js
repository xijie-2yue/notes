import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

/**
 * @description HTML原生节点的渲染
 * @param {Object} virtualDOM 需要转换的VDOM
 * @param {HtmlElement} container 需要挂载到的HTML节点
 * @param {HTMLElement} oldDOM
 */
export default function mountNativeElement(virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM)
  if (oldDOM) {
    container.insertBefore(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }

  if (oldDOM) {
    unmountNode(oldDOM)
  }

  // 获取组件实例对象
  const component = virtualDOM.component
  // 如果组件实例对象存在
  if (component) {
    // 保存 DOM 对象
    component.setDOM(newElement)
  }
}
