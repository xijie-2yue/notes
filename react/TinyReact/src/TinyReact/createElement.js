/**
 * 创建 Virtual DOM
 * @param {string} type 类型
 * @param {object | null} props 属性
 * @param  {createElement[]} children 子元素
 * @return {object} Virtual DOM
 */
export default function createElement(type, props, ...children) {
  // 将原有 children 拷贝一份 不要在原有数组上进行操作
  const childElements = [...children].map((child) => {
    // 判断 child 是否是对象类型
    if (child instanceof Object) {
      // 如果是 什么都不需要做 直接返回即可
      return child
    } else {
      // 如果不是对象就是文本 手动调用 createElement 方法将文本转换为 Virtual DOM
      return createElement('text', { textContent: child })
    }
  })

  return {
    type,
    props,
    children: childElements,
  }
}
