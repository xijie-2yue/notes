import { createHeader } from './header'
import { createContent } from './content'
import { createFooter } from './footer'

import img from '../images/laopo.jpg'
console.log(`img的类型--->${typeof img}--->${img}`)

let root = document.querySelector('body')

createHeader(root)
createContent(root)
createFooter(root)