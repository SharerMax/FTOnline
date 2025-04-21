import type { CSSObject } from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import presetIcons from '@unocss/preset-icons'
import presetWind3 from '@unocss/preset-wind3'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    btn: 'border-1 border-orange border-solid text-orange bg-transparent rounded cursor-pointer hover:(border-yellow text-yellow)',
  },
  presets: [presetWind3(), presetIcons({
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
})
