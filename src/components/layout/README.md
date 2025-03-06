# Componentes de Layout

## Header

O Header é o componente principal de navegação do site OCTO. Ele fornece uma experiência de navegação consistente e acessível em todas as páginas.

### Características

- Menu responsivo (desktop e mobile)
- Navegação acessível com suporte a teclado
- Submenus com animações suaves
- Ícones com carregamento lazy
- Integração com redes sociais

### Estrutura

```
Header/
├── Header.tsx              # Componente principal
├── navigation/            # Subcomponentes de navegação
│   ├── MenuItem.tsx       # Item do menu principal
│   ├── SubMenuItem.tsx    # Item do submenu
│   └── SocialIcons.tsx    # Ícones de redes sociais
├── hooks/                # Hooks customizados
│   ├── useMenu.ts        # Gerenciamento do menu mobile
│   ├── useSubmenu.ts     # Gerenciamento de submenus
│   └── useClickOutside.ts # Detecção de clique fora
└── contexts/            # Contextos
    └── MenuContext.tsx   # Estado global do menu
```

### Uso

```tsx
import Header from './components/layout/Header';
import { MenuProvider } from './contexts/MenuContext';

function App() {
  return (
    <MenuProvider>
      <Header />
      {/* resto do app */}
    </MenuProvider>
  );
}
```

### Acessibilidade

O componente segue as diretrizes WCAG 2.1:
- Navegação por teclado
- Atributos ARIA apropriados
- Estrutura semântica com roles
- Textos alternativos para imagens
- Feedback visual para estados

### Hooks Customizados

#### useMenu
Gerencia o estado do menu mobile:
- `isMenuOpen`: Estado atual do menu
- `toggleMenu`: Alterna o menu
- `closeMenu`: Fecha o menu

#### useSubmenu
Gerencia os submenus:
- `activeSubmenu`: Submenu ativo
- `openSubmenu`: Abre um submenu
- `closeSubmenu`: Fecha o submenu
- `isSubmenuOpen`: Verifica se um submenu está aberto

#### useClickOutside
Detecta cliques fora de um elemento:
- Recebe uma ref e um callback
- Fecha automaticamente menus ao clicar fora

### Performance

- Lazy loading para ícones
- Memoização de itens do menu
- Componentização para evitar re-renders
- Carregamento otimizado de imagens

### Testes

O componente inclui:
- Testes unitários
- Testes de interação
- Testes de acessibilidade
- Testes de responsividade

### Próximas Melhorias

- [ ] Adicionar mais testes de integração
- [ ] Implementar animações suaves no menu mobile
- [ ] Adicionar suporte a temas
- [ ] Implementar cache de estado do menu
- [ ] Melhorar feedback visual para usuários de teclado 