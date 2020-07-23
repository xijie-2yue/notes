export function createContent(root) {
  let el = document.createElement('p')
  el.innerText = '这是内容'
  
  root.appendChild(el)
}