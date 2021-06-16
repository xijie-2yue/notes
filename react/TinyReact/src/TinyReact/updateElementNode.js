/**
 * @description 设置节点属性
 * @param {HtmlElement} element 当前HTML节点
 * @param {Object} virtualDOM 当前的VDOM
 * @param {Object} oldVirtualDOM 之前的VDOM
 */
export default function updateElementNode(
  element,
  virtualDOM,
  oldVirtualDOM = {}
) {
  // 获取要解析的 VirtualDOM 对象中的属性对象
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}

  // 将属性对象中的属性名称放到一个数组中并循环数组
  Object.keys(newProps).forEach((propName) => {
    // 获取新旧属性值
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]

    if (newPropsValue !== oldPropsValue) {
      if (propName.slice(0, 2) === 'on') {
        // 考虑属性名称是否以 on 开头 如果是就表示是个事件属性 onClick -> click
        const eventName = propName.toLowerCase().slice(2)
        // 为元素添加属性
        element.addEventListener(eventName, newPropsValue)
        // 删除原有的事件的事件处理函数
        if (oldPropsValue) {
          element.removeEventListener(eventName, oldPropsValue)
        }
      } else if (propName === 'value' || propName === 'checked') {
        // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
        element[propName] = newPropsValue
      } else if (propName !== 'children') {
        // 刨除 children 因为它是子元素 不是属性
        if (propName === 'className') {
          // className 属性单独处理 不直接在元素上添加 class 属性是因为 class 是 JavaScript 中的关键字
          element.classList.add(newPropsValue)
        } else {
          // 普通属性
          element.setAttribute(propName, newPropsValue)
        }
      }
    }
  })

  // 判断属性被删除的情况
  Object.keys(oldProps).forEach((propName) => {
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]
    if (!newPropsValue) {
      // 属性被删除了
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        element.removeEventListener(eventName, oldPropsValue)
      } else if (propName === 'className') {
        element.classList.remove(oldPropsValue)
      } else if (propName !== 'children') {
        element.removeAttribute(propName)
      }
    }
  })
}
