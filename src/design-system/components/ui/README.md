# Componentes Base de UI

Este módulo contém componentes reutilizáveis para estados comuns de UI que padronizam a experiência do usuário em toda a aplicação.

## Componentes Disponíveis

### Loading

O componente `Loading` é usado para indicar estados de carregamento em diferentes contextos.

#### Variantes

- **spinner**: Um indicador circular de carregamento (padrão)
- **dots**: Três pontos pulsantes
- **pulse**: Um círculo pulsante

#### Tamanhos

- **sm**: Pequeno
- **md**: Médio (padrão)
- **lg**: Grande

#### Exemplos de Uso

```tsx
// Básico
<Loading />

// Com variante e tamanho
<Loading variant="dots" size="lg" />

// Em tela cheia com overlay
<Loading fullPage overlay />

// Com texto de feedback
<Loading label="Carregando dados..." />

// Em botões (inline)
<button disabled={isLoading}>
  {isLoading ? (
    <span className="flex items-center">
      <Loading size="sm" variant="spinner" className="mr-2" />
      Processando...
    </span>
  ) : 'Enviar'}
</button>
```

### Error

O componente `Error` é usado para exibir mensagens de erro com opções de recuperação.

#### Variantes

- **basic**: Mensagem de erro simples (padrão)
- **card**: Estilo de cartão com borda e sombra
- **inline**: Versão compacta para exibição em linha
- **banner**: Exibição em banner com borda lateral

#### Tamanhos

- **sm**: Pequeno
- **md**: Médio (padrão)
- **lg**: Grande

#### Exemplos de Uso

```tsx
// Básico
<Error message="Não foi possível carregar os dados" />

// Com título personalizado
<Error
  title="Erro de conexão"
  message="Verifique sua conexão e tente novamente"
/>

// Com opção de retry
<Error
  message="Falha ao carregar recursos"
  onRetry={() => fetchData()}
  retryText="Tentar novamente"
/>

// Inline para formulários
<Error
  variant="inline"
  message="Email inválido"
/>
```

### Empty

O componente `Empty` é usado para estados onde não há dados para exibir.

#### Variantes

- **basic**: Estilo básico para estados vazios (padrão)
- **card**: Estilo de cartão com borda e sombra
- **page**: Versão para páginas inteiras sem conteúdo

#### Tamanhos

- **sm**: Pequeno
- **md**: Médio (padrão)
- **lg**: Grande

#### Exemplos de Uso

```tsx
// Básico
<Empty message="Nenhum resultado encontrado" />

// Com título e ações
<Empty
  title="Sua lista de favoritos está vazia"
  message="Adicione itens aos seus favoritos para vê-los aqui"
  action={<button className="btn btn-primary">Explorar catálogo</button>}
/>

// Com ação secundária
<Empty
  title="Nenhum filtro corresponde à sua busca"
  message="Tente ajustar seus filtros ou buscar por outros termos"
  action={<button className="btn btn-primary">Limpar filtros</button>}
  secondaryAction={<button className="btn btn-outline">Ver todos</button>}
/>
```

## Padrões de Uso

### Em Componentes com Carregamento de Dados

```tsx
function DataComponent() {
  const { data, isLoading, error } = useDataFetching();

  if (isLoading) {
    return <Loading size="lg" />;
  }

  if (error) {
    return (
      <Error
        title="Erro ao carregar dados"
        message={error.message}
        onRetry={() => refetch()}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <Empty
        title="Nenhum dado encontrado"
        message="Não há dados disponíveis para exibição"
      />
    );
  }

  return (
    <div>
      {/* Renderizar dados */}
    </div>
  );
}
```

### Em Formulários

```tsx
function FormComponent() {
  const { values, errors, isSubmitting, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      
      {errors.form && (
        <Error
          variant="inline"
          message={errors.form}
        />
      )}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center">
            <Loading size="sm" variant="spinner" className="mr-2" />
            Enviando...
          </span>
        ) : 'Enviar'}
      </button>
    </form>
  );
}
```

## Boas Práticas

1. **Consistência**: Use os mesmos componentes para estados semelhantes em toda a aplicação.
2. **Acessibilidade**: Os componentes incluem atributos ARIA apropriados para acessibilidade.
3. **Responsividade**: Ajuste o tamanho conforme o contexto de uso.
4. **Mensagens Claras**: Forneça mensagens descritivas e ações relevantes para os usuários.
5. **Feedback Imediato**: Use o Loading em operações que possam demorar mais de 300ms.

## Personalização

Todos os componentes aceitam props adicionais para personalização:

- `className`: Classes CSS adicionais
- `color`: Cor personalizada (Loading)
- `icon`: Ícone personalizado (Error, Empty)

```tsx
<Loading color="#8e44ad" />
<Error icon={<CustomIcon />} />
<Empty className="bg-gray-100" />
``` 