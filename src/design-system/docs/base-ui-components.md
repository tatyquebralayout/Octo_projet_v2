# Guia de Implementação de Componentes Base de UI

Este guia demonstra como utilizar os componentes base de UI para estados comuns da interface (Loading, Error, Empty) de forma consistente em toda a aplicação.

## Contexto

Os componentes base de UI foram criados para padronizar a exibição de estados comuns em nossa aplicação, como:

- Estados de carregamento (Loading)
- Estados de erro (Error)
- Estados vazios (Empty) 

Estes componentes devem ser usados em vez de implementações personalizadas para garantir consistência visual, melhorar a acessibilidade e simplificar a manutenção do código.

## Componente Loading

O componente `Loading` exibe indicadores de carregamento com diferentes variantes e tamanhos.

### Importação

```tsx
import { Loading } from '../design-system/components/ui';
```

### Exemplos de Uso

#### Loading em tela cheia (para páginas inteiras)

```tsx
// Carregamento inicial de uma página
if (isLoading && !data) {
  return <Loading fullPage accessibilityLabel="Carregando conteúdo..." />;
}
```

#### Loading dentro de um componente

```tsx
// Carregamento dentro de um card ou seção
<div className="card">
  <h2>Meus Dados</h2>
  {isLoading ? (
    <Loading size="md" variant="spinner" />
  ) : (
    // conteúdo carregado
  )}
</div>
```

#### Loading em botões

```tsx
<button 
  disabled={isSubmitting}
  className="btn btn-primary"
>
  {isSubmitting ? (
    <span className="flex items-center">
      <Loading size="sm" variant="spinner" className="mr-2" />
      Enviando...
    </span>
  ) : 'Enviar'}
</button>
```

#### Propriedades Importantes

- `variant`: `'spinner'` (padrão), `'dots'`, `'pulse'`, `'skeleton'`
- `size`: `'sm'`, `'md'` (padrão), `'lg'`
- `fullPage`: Boolean para exibição em tela cheia
- `overlay`: Boolean para adicionar um overlay semitransparente (quando fullPage é true)
- `accessibilityLabel`: Texto para leitores de tela

## Componente Error

O componente `Error` exibe mensagens de erro com opções de recuperação.

### Importação

```tsx
import { Error } from '../design-system/components/ui';
```

### Exemplos de Uso

#### Erro de página inteira

```tsx
// Quando falha o carregamento principal de uma página
if (error) {
  return (
    <Error
      title="Erro ao carregar dados"
      message="Não foi possível carregar os dados. Por favor, tente novamente mais tarde."
      variant="card"
      size="lg"
      onRetry={handleRetry}
    />
  );
}
```

#### Erro em componente

```tsx
// Erro dentro de um card ou seção
<div className="card">
  <h2>Minhas Notificações</h2>
  {error ? (
    <Error 
      message="Não foi possível carregar as notificações"
      size="sm"
      onRetry={loadNotifications}
    />
  ) : (
    // conteúdo carregado
  )}
</div>
```

#### Erro inline (para formulários)

```tsx
<div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    className={`form-control ${errors.email ? 'border-red-500' : ''}`}
    value={email}
    onChange={handleEmailChange}
  />
  {errors.email && (
    <Error
      message={errors.email}
      variant="inline"
      size="sm"
    />
  )}
</div>
```

#### Propriedades Importantes

- `title`: Título do erro (opcional)
- `message`: Mensagem de erro (obrigatória)
- `variant`: `'basic'` (padrão), `'card'`, `'inline'`, `'banner'`
- `size`: `'sm'`, `'md'` (padrão), `'lg'`
- `onRetry`: Função callback para tentar novamente (opcional)
- `retryText`: Texto do botão de retry (padrão: "Tentar novamente")

## Componente Empty

O componente `Empty` padroniza a exibição de estados vazios ou sem resultados.

### Importação

```tsx
import { Empty } from '../design-system/components/ui';
```

### Exemplos de Uso

#### Estado vazio básico

```tsx
// Lista vazia de itens
if (items.length === 0) {
  return (
    <Empty 
      title="Nenhum item encontrado"
      message="Não há itens para exibir no momento."
    />
  );
}
```

#### Estado vazio com ação

```tsx
// Pesquisa sem resultados
if (searchResults.length === 0) {
  return (
    <Empty
      title="Nenhum resultado encontrado"
      message="Tente usar termos diferentes ou remover filtros."
      action={
        <button 
          className="btn btn-primary mt-4"
          onClick={clearFilters}
        >
          Limpar filtros
        </button>
      }
    />
  );
}
```

#### Estado vazio em seção

```tsx
// Favoritos vazios
<div className="card">
  <h2>Meus Favoritos</h2>
  {favorites.length === 0 ? (
    <Empty
      title="Sua lista está vazia"
      message="Adicione itens aos favoritos para vê-los aqui."
      illustration="favorites"
      size="sm"
    />
  ) : (
    // Lista de favoritos
  )}
</div>
```

#### Propriedades Importantes

- `title`: Título do estado vazio (opcional)
- `message`: Mensagem explicativa (obrigatória)
- `action`: Elemento React para ação (botão, link, etc.) (opcional)
- `illustration`: Tipo de ilustração (`'search'` (padrão), `'data'`, `'favorites'`, `'notifications'`)
- `size`: `'sm'`, `'md'` (padrão), `'lg'`

## Padrões de Implementação

### Padrão para Carregamento de Dados

```tsx
const MyComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Renderização condicional dos estados
  if (isLoading && !data) {
    return <Loading fullPage accessibilityLabel="Carregando dados..." />;
  }

  if (error && !data) {
    return (
      <Error
        title="Erro ao carregar dados"
        message={error.message || "Ocorreu um erro inesperado"}
        onRetry={loadData}
        variant="card"
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <Empty
        title="Nenhum dado encontrado"
        message="Não há dados disponíveis para exibir."
      />
    );
  }

  return (
    <div>
      {/* Conteúdo principal */}
    </div>
  );
};
```

### Padrão para Renderização Condicional em Seções

Para componentes que podem exibir diferentes estados em uma seção da página, use um padrão de renderização condicional.

```tsx
const MySection = () => {
  // ...estados e lógica

  // Renderização condicional usando função auxiliar
  const renderContent = () => {
    if (isLoading) {
      return <Loading size="md" accessibilityLabel="Carregando itens..." />;
    }

    if (error) {
      return (
        <Error
          message="Erro ao carregar itens"
          size="sm"
          onRetry={loadItems}
        />
      );
    }

    if (!items || items.length === 0) {
      return (
        <Empty
          title="Nenhum item"
          message="Não há itens para exibir."
          size="sm"
        />
      );
    }

    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="section">
      <h2>Meus Itens</h2>
      {renderContent()}
    </div>
  );
};
```

## Melhores Práticas

1. **Sempre use os componentes base** em vez de criar implementações personalizadas
2. **Mantenha consistência** nos tamanhos e variantes usados para situações semelhantes
3. **Forneça textos descritivos** para melhorar a acessibilidade
4. **Ofereça ações de recuperação** para estados de erro quando possível
5. **Use fallbacks apropriados** para conteúdo parcialmente carregado

## Verificação de Regras

Este projeto inclui regras de linting personalizadas para incentivar o uso apropriado dos componentes base:

1. Evitar SVGs personalizados para spinners de carregamento
2. Evitar classes CSS personalizadas para mensagens de erro
3. Evitar DIVs vazias para estados de "sem resultados"

Use o comando `npm run lint` para verificar se seu código segue estas diretrizes.

---

Para dúvidas ou sugestões sobre este guia, entre em contato com a equipe de design system. 