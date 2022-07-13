import Vue from 'vue'
import { DirectiveBinding } from 'vue/types/options'

function nodeContains (rootNode: Element, searchableElement: Element): Element | undefined {
  if (searchableElement === rootNode) {
    return rootNode
  }

  for (let i = 0; i < rootNode.children.length; i++) {
    const child = rootNode.children[i]
    const isChild = nodeContains(child, searchableElement)
    if (isChild) {
      return isChild
    }
  }
}

function onWindowClick(el: Element, binding: DirectiveBinding, event: MouseEvent) {
  const result = nodeContains(el, event.target as Element)
  // const result = el === event.target || el.contains(event.target as Element)
  if (!result) {
    // binding.value - это функция, которая была передана для этой директивы снаружи
    // например v-click-outside="ТУТ"
    // мы её вызываем
    binding.value()
  }
}

type CustomElement = Element & {
  outsideListener: any
}

const clickOutsideDirective = {
  inserted (el: CustomElement, binding: DirectiveBinding) {
    setTimeout(() => {
      el.outsideListener = (event: MouseEvent) => onWindowClick(el, binding, event)
      window.addEventListener('click', el.outsideListener)
    }, 0)
  },
  unbind (el: CustomElement) {
    window.removeEventListener('click', el.outsideListener)
  }
}

// @ts-ignore
Vue.directive('click-outside', clickOutsideDirective)
