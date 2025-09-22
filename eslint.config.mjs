import withNuxt from './.nuxt/eslint.config.mjs'
import noRuntimePropsDeclaration from './utils/eslint-rules/no-runtime-props-declaration.ts'

export default withNuxt({
  ignores: [
    `**/drizzle/*`
  ],
  plugins: {
    rimelight: {
      rules: {
        'no-runtime-props-declaration': noRuntimePropsDeclaration
      }
    }
  },
  rules: {
    'rimelight/no-runtime-props-declaration': `error`,
    'no-process-env': `error`,
    'no-empty-pattern': `off`,
    '@stylistic/array-bracket-newline': [
      `error`,
      `always`
    ],
    '@stylistic/array-bracket-spacing': [
      `error`,
      `always`
    ],
    '@stylistic/array-element-newline': [
      `error`,
      `always`
    ],
    '@stylistic/arrow-parens': [
      `error`,
      `always`
    ],
    '@stylistic/arrow-spacing': [
      `error`,
      {
        before: true,
        after: true
      }
    ],
    '@stylistic/block-spacing': [
      `error`,
      `always`
    ],
    '@stylistic/brace-style': [
      `error`,
      `1tbs`
    ],
    '@stylistic/comma-dangle': [
      `error`,
      `never`
    ],
    '@stylistic/comma-spacing': `error`,
    '@stylistic/comma-style': [
      `error`,
      `last`
    ],
    '@stylistic/computed-property-spacing': [
      `error`,
      `never`
    ],
    '@stylistic/curly-newline': [
      `error`,
      `always`
    ],
    '@stylistic/dot-location': [
      `error`,
      `object`
    ],
    '@stylistic/eol-last': [
      `error`,
      `always`
    ],
    '@stylistic/function-call-argument-newline': [
      `error`,
      `never`
    ],
    '@stylistic/function-call-spacing': [
      `error`,
      `never`
    ],
    '@stylistic/function-paren-newline': [
      `error`,
      `never`
    ],
    '@stylistic/generator-star-spacing': `error`,
    '@stylistic/implicit-arrow-linebreak': [
      `error`,
      `beside`
    ],
    '@stylistic/indent': [
      `error`,
      2
    ],
    '@stylistic/indent-binary-ops': [
      `error`,
      2
    ],
    '@stylistic/key-spacing': [
      `error`,
      {
        beforeColon: false,
        afterColon: true,
        mode: `strict`
        // align:       `value`
      }
    ],
    '@stylistic/keyword-spacing': [
      `error`,
      {
        before: true,
        after: true,
        overrides: {

        }
      }
    ],
    '@stylistic/line-comment-position': [
      `error`,
      `above`
    ],
    '@stylistic/linebreak-style': [
      `error`,
      `unix`
    ],
    '@stylistic/lines-around-comment': [
      `error`,
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowClassStart: true,
        allowClassEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true
      }
    ],
    '@stylistic/lines-between-class-members': [
      `error`,
      `always`
    ],

    /*
     * '@stylistic/max-len': [
     *   `error`,
     *   80
     * ],
     */
    '@stylistic/max-statements-per-line': [
      `error`,
      {
        max: 1
      }
    ],
    '@stylistic/member-delimiter-style': [
      `error`,
      {
        multiline: {
          delimiter: `none`,
          requireLast: false
        },
        singleline: {
          delimiter: `comma`,
          requireLast: false
        }
      }
    ],
    '@stylistic/multiline-comment-style': [
      `error`,
      `starred-block`
    ],
    '@stylistic/multiline-ternary': [
      `error`,
      `never`
    ],
    '@stylistic/new-parens': `error`,
    '@stylistic/newline-per-chained-call': `error`,
    '@stylistic/no-confusing-arrow': [
      `error`,
      {
        allowParens: true
      }
    ],
    '@stylistic/no-extra-parens': [
      `error`,
      `all`,
      {
        nestedBinaryExpressions: false
      }
    ],
    '@stylistic/no-extra-semi': `error`,
    '@stylistic/no-floating-decimal': `error`,
    '@stylistic/no-mixed-operators': `error`,
    '@stylistic/no-mixed-spaces-and-tabs': `error`,
    '@stylistic/no-multi-spaces': `error`,
    '@stylistic/no-multiple-empty-lines': `error`,
    '@stylistic/no-tabs': `error`,
    '@stylistic/no-trailing-spaces': `error`,
    '@stylistic/no-whitespace-before-property': `error`,
    '@stylistic/nonblock-statement-body-position': [
      `error`,
      `below`
    ],
    '@stylistic/object-curly-newline': [
      `error`,
      {
        multiline: true,
        consistent: true
      }
    ],
    '@stylistic/object-curly-spacing': [
      `error`,
      `always`
    ],
    '@stylistic/object-property-newline': `error`,
    '@stylistic/one-var-declaration-per-line': [
      `error`,
      `always`
    ],
    '@stylistic/operator-linebreak': [
      `error`,
      `none`
    ],
    '@stylistic/padded-blocks': [
      `error`,
      `never`
    ],
    '@stylistic/padding-line-between-statements': `error`,
    '@stylistic/quote-props': [
      `error`,
      `consistent-as-needed`
    ],
    '@stylistic/quotes': [
      `error`,
      `backtick`
    ],
    '@stylistic/rest-spread-spacing': [
      `error`,
      `never`
    ],
    '@stylistic/semi': [
      `error`,
      `never`
    ],
    '@stylistic/semi-spacing': `off`,
    '@stylistic/semi-style': `off`,
    '@stylistic/space-before-blocks': [
      `error`,
      `always`
    ],
    '@stylistic/space-before-function-paren': [
      `error`,
      `never`
    ],
    '@stylistic/space-in-parens': [
      `error`,
      `never`
    ],
    '@stylistic/space-infix-ops': `error`,
    '@stylistic/space-unary-ops': `error`,
    '@stylistic/spaced-comment': [
      `error`,
      `always`
    ],
    '@stylistic/switch-colon-spacing': `error`,
    '@stylistic/template-curly-spacing': [
      `error`,
      `always`
    ],
    '@stylistic/template-tag-spacing': [
      `error`,
      `always`
    ],
    '@stylistic/type-annotation-spacing': `error`,
    '@stylistic/type-generic-spacing': `error`,
    '@stylistic/type-named-tuple-spacing': `error`,
    '@stylistic/wrap-iife': [
      `error`,
      `inside`
    ],
    '@stylistic/wrap-regex': `error`,
    '@stylistic/yield-star-spacing': `error`
  }
}).prepend().
  override(`nuxt/typescript/rules`, {
    rules: {
      '@typescript-eslint/no-empty-object-type': `off`
    }
  }).
  override(`nuxt/vue/rules`, {
    rules: {
      'vue/multi-word-component-names': `off`,
      'vue/max-attributes-per-line': [
        `error`,
        {
          singleline: {
            max: 3
          },
          multiline: {
            max: 1
          }
        }
      ]
    }
  })
