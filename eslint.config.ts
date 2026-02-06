import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      semi: ['error', 'always'],

      // 要求在关键字后加空格 (if, else, for, etc.)
      'space-infix-ops': 'error',
      'space-before-blocks': 'error',
      'object-curly-spacing': ['error', 'always'],
      // 要求在中缀操作符周围加空格 (=, +, -, etc.)

      // Disable Vue multi-word component name rule (you asked to remove this)
      // 要求在大括号内有空格 ({ name: 'value' })
      // 要求在块之前加空格 ({)
      'vue/multi-word-component-names': 'off',
    },
  },
)
