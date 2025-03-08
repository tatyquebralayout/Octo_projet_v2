# Guia de Integração dos Componentes Base de UI

Este guia explica como integrar e usar os componentes base de UI (`Loading`, `Error`, `Empty`) em seus projetos, bem como as ferramentas de validação para garantir a consistência.

## Índice

1. [Instalação e Configuração](#instalação-e-configuração)
2. [Configuração das Regras de Linting](#configuração-das-regras-de-linting)
3. [Fluxo de Migração](#fluxo-de-migração)
4. [Padrões de Implementação](#padrões-de-implementação)
5. [Validação Automatizada](#validação-automatizada)
6. [Resolução de Problemas](#resolução-de-problemas)

## Instalação e Configuração

Os componentes base de UI já estão disponíveis no design system. Para utilizá-los, importe-os diretamente:

```tsx
import { Loading, Error, Empty } from 'src/design-system/components/ui';
```

## Configuração das Regras de Linting

Para garantir a consistência no uso dos componentes, configure as regras de linting:

1. Instale as dependências necessárias:

```bash
npm install --save-dev @typescript-eslint/utils
```

2. Adicione o plugin ao seu arquivo `.eslintrc.js`:

```js
module.exports = {
  // ... outras configurações
  plugins: [
    // ... outros plugins
    'ui-components'
  ],
  rules: {
    // ... outras regras
    'ui-components/no-custom-spinner': 'warn',
    'ui-components/no-custom-error': 'warn',
    'ui-components/no-custom-empty-state': 'warn'
  }
};
```

3. Configure o plugin na pasta `eslint-plugins`:

```bash
mkdir -p .eslint-plugins/ui-components
cp src/design-system/components/ui/components.lint.ts .eslint-plugins/ui-components/index.js
```

## Fluxo de Migração

Para migrar componentes existentes para usar os componentes base de UI:

### 1. Identificação

Use as regras de linting para identificar implementações inconsistentes:

```bash
npx eslint --ext .tsx,.ts src/ --rule 'ui-components/no-custom-spinner: warn'
```

### 2. Substituição

#### De Spinners Personalizados para `Loading`

Antes:
```tsx
{isLoading && (
  <div className="flex justify-center">
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      {/* SVG path */}
    </svg>
    <span>Carregando...</span>
  </div>
)}
```

Depois:
```tsx
{isLoading && <Loading size="md" label="Carregando..." />}
```

#### De Mensagens de Erro Personalizadas para `Error`

Antes:
```tsx
{error && (
  <div className="text-red-600 p-4 border border-red-200 rounded">
    <p className="font-bold">Erro!</p>
    <p>{error.message}</p>
    <button onClick={retry}>Tentar novamente</button>
  </div>
)}
```

Depois:
```tsx
{error && (
  <Error
    title="Erro!"
    message={error.message}
    onRetry={retry}
    variant="card"
  />
)}
```

#### De Estados Vazios Personalizados para `Empty`

Antes:
```tsx
{items.length === 0 && (
  <div className="text-center p-8">
    <p className="text-gray-500">Nenhum item encontrado</p>
    <button className="btn mt-4">Adicionar item</button>
  </div>
)}
```

Depois:
```tsx
{items.length === 0 && (
  <Empty
    message="Nenhum item encontrado"
    action={<button className="btn">Adicionar item</button>}
  />
)}
```

### 3. Verificação

Depois de realizar as substituições, execute novamente a validação para garantir que todos os casos foram resolvidos:

```bash
npx eslint --ext .tsx,.ts src/
```

## Padrões de Implementação

### Loading

Para estados de carregamento:

```tsx
// Em componentes regulares
if (isLoading) {
  return <Loading size="lg" />;
}

// Em botões
<button disabled={isLoading}>
  {isLoading ? (
    <span className="flex items-center">
      <Loading size="sm" variant="spinner" className="mr-2" color="currentColor" />
      Processando...
    </span>
  ) : 'Enviar'}
</button>

// Para página inteira
<Loading fullPage overlay label="Carregando aplicação..." />
```

### Error

Para estados de erro:

```tsx
// Erro padrão
if (error) {
  return (
    <Error
      title="Erro ao carregar dados"
      message={error.message}
      onRetry={fetchData}
    />
  );
}

// Erro inline para formulários
{touched.email && errors.email && (
  <Error
    message={errors.email}
    variant="inline"
    size="sm"
  />
)}

// Erro em banner para notificações importantes
<Error
  title="Sua sessão está expirando"
  message="Clique em continuar para permanecer conectado."
  variant="banner"
  retryText="Continuar"
  onRetry={renewSession}
/>
```

### Empty

Para estados vazios:

```tsx
// Estado vazio básico
if (data.length === 0) {
  return (
    <Empty
      message="Nenhum resultado encontrado"
    />
  );
}

// Estado vazio com ações
if (!items || items.length === 0) {
  return (
    <Empty
      title="Carrinho vazio"
      message="Adicione produtos ao seu carrinho para continuar."
      action={<button className="btn-primary">Explorar produtos</button>}
      secondaryAction={<button className="btn-outline">Ver ofertas</button>}
    />
  );
}

// Estado vazio para página inteira
<Empty
  title="Página em construção"
  message="Esta funcionalidade ainda está sendo desenvolvida."
  variant="page"
  action={<button className="btn-primary">Voltar para o início</button>}
/>
```

## Validação Automatizada

Além das regras de linting, adicione verificações ao fluxo de CI/CD:

```yaml
# .github/workflows/validate-ui.yml
name: Validate UI Components

on:
  pull_request:
    branches: [ main, develop ]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - name: Validate UI Components
        run: npx eslint --ext .tsx,.ts src/ --rule 'ui-components/no-custom-spinner: error' --rule 'ui-components/no-custom-error: error' --rule 'ui-components/no-custom-empty-state: error'
```

## Resolução de Problemas

### Falsos Positivos

Se uma regra de linting estiver gerando falsos positivos, você pode:

1. Desativar a regra para uma linha específica:

```tsx
// eslint-disable-next-line ui-components/no-custom-spinner
<div className="custom-spinner"></div>
```

2. Ajustar a regra para ignorar casos específicos:

```js
// .eslintrc.js
rules: {
  'ui-components/no-custom-spinner': ['warn', {
    ignore: ['CustomSpinnerComponent']
  }]
}
```

### Componentes com Necessidades Especiais

Se um componente tem necessidades que não são atendidas pelos componentes base, considere:

1. Estender o componente base:

```tsx
function CustomLoading(props) {
  return (
    <div className="special-wrapper">
      <Loading {...props} />
      <div className="special-content">
        {/* Conteúdo extra */}
      </div>
    </div>
  );
}
```

2. Propor melhorias aos componentes base para atender às necessidades adicionais.

---

Para qualquer dúvida ou problema na implementação, entre em contato com a equipe de Design System. 