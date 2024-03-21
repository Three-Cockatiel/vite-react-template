module.exports = {
  extends: ['tc-react'],
  parserOptions: {
    requireConfigFile: false, // 因为swc没有选用babel，暂时关闭检测，找到swc解析器之后更改
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  // overrides: [
  //   {
  //     files: ['**/*.js?(x)'],
  //     parser: '@swc/core/parser', // 指定 SWC 解析器
  //   },
  // ],
};
