import { defineConfig, presetUno } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'

import type { UserConfig } from 'unocss'

// FIXME https://github.com/unocss/unocss/issues/2542
export default defineConfig({
  presets: [presetUno(), presetIcons()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
}) as UserConfig
