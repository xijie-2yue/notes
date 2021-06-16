/**
 * 创建 Virtual DOM
 * @param {string} type 类型
 * @param {object | null} props 属性
 * @param  {createElement[]} children 子元素
 * @return {object} Virtual DOM
 */
export default function createElement(type, props, ...children) {
  // // 将原有 children 拷贝一份 不要在原有数组上进行操作
  // const childElements = [...children].map((child) => {
  //   // 判断 child 是否是对象类型
  //   if (child instanceof Object) {
  //     // 如果是 什么都不需要做 直接返回即可
  //     return child
  //   } else {
  //     // 如果不是对象就是文本 手动调用 createElement 方法将文本转换为 Virtual DOM
  //     return createElement('text', { textContent: child })
  //   }
  // })

  // 由于 map 方法无法从数据中刨除元素, 所以此处将 map 方法更改为 reduce 方法
  const childElements = [...children].reduce((result, child) => {
    // 判断子元素类型 刨除 null true false
    if (child != null && child != false && child != true) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        result.push(createElement('text', { textContent: child }))
      }
    }
    // 将需要保留的 Virtual DOM 放入 result 数组
    return result
  }, [])

  return {
    type,
    props,
    children: childElements,
  }
}
