import { defineConfig, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetIcons from '@unocss/preset-icons'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import transformerDirectives from '@unocss/transformer-directives'

import type { CSSObject, UserConfig } from 'unocss'

// FIXME https://github.com/unocss/unocss/issues/2542
export default defineConfig({
  shortcuts: {
    btn: 'border-1 border-orange text-orange outline-none  bg-transparent rounded cursor-pointer hover:(border-yellow text-yellow)',
  },
  presets: [presetUno(), presetIcons({
    collections: {
      // svg extension
      ft: FileSystemIconLoader('./src/assets/img', svg => svg.replace(/#fff/, 'currentColor')),
    },
  })],
  rules: [
    [/^grid-cols-auto-(\d+)$/, ([, d]) => ({
      'grid-template-columns': `repeat(auto-fill, ${+d / 4}rem)`,
    })],
    [/^grid-cols-auto-minmax-(\d+)$/, ([, d]) => ({
      'grid-template-columns': `repeat(auto-fill, minmax(${+d / 4}rem, 1fr))`,
    })],
    [/^border-radius-(lt|rt|rb|lb|tl|tr|br|bl)-(\d+)$/, ([, p, d]) => {
      const cssObj: CSSObject = {}
      switch (p) {
        case 'lt':
        case 'tl':
          cssObj['border-top-left-radius'] = `${+d / 4}rem`
          break
        case 'rt':
        case 'tr':
          cssObj['border-top-right-radius'] = `${+d / 4}rem`
          break
        case 'rb':
        case 'br':
          cssObj['border-bottom-right-radius'] = `${+d / 4}rem`
          break
        case 'lb':
        case 'bl':
          cssObj['border-bottom-left-radius'] = `${+d / 4}rem`
          break
      }
      return cssObj
    }],
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
}) as UserConfig
