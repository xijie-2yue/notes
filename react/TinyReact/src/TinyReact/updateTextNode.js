export default function updateTextNode(virtualDOM, oldVirtualDOM, oldDOM) {
  // 如果文本内容不同
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    // 更新真实 DOM 对象中的内容
    oldDOM.textContent = virtualDOM.props.textContent
  }
  // 将新的 Virtual DOM 同步到对应的真实 DOM 内
  oldDOM.__virtualDOM__ = virtualDOM
}
