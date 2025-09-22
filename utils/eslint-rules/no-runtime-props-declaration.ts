import {
  AST_NODE_TYPES
} from '@typescript-eslint/utils'

export default {
  meta: {
    type: `suggestion`,
    docs: {
      description: `Disallows unnecessary \`await\` on non-Promise values.`,
      recommended: true,
      url: `https://eslint.org/docs/latest/extend/custom-rules#rule-basics`
    },
    fixable: `code`,
    schema: [
    ]
  },
  create(context) {
    const sourceCode = context.getSourceCode()

    // Helper function to find a variable declaration for a given identifier
    function findVariableDeclaration(scope, name) {
      const variable = scope.set.get(name)
      if (variable && variable.defs.length > 0) {
        return variable.defs[0].node
      }
      return null
    }

    return {
      // Handles the case with `withDefaults(defineProps<Props>(), { ... })`
      'CallExpression[callee.name="withDefaults"]'(node) {
        const withDefaultsArgs = node.arguments
        if (withDefaultsArgs.length !== 2)
          return

        const definePropsCall = withDefaultsArgs[0]
        const defaultsObject = withDefaultsArgs[1]

        // Ensure the first argument is a defineProps call and the second is a default object
        if (
          definePropsCall.type === AST_NODE_TYPES.CallExpression && definePropsCall.callee.name === `defineProps` && defaultsObject.type === AST_NODE_TYPES.ObjectExpression
        ) {
          context.report({
            node,
            message: `Use destructuring to define default prop values instead of \`withDefaults\`.`,
            fix(fixer) {
              const propsDestructuring = sourceCode.getText(definePropsCall)
              const defaultsText = sourceCode.getText(defaultsObject)

              // Get the properties from the `withDefaults` object
              const defaults = {
              }
              defaultsObject.properties.forEach((prop) => {
                if (prop.type === AST_NODE_TYPES.Property) {
                  defaults[sourceCode.getText(prop.key)] = sourceCode.getText(prop.value)
                }
              })

              // Construct the new code with defaults in the destructuring
              const destructuredProps = `{ ${ Object.keys(defaults).map((key) => `${ key } = ${ defaults[key] }`).
                join(`,\n`) } }`
              const newCode = `const ${ destructuredProps } = ${ propsDestructuring };`

              return fixer.replaceText(node, newCode)
            }
          })
        }
      },

      // Handles the case with `const props = defineProps<Props>()` and `interface`
      'VariableDeclarator'(node) {
        if (node.init?.type !== AST_NODE_TYPES.CallExpression || node.init.callee?.name !== `defineProps`) {
          return
        }

        const definePropsCall = node.init
        const callArgument = definePropsCall.arguments[0]
        const hasDestructuring = node.id.type === AST_NODE_TYPES.ObjectPattern

        // Check if props are defined with a runtime object or a separate interface
        const isRuntimeObject = callArgument?.type === AST_NODE_TYPES.ObjectExpression
        const isExternalInterface = callArgument?.type === AST_NODE_TYPES.TSTypeReference

        if (isRuntimeObject) {
          // Case 1: defineProps({...}) with runtime object
          context.report({
            node: definePropsCall,
            message: `Use type-based prop declaration with \`defineProps<{...}>()\`.`,
            * fix(fixer) {
              const props = sourceCode.getText(callArgument)
              return fixer.replaceText(definePropsCall, `defineProps<${ props }>()`)
            }
          })
        } else if (isExternalInterface && !hasDestructuring) {
          // Case 2: `defineProps<BlockProps>()` without destructuring and with defaults in separate object
          const scope = context.getScope()
          const variableName = node.id.name
          const references = scope.set.get(variableName)?.references
          const defaultsCall = references?.find((ref) => {
            const parent = ref.identifier.parent
            return parent.type === AST_NODE_TYPES.CallExpression && parent.callee.name === `withDefaults`
          })

          // If the props variable is not used in a withDefaults call, do nothing for now
          if (!defaultsCall)
            return

          const defaultsObject = defaultsCall.identifier.parent.arguments[1]
          if (!defaultsObject || defaultsObject.type !== AST_NODE_TYPES.ObjectExpression)
            return

          context.report({
            node,
            message: `Use destructuring to define default prop values instead of a separate \`withDefaults\` call.`,
            * fix(fixer) {
              const typeText = sourceCode.getText(callArgument)
              const defaults = {
              }
              defaultsObject.properties.forEach((prop) => {
                if (prop.type === AST_NODE_TYPES.Property) {
                  defaults[sourceCode.getText(prop.key)] = sourceCode.getText(prop.value)
                }
              })

              // Build the new destructuring syntax
              const destructuredProps = Object.keys(defaults).map((key) => {
                const value = defaults[key]
                return `${ key } = ${ value }`
              }).
                join(`,\n  `)

              // Delete the original defineProps and the withDefaults call
              const start = node.range[0]
              const end = defaultsCall.identifier.parent.range[1]
              const newText = `const { ${ destructuredProps } } = defineProps<${ typeText }>()`
              return fixer.replaceTextRange([
                start,
                end
              ], newText)
            }
          })
        }
      }
    }
  }
}
