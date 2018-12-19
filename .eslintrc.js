// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "no-undef": 0,
    // 换行风格
    "linebreak-style": [0, "unix"],
    // 引号类型：使用单引号
    "quotes": [1, "single"],
    // 禁止分号作为语句结尾
    "semi": ["error", "never"],
    // 关闭强制使用 '===' 和 '!==' 来做判断比较
    "eqeqeq": 0,
    // 关闭强制 声明未使用变量
    "no-unused-vars": 0,
    // 关闭函数名后的空格
    "space-before-function-paren": 0,
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
