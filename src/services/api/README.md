# Sistema de Mocks para API do OCTO

Este sistema de mocks permite o desenvolvimento frontend de forma independente do backend, simulando todos os endpoints necessários para a aplicação. O sistema inclui:

- Simulação de endpoints para todas as funcionalidades principais
- Dados realistas para testes
- Simulação de delays de rede configuráveis
- Tratamento de erros consistente
- Fácil ativação/desativação baseado em variáveis de ambiente
- Tipagem TypeScript completa

## Endpoints Suportados

O sistema suporta os seguintes grupos de endpoints:

### Autenticação
- Login
- Registro de usuário
- Logout
- Renovação de token
- Alteração de senha

### Usuários
- Perfil do usuário
- Listagem de usuários
- Atualização de perfil

### Conteúdo
- Artigos
- Cursos
- Newsletters

### Recursos
- Guias e cartilhas
- Ferramentas
- Vídeos

### Contato
- Envio de formulário de contato
- Inscrição em newsletter

### Notícias
- Listagem de notícias
- Notícias em destaque
- Filtragem por categoria e tags
- Notícias relacionadas

## Como Usar

Para utilizar o sistema de mocks, basta importar o `apiService` e fazer chamadas normalmente. O serviço automaticamente usará mocks em ambiente de desenvolvimento.

```typescript
import { apiService } from 'src/services/api/apiService';

// O serviço detecta automaticamente o ambiente
const { data } = await apiService.get('/users/profile');

// Também é possível ativar/desativar mocks programaticamente
apiService.setMockEnabled(true); // Ativa mocks
apiService.setMockEnabled(false); // Desativa mocks
```

## Configuração

O sistema de mocks é controlado pelas seguintes variáveis de ambiente:

```
VITE_ENABLE_MOCKS=true     # Ativa/desativa os mocks
VITE_API_URL=https://api.octo.org.br/v1  # URL base da API real
```

Por padrão, os mocks são ativados automaticamente em ambiente de desenvolvimento. Em produção, eles são desativados a menos que `VITE_ENABLE_MOCKS` seja explicitamente definido como `true`.

## Simulação de Cenários

### Delays de Rede

O sistema simula delays de rede aleatórios entre o mínimo e máximo configurados em `config.ts`:

```typescript
MOCK_DELAY: {
  MIN: 200,  // Mínimo de delay em ms
  MAX: 1000, // Máximo de delay em ms
}
```

### Erros Aleatórios

Para testar cenários de erro, o sistema pode simular falhas aleatórias com base na probabilidade configurada:

```typescript
MOCK_ERROR_RATE: 0.05 // 5% de chance de erro
```

## Adicionando Novos Mocks

Para adicionar novos endpoints ao sistema de mocks:

1. Defina os tipos necessários em `types.ts`
2. Adicione dados de exemplo em `mockData.ts`
3. Crie funções de mock em `mockService.ts`
4. Registre o endpoint no objeto `mockServices`

## Estrutura do Sistema

```
src/services/api/
├── apiService.ts     # Serviço principal da API
├── config.ts         # Configurações e endpoints
├── mockData.ts       # Dados para mock
├── mockService.ts    # Implementação dos mocks
└── types.ts          # Tipos e interfaces
``` 