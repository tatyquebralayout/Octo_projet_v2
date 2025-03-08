# Configuração ESLint Consolidada

Este documento explica o sistema de configuração ESLint consolidado para o projeto OCTO.

## Estrutura dos arquivos

```
.
├── .eslintrc.js                   # Configuração principal do ESLint
├── .eslint-plugins/               # Diretório de plugins personalizados
│   └── ui-components/             # Plugin para componentes UI
│       └── index.js               # Implementação do plugin
└── src/
    ├── design-system/
    │   └── components/
    │       └── ui/
    │           └── components.lint.ts  # Regras de lint para componentes base
    └── ...
```

## Arquivos Principais

### `.eslintrc.js`

Este é o arquivo principal de configuração do ESLint para o projeto. Ele:

- Define as regras básicas para TypeScript e React
- Incorpora regras de acessibilidade (jsx-a11y)
- Configura comportamentos específicos para diferentes tipos de arquivos
- Inclui o plugin personalizado para componentes UI
- Define quais arquivos devem ser ignorados

### `.eslint-plugins/ui-components/index.js`

Este é um plugin personalizado que implementa regras específicas para garantir o uso correto dos componentes base do design system:

- `no-custom-spinner`: Detecta spinners personalizados, incentivando o uso do componente `Loading`
- `no-custom-error`: Detecta mensagens de erro personalizadas, incentivando o uso do componente `Error`
- `no-custom-empty-state`: Detecta estados vazios personalizados, incentivando o uso do componente `Empty`
- `prefer-empty-component`: Detecta mensagens como "Nenhum resultado encontrado" que deveriam usar o componente `Empty`

## Uso

### Executando o Linter

Para verificar seu código com o ESLint, execute:

```bash
# Verificar todos os arquivos
npm run lint

# Verificar um arquivo específico
npx eslint src/components/MeuComponente.tsx

# Verificar e tentar corrigir automaticamente
npx eslint --fix src/
```

### Desabilitando Regras

Se você precisar desabilitar uma regra para uma linha específica:

```tsx
// eslint-disable-next-line ui-components/no-custom-spinner
<div className="spinner">Carregando...</div>
```

Para desabilitar uma regra para um arquivo inteiro, adicione no topo do arquivo:

```tsx
/* eslint-disable ui-components/no-custom-spinner */
```

## Regras Personalizadas

As regras personalizadas são configuradas como "warn" por padrão, o que significa que elas exibirão avisos mas não causarão falhas na build. Isso permite uma migração gradual para os componentes base do design system.

Você pode ajustar a severidade das regras no arquivo `.eslintrc.js`:

```js
// Exemplo para tornar a regra mais restritiva
'ui-components/no-custom-spinner': 'error'
```

## Plugins Disponíveis

O projeto utiliza os seguintes plugins:

- `@typescript-eslint`: Regras específicas para TypeScript
- `react`: Regras para React
- `react-hooks`: Regras específicas para React Hooks
- `react-refresh`: Suporte para React Refresh
- `jsx-a11y`: Regras de acessibilidade para JSX
- `ui-components`: Nosso plugin personalizado para componentes base

## Migração do `eslint.config.js`

Anteriormente, o projeto usava o formato `eslint.config.js`, que é o novo formato de configuração do ESLint. No entanto, para melhor compatibilidade com plugins personalizados e ferramentas de desenvolvimento, migramos para o formato `.eslintrc.js`.

Esta mudança permite:

1. Melhor integração com IDEs e editores de código
2. Suporte a plugins personalizados para regras específicas
3. Configurações mais modulares e reutilizáveis
4. Compatibilidade com bibliotecas mais antigas

## Modificando a Configuração

Se você precisar modificar a configuração do ESLint:

1. Edite o arquivo `.eslintrc.js` para alterar regras globais
2. Para criar novas regras personalizadas:
   - Adicione a lógica da regra em `src/design-system/components/ui/components.lint.ts`
   - Registre a regra no plugin `.eslint-plugins/ui-components/index.js`
   - Configure a severidade da regra em `.eslintrc.js` 