import createDOMElement from './createDOMElement'
import diffComponent from './diffComponent'
import isFunction from './isFunction'
import mountElement from './mountElement'
import unmountNode from './unmountNode'
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
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
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
  } else if (isFunction(virtualDOM)) {
    // 要更新的是组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 类型相同则直接修改节点内容
    if (virtualDOM.type === 'text') {
      // 文本节点
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 元素节点
      updateElementNode(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 1. 将拥有key的子元素存储起来
    let keyedElements = {}
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) {
        // 元素节点
        let key = domElement.getAttribute('key')
        // 存在key值则存入 keyedElements
        key && (keyedElements[key] = domElement)
      }
    }

    // 判断是否有key值
    let hasNotKey = Object.keys(keyedElements).length === 0
    if (hasNotKey) {
      // 递归对比 Virtual DOM 的子元素
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    } else {
      // 2. 循环 virtual DOM 的子元素 获取key值
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key || key == 0) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 3. 该元素是否应该处于该位置
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              // 当前位置元素 与 key值元素位置 不一致 则将key值元素替换掉当前位置的元素
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 删除多余节点
    // 获取旧节点的数量
    let oldChildNodes = oldDOM.childNodes
    // 如果旧节点的数量多于要渲染的新节点的长度
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNotKey) {
        for (
          let i = oldChildNodes.length - 1;
          i > virtualDOM.children.length - 1;
          i--
        ) {
          oldDOM.removeChild(oldChildNodes[i])
        }
      } else {
        // 通过key属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild.__virtualDOM__.props.key
          let found = false
          for (let j = 0; j < virtualDOM.children.length; j++) {
            if (oldChildKey === virtualDOM.children[j].props.key) {
              found = true
              break
            }
          }
          if (!found) {
            // 新的VDOM中未找到该key值得元素
            unmountNode(oldChild)
          }
        }
      }
    }
  }
}
