// TODO: 当此文件名为 directives.d.ts 时影响全局组件声明
import type { Directive } from 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    vFocus: Directive<HTMLElement>
  }
}
