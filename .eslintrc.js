module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"airbnb",
		"eslint:recommended"
    ],
    parser: "babel-eslint",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"import",
		'jest',
		"react"
	],
	"rules": {
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"quotes": [
			"error",
			"double"
		],
		"comma-dangle": 0,
		'react/jsx-filename-extension': 'off',
		"react/prefer-stateless-function": "off",
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"react/prop-types": [0, { "ignore": ["navigation", "props."] }],
		"react/jsx-fragments": 0,
		"keyword-spacing": ["error", {
			"overrides": {
				"if": { "after": false },
				"for": { "after": false },
				"while": { "after": false },
				"catch": { "after": false }
			}
		}],
		"no-tabs": 0,
		"no-console": ["warn", { allow: ["warn", "error", "info"] }],
		"no-mixed-spaces-and-tabs": "error",
		"import/no-cycle": [2, { maxDepth: 1 }],
		"import/prefer-default-export": "off",
		"arrow-body-style": "off",
		"eol-last": 0,
 		"no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
		"object-curly-newline": "off",
		"padded-blocks": [2, "never"],
		"react/sort-comp": "off",
		"max-len": "off",
		"react/jsx-boolean-value": "off",
		"no-useless-escape": "off",
		"consistent-return": "off",
		"object-shorthand": "off",
		"react/no-unescaped-entities": "off",
		"global-require": "off",
		"react/forbid-prop-types": 0,
		"no-unneeded-ternary": 'off',
		"prefer-const": "off",
		"quote-props": ["off", "always"],
		"default-case": 0,
		"radix": 0,
		"space-before-function-paren": ["error", "never"],
		"prefer-arrow-callback": "off",
		"func-names": ["error", "never"],
		"react/no-did-update-set-state": 0,
		"no-else-return": "off",
		"no-return-assign": "off",
		"no-empty": ["error", { "allowEmptyCatch": true }],
		"no-async-promise-executor": 0,
		"no-plusplus": [2, { allowForLoopAfterthoughts: true }],
		"import/no-extraneous-dependencies": 0,
		"import/no-unresolved": [2, { ignore: ["src"] }],
		"import/no-named-as-default": 0,
		"react/jsx-props-no-spreading": ["error", {
			"exceptions": ["DrawerNavigatorItems"]
		}],
		"no-underscore-dangle": "off"
	}
};