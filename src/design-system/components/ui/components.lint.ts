/**
 * Este arquivo define regras de linting ESLint personalizadas para detectar
 * implementações inconsistentes dos componentes de UI base (Loading, Error, Empty)
 * 
 * Para usar esse arquivo, adicione-o ao seu arquivo .eslintrc.js na seção de 'plugins'
 * e configure as regras de acordo com as necessidades do projeto.
 */

import { ESLintUtils } from '@typescript-eslint/utils';

// Criando um novo rule factory
export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/eslint-plugin-ui-components/docs/rules/${name}`
);

// Regra para detectar spinners personalizados em vez do componente Loading
export const detectCustomSpinner = createRule({
  name: 'no-custom-spinner',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefira usar o componente Loading em vez de implementar seu próprio spinner',
    },
    fixable: 'code',
    schema: [],
    messages: {
      customSpinnerDetected: 'Detectada implementação personalizada de spinner. Use o componente Loading do design system.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      // Detecta tags SVG com classes de animação que possam ser spinners
      JSXElement(node) {
        if (
          node.openingElement &&
          node.openingElement.name &&
          node.openingElement.name.type === 'JSXIdentifier' &&
          node.openingElement.name.name === 'svg'
        ) {
          const attributes = node.openingElement.attributes;
          for (const attr of attributes) {
            if (
              attr.type === 'JSXAttribute' &&
              attr.name.name === 'className' &&
              attr.value &&
              attr.value.type === 'Literal'
            ) {
              const className = attr.value.value as string;
              if (
                className.includes('spin') ||
                className.includes('rotate') ||
                className.includes('loading') ||
                className.includes('anim')
              ) {
                context.report({
                  node,
                  messageId: 'customSpinnerDetected',
                });
              }
            }
          }
        }
      },
    };
  },
});

// Regra para detectar mensagens de erro personalizadas em vez do componente Error
export const detectCustomErrorMessage = createRule({
  name: 'no-custom-error',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefira usar o componente Error em vez de implementar sua própria mensagem de erro',
    },
    fixable: 'code',
    schema: [],
    messages: {
      customErrorDetected: 'Detectada implementação personalizada de mensagem de erro. Use o componente Error do design system.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      // Detecta elementos com classes ou textos que indicam mensagem de erro
      JSXElement(node) {
        if (
          node.openingElement &&
          node.openingElement.name &&
          node.openingElement.name.type === 'JSXIdentifier'
        ) {
          // Verifica se há classes que indicam erro
          const attributes = node.openingElement.attributes;
          for (const attr of attributes) {
            if (
              attr.type === 'JSXAttribute' &&
              attr.name.name === 'className' &&
              attr.value &&
              attr.value.type === 'Literal'
            ) {
              const className = attr.value.value as string;
              if (
                className.includes('error') ||
                className.includes('text-red') ||
                className.includes('alert-danger') ||
                className.includes('text-error')
              ) {
                context.report({
                  node,
                  messageId: 'customErrorDetected',
                });
              }
            }
          }
        }
      },
      
      // Detecta renderização condicional baseada em erro
      ConditionalExpression(node) {
        // Verifica se a condição contém 'error' e retorna um JSX
        if (
          node.test.type === 'Identifier' && 
          node.test.name.includes('error') &&
          node.consequent.type === 'JSXElement'
        ) {
          context.report({
            node,
            messageId: 'customErrorDetected',
          });
        }
      },
    };
  },
});

// Regra para detectar estados vazios personalizados em vez do componente Empty
export const detectCustomEmptyState = createRule({
  name: 'no-custom-empty-state',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefira usar o componente Empty em vez de implementar seu próprio estado vazio',
    },
    fixable: 'code',
    schema: [],
    messages: {
      customEmptyStateDetected: 'Detectada implementação personalizada de estado vazio. Use o componente Empty do design system.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      // Detecta renderização condicional para estados vazios
      ConditionalExpression(node) {
        if (
          // Verifica condições comuns de array/lista vazia
          (
            node.test.type === 'LogicalExpression' ||
            node.test.type === 'BinaryExpression' ||
            node.test.type === 'UnaryExpression'
          ) &&
          node.consequent.type === 'JSXElement'
        ) {
          const condition = context.getSourceCode().getText(node.test);
          if (
            condition.includes('.length === 0') ||
            condition.includes('.length == 0') ||
            condition.includes('!data') ||
            condition.includes('data.length === 0') ||
            condition.includes('isEmpty') ||
            condition.includes('noResults') ||
            condition.includes('!items') ||
            condition.includes('items.length === 0')
          ) {
            context.report({
              node,
              messageId: 'customEmptyStateDetected',
            });
          }
        }
      },
    };
  },
});

// Exportando todas as regras
export default {
  rules: {
    'no-custom-spinner': detectCustomSpinner,
    'no-custom-error': detectCustomErrorMessage,
    'no-custom-empty-state': detectCustomEmptyState,
  },
}; 