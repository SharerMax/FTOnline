module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    // commonjs: true,
  },
  extends: [
    '@antfu/eslint-config-vue',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'curly': ['error', 'all'],
    'vue/component-tags-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
  },
}
