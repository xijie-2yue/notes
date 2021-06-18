/**
 * @description 卸载节点
 * @param {*} node
 * @returns
 */
export default function unmountNode(node) {
  // 1. 如果要删除的节点是文本节点的话可以直接删除
  // 2. 如果要删除的节点由组件生成，需要调用组件卸载生命周期函数
  // 3. 如果要删除的节点中包含了其他组件生成的节点，需要调用其他组件的卸载生命周期函数
  // 4. 如果要删除的节点身上有 ref 属性，还需要删除通过 ref 属性传递给组件的 DOM 节点对象
  // 5. 如果要删除的节点身上有事件，需要删除事件对应的事件处理函数

  // 获取该节点的的 virtual DOM 对象
  const virtualDOM = node.__virtualDOM__

  // 文本节点
  if (virtualDOM.type === 'text') {
    node.remove()
    return
  }

  // 组件节点
  let component = virtualDOM.component
  if (component) {
    component.componentWillUnmount()
  }

  // 清除绑定的ref属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }

  // 清除绑定的时间
  Object.keys(virtualDOM.props).forEach((propName) => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(0, 2)
      const eventHandle = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandle)
    }
  })

  // 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }

  // 删除节点
  node.remove()
}
