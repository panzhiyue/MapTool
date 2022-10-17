module.exports = {
	env: {
		browser: true,
		'vue/setup-compiler-macros': true,
	},
	extends: ['plugin:vue/vue3-essential', '@vue/standard', 'xo', 'prettier'],
	overrides: [
		{
			extends: ['xo-typescript'],
			files: ['*.ts', '*.tsx'],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['vue'],
	rules: {
		indent: ['error', 'tab'], //使用tab缩进
		'linebreak-style': ['error', 'off'], //不检测换行样式
		quotes: ['error', 'single'], //单引号
		semi: ['error', 'always'], //始终需要分号
		'vue/no-multiple-template-root': 'off', //vue是否允许有多个根template
	},
};

