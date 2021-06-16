import isFunction from './isFunction'

/**
 * @description 是否为函数组件
 * @param {Object} virtualDOM
 * @returns
 */
export default function isFunctionalComponent(virtualDOM) {
  const type = virtualDOM.type
  // 只有类组件的原型对象中有render方法
  // 条件有两个: 1. Virtual DOM 的 type 属性值为函数 2. 函数的原型对象中不能有render方法
  return (
    type && isFunction(virtualDOM) && !(type.prototype && type.prototype.render)
  )
}
