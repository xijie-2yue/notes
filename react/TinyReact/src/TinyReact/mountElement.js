import mountNativeElement from './mountNativeElement'

/**
 * @description 转化为真实DOM并挂载
 * @param {Object} virtualDOM 需要转换的VDOM
 * @param {HtmlElement} container 需要挂载到的HTML节点
 */
export default function mountElement(virtualDOM, container) {
  mountNativeElement(virtualDOM, container)
}
