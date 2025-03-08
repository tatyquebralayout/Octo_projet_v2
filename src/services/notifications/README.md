# Sistema de Notificações para OCTO

Um sistema completo de notificações frontend para React, projetado especialmente para pessoas com deficiências, integrando recursos avançados de acessibilidade.

## Características

- **Toasts para feedback imediato**
  - Diferentes tipos (sucesso, erro, info, warning)
  - Configurações de duração flexíveis
  - Animações suaves de entrada/saída
  - Barra de progresso visual

- **Centro de notificações persistente**
  - Armazenamento de histórico de notificações
  - Filtragem por tipo, categoria e status
  - Interfaces para marcar como lidas/não lidas
  - Ações personalizáveis

- **Recursos de acessibilidade**
  - Atributos ARIA incorporados
  - Live regions para leitores de tela
  - Pausa automática no hover
  - Duração adaptativa para necessidades cognitivas

- **APIs flexíveis**
  - Interface declarativa com hooks
  - Métodos para adição/remoção programática
  - Suporte para prioridades e categorias
  - Integrável com websockets/polling

## Instalação

O sistema de notificações vem pré-instalado no projeto OCTO. Para utilizá-lo, você só precisa adicionar o provider na raiz da sua aplicação:

```tsx
import { NotificationsProvider } from 'src/components/notifications';

function App() {
  return (
    <NotificationsProvider>
      <YourApp />
    </NotificationsProvider>
  );
}
```

## Como usar

### Toasts (feedback imediato)

```tsx
import { useNotifications } from 'src/services/notifications';

function MyComponent() {
  const { 
    showToast, 
    showSuccessToast, 
    showErrorToast,
    showInfoToast,
    showWarningToast 
  } = useNotifications();
  
  // Métodos convenientes para tipos comuns
  const handleSuccess = () => {
    showSuccessToast('Sucesso!', 'Operação realizada com sucesso.');
  };
  
  // Ou personalize completamente
  const handleCustomToast = () => {
    showToast({
      title: 'Personalizado',
      message: 'Este é um toast personalizado com ações.',
      type: 'info',
      duration: 8000,
      actions: [
        {
          label: 'Ver mais',
          onClick: () => console.log('Clicou em Ver mais'),
          variant: 'primary'
        }
      ]
    });
  };
  
  return (
    <div>
      <button onClick={handleSuccess}>Mostrar Sucesso</button>
      <button onClick={handleCustomToast}>Toast Personalizado</button>
    </div>
  );
}
```

### Botão de notificações

Adicione o botão de notificações ao seu layout para que os usuários possam acessar o centro de notificações:

```tsx
import { NotificationButton } from 'src/components/notifications';

function Header() {
  return (
    <header>
      {/* ... outros elementos ... */}
      <NotificationButton />
    </header>
  );
}
```

### Adicionando notificações persistentes

```tsx
import { useNotifications } from 'src/services/notifications';

function Dashboard() {
  const { addNotification } = useNotifications();
  
  const handleNewMessage = (message) => {
    addNotification({
      title: 'Nova mensagem',
      message: `${message.sender}: ${message.preview}`,
      type: 'info',
      category: 'messages',
      details: message.fullContent,
      link: `/messages/${message.id}`,
      actions: [
        {
          label: 'Responder',
          onClick: () => navigateToMessage(message.id),
          variant: 'primary'
        },
        {
          label: 'Marcar como lida',
          onClick: () => markMessageAsRead(message.id),
          variant: 'secondary'
        }
      ]
    });
  };
  
  // Resto do componente...
}
```

## Mocks para desenvolvimento

Durante o desenvolvimento, você pode simular notificações usando o hook de mock:

```tsx
import { useMockNotifications } from 'src/services/notifications/mock';

function DevTools() {
  // Habilite geração automática (apenas em desenvolvimento)
  useMockNotifications(true, true);
  
  // Ou gere manualmente
  const { generateToast, generateNotification } = useMockNotifications();
  
  return (
    <div>
      <button onClick={generateToast}>Gerar Toast Aleatório</button>
      <button onClick={generateNotification}>Gerar Notificação Aleatória</button>
    </div>
  );
}
```

## Arquitetura

O sistema é construído com os seguintes componentes:

1. **Estado centralizado**: Usando Context API e Reducer
2. **Componentes visuais**: Toast, NotificationItem, NotificationCenter 
3. **Hooks personalizados**: useNotifications, useMockNotifications
4. **Utilitários**: Formatação, geração de IDs, funções auxiliares

Isso permite um sistema desacoplado e extensível, preparado para integrações futuras como WebSockets ou APIs de push notifications.

## Recursos de acessibilidade

Este sistema foi projetado especificamente para atender necessidades de pessoas com deficiências:

- **Deficiência visual**: 
  - Todas as notificações são anunciadas por leitores de tela
  - Atributos ARIA apropriados para anúncios contextual
  - Alto contraste e cores acessíveis

- **Deficiência cognitiva**:
  - Pausas automáticas em hover para dar tempo de ler
  - Duração estendida configurável 
  - Persistência de notificações importantes

- **Deficiência motora**:
  - Interface navegável por teclado
  - Botões com área de toque adequada
  - Agrupamento lógico de controles

## Integração com backend

O sistema está pronto para integração com endpoints de backend:

```tsx
// Exemplo com WebSocket
useEffect(() => {
  const socket = new WebSocket('wss://api.octo.org.br/notifications');
  
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    
    // Adicionar como toast para feedback imediato
    showToast({
      title: data.title,
      message: data.message,
      type: data.type
    });
    
    // E também como notificação persistente
    addNotification({
      ...data,
      category: data.category
    });
  });
  
  return () => socket.close();
}, []);
```

## Exemplos

Veja o componente `NotificationExample.tsx` para um exemplo completo de uso do sistema. 