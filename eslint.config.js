import antfu from '@antfu/eslint-config'

export default await antfu({
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'curly': ['error', 'all'],
    'no-unused-vars': ['warn'],
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})
