// TODO: 当此文件名为 directives.d.ts 时影响全局组件声明
import type { FunctionDirective } from 'vue'

declare module 'vue' {
  // TODO: https://github.com/vuejs/language-tools/issues/465
  // https://github.com/vuejs/core/pull/3399
  // https://github.com/vuejs/core/blob/main/packages-private/dts-test/componentTypeExtensions.test-d.tsx
  export interface GlobalDirectives {
    vFoucs: FunctionDirective<HTMLElement>
  }
  // interface ComponentCustomProperties {
  //   vFocus: FunctionDirective<HTMLElement>
  // }
}
