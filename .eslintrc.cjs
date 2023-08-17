/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn', //只报警告
      {
        singleQuote: true, //单引号
        semi: false, //没有分号
        printWidth: 100, //行宽100字符,超过则换行
        trailingComma: 'none', //对象数组最后一个不加逗号
        endOfLine: 'auto'
      }
    ],
    'vue/multi-word-component-names': [
      'warn', //一定多个单词构成组件
      {
        ignores: ['index'] //除了组件名为index
      }
    ],
    'vue/no-setup-props-destructure': ['off'] //关闭解构props的提示
  }
}
