import type { Directive } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    vFocus: Directive<HTMLElement>
  }
}
