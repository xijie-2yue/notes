import diff from './diff'

/**
 * @description DOM节点渲染
 * @param {Object} virtualDOM 需要渲染的VDOM
 * @param {HtmlElement} container 需要挂载到的HTML节点
 * @param {HtmlElement} oldDOM 旧的HTML节点
 */
export default function render(
  virtualDOM,
  container,
  oldDOM = container.firstChild // 默认为挂载节点的第一个子节点  首次渲染为 null
) {
  // 在 diff 方法内部判断是否需要对比 对比也好 不对比也好 都在 diff 方法中进行操作
  diff(virtualDOM, container, oldDOM)
}
