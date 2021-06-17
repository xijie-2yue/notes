import mountElement from './mountElement'
import updateComponent from './updateComponent'

/**
 * @description 更新组件时 进行组件的对比操作
 * @param {*} virtualDOM 组件本身的 virtualDOM 对象 通过它可以获取到组件最新的 props
 * @param {*} oldComponent 要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
 * @param {*} oldDOM 要更新的 DOM 对象 在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
 * @param {*} container 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
 */
export default function diffComponent(
  virtualDOM,
  oldComponent,
  oldDOM,
  container
) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 相同组件的更新
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不同组件的更新 直接渲染 并传入旧的DOM 对象进行处理
    mountElement(virtualDOM, container, oldDOM)
  }
}

/**
 * @description 对比是否为同一个组件
 * @param {*} virtualDOM
 * @param {*} oldComponent
 * @returns
 */
function isSameComponent(virtualDOM, oldComponent) {
  // virtualDOM.type 更新后的组件构造函数
  // oldComponent.constructor 未更新前的组件构造函数
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
