import { createHeader } from './header'
import { createContent } from './content'
import { createFooter } from './footer'

let root = document.querySelector('body')

createHeader(root)
createContent(root)
createFooter(root)