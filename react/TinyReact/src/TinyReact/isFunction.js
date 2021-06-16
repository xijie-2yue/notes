/**
 * @description 判断是否为组件
 * @param {Object} virtualDOM
 * @returns
 */
export default function isFunction(virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === 'function'
}
