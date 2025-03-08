# Sistema de Cache e Persistência Local para OCTO

Este módulo implementa um sistema completo de cache e persistência local para dados de API na aplicação OCTO, otimizado para pessoas com deficiências.

## Características Principais

1. **Armazenamento Configurável**
   - Suporte a múltiplas estratégias: localStorage, IndexedDB e memória
   - Fallback automático quando um método não está disponível
   - Configuração de tamanho máximo e política de expiração

2. **Persistência de Dados**
   - Armazenamento de respostas de API por tempo configurável
   - Diferentes TTLs (time-to-live) por tipo de endpoint
   - Versionamento para migrações de esquema

3. **Sincronização Offline**
   - Detecção automática de conectividade
   - Uso de dados em cache quando offline
   - Sincronização quando reconectar

4. **Estratégias de Invalidação**
   - Invalidação por chave
   - Invalidação por tags (grupos de itens relacionados)
   - Invalidação automática por tempo

5. **Hooks React**
   - `useCache` - Hook básico para acessar dados em cache
   - `useCacheWithMutation` - Hook com suporte a mutações otimistas
   - `useApiCache` - Hook especializado para API do OCTO

6. **Otimizações para Acessibilidade**
   - Configurações específicas para pessoas com deficiências
   - Maior tempo de cache para reduzir carregamentos
   - Prioridade para dados em cache para melhorar responsividade

## Estrutura do Módulo

```
src/services/cache/
├── types.ts           # Definições de tipos TypeScript
├── config.ts          # Configurações e constantes
├── utils.ts           # Funções utilitárias
├── storageManager.ts  # Adaptadores de armazenamento
├── cacheManager.ts    # Gerenciador principal de cache
└── index.ts           # Ponto de entrada e exportações
```

## Como Usar

### Uso Básico

```typescript
import { cacheManager } from 'src/services/cache';

// Buscar dados com cache
const result = await cacheManager.getOrFetch(
  '/api/users',
  () => fetch('/api/users').then(res => res.json()),
  { expiresIn: 60 * 1000 } // 1 minuto
);

console.log('Dados:', result.data);
console.log('Do cache?', result.fromCache);
```

### Com Hooks React

```tsx
import { useCache } from 'src/hooks';

function UserList() {
  const { data, isLoading, error, refresh } = useCache(
    '/api/users',
    () => fetch('/api/users').then(res => res.json()),
    { expiresIn: 60 * 1000 }
  );

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;

  return (
    <div>
      <button onClick={refresh}>Atualizar</button>
      <ul>
        {data?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Com API do OCTO

```tsx
import { useApiCache } from 'src/hooks';

function GuidesList() {
  const { data, isLoading, error } = useApiCache(
    '/guides',
    { category: 'accessibility' }
  );

  // Renderização do componente...
}
```

### Com Paginação

```tsx
import { useApiPaginatedCache } from 'src/hooks';

function NewsList() {
  const {
    items,
    pagination,
    isLoading,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage
  } = useApiPaginatedCache('/news', 1, 10);

  // Renderização do componente com paginação...
}
```

### Com Mutações Otimistas

```tsx
import { useCacheWithMutation } from 'src/hooks';

function UserProfile() {
  const {
    data: user,
    isLoading,
    error,
    mutate,
    isMutating
  } = useCacheWithMutation(
    '/api/users/me',
    () => fetch('/api/users/me').then(res => res.json())
  );

  const updateName = async (newName) => {
    mutate(
      async (currentUser) => {
        const response = await fetch('/api/users/me', {
          method: 'PATCH',
          body: JSON.stringify({ name: newName })
        });
        return response.json();
      },
      // Atualização otimista
      (currentUser) => ({
        ...currentUser,
        name: newName
      })
    );
  };

  // Renderização do componente...
}
```

## Configuração

O sistema pode ser configurado através do arquivo `config.ts`:

```typescript
// Exemplo de configuração personalizada
import { CACHE_CONFIG } from 'src/services/cache';

// Sobrescrever configurações padrão
Object.assign(CACHE_CONFIG, {
  // Aumentar tempo de cache para 2 dias
  defaultExpiryTime: 2 * 24 * 60 * 60 * 1000,
  // Usar IndexedDB como armazenamento padrão
  defaultStorage: StorageType.INDEXED_DB,
  // Aumentar limite de armazenamento
  maxSize: 100 * 1024 * 1024 // 100MB
});
```

## Considerações para Acessibilidade

Este sistema foi projetado com foco em acessibilidade para pessoas com deficiências:

1. **Redução de Carregamentos**: Maior tempo de cache para minimizar carregamentos repetidos, beneficiando pessoas com deficiências cognitivas ou visuais.

2. **Disponibilidade Offline**: Armazenamento persistente para acesso mesmo sem internet, importante para pessoas com mobilidade reduzida ou em áreas com conectividade limitada.

3. **Responsividade**: Prioridade para dados em cache para melhorar tempo de resposta, beneficiando pessoas com deficiências motoras que podem ter dificuldade com interações repetitivas.

4. **Consistência**: Manutenção de estado consistente entre sessões, importante para pessoas com deficiências cognitivas que dependem de previsibilidade.

## Versionamento e Migrações

O sistema inclui suporte para versionamento de esquema e migrações:

```typescript
// Incrementar versão quando houver mudanças incompatíveis
export const CACHE_SCHEMA_VERSION = 1;
```

Quando a versão é incrementada, os dados em cache com versões anteriores são automaticamente invalidados, garantindo compatibilidade. 