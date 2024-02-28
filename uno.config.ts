import { defineConfig, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetIcons from '@unocss/preset-icons'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import transformerDirectives from '@unocss/transformer-directives'

import type { UserConfig } from 'unocss'

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
  transformers: [transformerVariantGroup(), transformerDirectives()],
}) as UserConfig
