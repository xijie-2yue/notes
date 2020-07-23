export function createFooter(root) {
  let el = document.createElement('p')
  el.innerText = '这是页脚'
  
  root.appendChild(el)
}