import { AST_NODE_TYPES } from "@typescript-eslint/utils"

export default {
  meta: {
    type: `suggestion`,
    docs: {
      description: `Disallows unnecessary \`await\` on non-Promise values.`,
      recommended: true,
      url: `https://eslint.org/docs/latest/extend/custom-rules#rule-basics`
    },
    schema: []
  },
  create(context) {
    return {
      // Handles the case with `withDefaults(defineProps<Props>(), { ... })`
      'CallExpression[callee.name="withDefaults"]'(node) {
        const withDefaultsArgs = node.arguments
        if (withDefaultsArgs.length !== 2) return

        const definePropsCall = withDefaultsArgs[0]
        const defaultsObject = withDefaultsArgs[1]

        // Ensure the first argument is a defineProps call and the second is a default object
        if (
          definePropsCall.type === AST_NODE_TYPES.CallExpression &&
          definePropsCall.callee.name === `defineProps` &&
          defaultsObject.type === AST_NODE_TYPES.ObjectExpression
        ) {
          context.report({
            node,
            message: `Use destructuring to define default prop values instead of \`withDefaults\`.`
          })
        }
      },

      // Handles the case with `const props = defineProps<Props>()` and `interface`
      VariableDeclarator(node) {
        if (
          node.init?.type !== AST_NODE_TYPES.CallExpression ||
          node.init.callee?.name !== `defineProps`
        ) {
          return
        }

        const definePropsCall = node.init
        const callArgument = definePropsCall.arguments[0]
        const hasDestructuring = node.id.type === AST_NODE_TYPES.ObjectPattern

        // Check if props are defined with a runtime object or a separate interface
        const isRuntimeObject =
          callArgument?.type === AST_NODE_TYPES.ObjectExpression
        const isExternalInterface =
          callArgument?.type === AST_NODE_TYPES.TSTypeReference

        if (isRuntimeObject) {
          // Case 1: defineProps({...}) with runtime object
          context.report({
            node: definePropsCall,
            message: `Use type-based prop declaration with \`defineProps<{...}>()\`.`
          })
        } else if (isExternalInterface && !hasDestructuring) {
          // Case 2: `defineProps<BlockProps>()` without destructuring and with defaults in separate object
          const scope = context.getScope()
          const variableName = node.id.name
          const references = scope.set.get(variableName)?.references
          const defaultsCall = references?.find((ref) => {
            const parent = ref.identifier.parent
            return (
              parent.type === AST_NODE_TYPES.CallExpression &&
              parent.callee.name === `withDefaults`
            )
          })

          // If the props variable is not used in a withDefaults call, do nothing for now
          if (!defaultsCall) return

          const defaultsObject = defaultsCall.identifier.parent.arguments[1]
          if (
            !defaultsObject ||
            defaultsObject.type !== AST_NODE_TYPES.ObjectExpression
          )
            return

          context.report({
            node,
            message: `Use destructuring to define default prop values instead of a separate \`withDefaults\` call.`
          })
        }
      }
    }
  }
}
