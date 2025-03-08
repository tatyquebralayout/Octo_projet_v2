# StandardLayout: Guia de Uso e Padronização

## Introdução

O `StandardLayout` é um componente criado para garantir a consistência visual e de experiência do usuário em todas as páginas do projeto OCTO. Este componente foi desenvolvido com base no layout da página "Quem Somos", que serve como referência para todas as outras páginas (exceto a Home).

## Estrutura Visual

O layout padrão consiste em:

1. **Header** - Fixo no topo da página (fornecido automaticamente pelo sistema de rotas)
2. **Hero Banner** - Seção destacada no topo com imagem de fundo, cor e título
3. **Seções de Conteúdo** - Área principal com uma ou mais seções de conteúdo
4. **Footer Customizado** - Área opcional para chamadas à ação ou informações complementares

## Importação e Uso Básico

```tsx
import StandardLayout from '@/components/layout/StandardLayout';

const MinhaPage = () => {
  return (
    <StandardLayout
      title="Título da Página"
      description="Descrição para SEO"
      heroBackgroundColor="#972ae6"
      heroTitle="Título do Banner Hero"
    >
      {/* Seções de conteúdo aqui */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          {/* Conteúdo da seção */}
        </div>
      </section>
    </StandardLayout>
  );
};
```

## Props Disponíveis

| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `title` | string | Sim | Título da página (usado no SEO e cabeçalho) |
| `description` | string | Não | Descrição da página para SEO |
| `ogImage` | string | Não | Imagem para compartilhamento em redes sociais |
| `breadcrumbs` | ReactNode | Não | Componente de breadcrumbs |
| `heroBackgroundImage` | string | Não | URL da imagem de fundo do banner hero |
| `heroBackgroundColor` | string | Não | Cor de fundo do banner hero |
| `heroTitle` | string | Não | Título do banner hero |
| `heroSubtitle` | string | Não | Subtítulo do banner hero |
| `children` | ReactNode | Sim | Conteúdo principal da página (seções) |
| `footerContent` | ReactNode | Não | Conteúdo personalizado para o footer |
| `className` | string | Não | Classes CSS adicionais |
| `isLoading` | boolean | Não | Estado de carregamento |
| `loadingMessage` | string | Não | Mensagem de carregamento personalizada |
| `error` | Error | Não | Objeto de erro, se houver |
| `onRetry` | function | Não | Função para tentar novamente após erro |
| `animation` | string | Não | Tipo de animação ('fade', 'slide', 'scale', 'none') |

## Padrões de Cores e Estilos

Para manter a consistência visual, use estas cores e padrões:

### Cores Principais
- Primária: `#972ae6` (roxo)
- Secundária: `#e8b624` (amarelo)
- Fundos alternados: `white` e `bg-gray-50`

### Espaçamentos
- Padding vertical das seções: `py-24`
- Padding horizontal: `px-6` com `container mx-auto`

### Tipografia
- Títulos de seção: `text-[56px] font-bold text-[#972ae6]`
- Textos: `text-lg text-[#972ae6]/70`
- Espaçamento entre parágrafos: `mb-6`

## Exemplos de Seções Comuns

### Seção de Grid com Itens

```tsx
<section className="py-24 bg-white">
  <div className="container mx-auto px-6">
    <h2 className="text-[56px] font-bold text-[#972ae6] text-center mb-16">
      Título da Seção
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-xl p-6">
          {/* Conteúdo do item */}
        </div>
      ))}
    </div>
  </div>
</section>
```

### Seção de Destaque com Imagem e Texto

```tsx
<section className="py-24 bg-gray-50">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <img
          src="/caminho/para/imagem.jpg"
          alt="Descrição da imagem"
          className="rounded-2xl shadow-lg w-full h-[500px] object-cover"
        />
      </div>
      <div className="space-y-8">
        <h2 className="text-[56px] font-bold text-[#972ae6]">
          Título da Seção
        </h2>
        <div className="prose prose-lg">
          <p className="text-lg text-[#972ae6]/70 mb-6">
            Texto explicativo aqui...
          </p>
        </div>
        <Link
          to="/alguma-pagina"
          className="inline-block px-8 py-4 bg-[#972ae6] text-white rounded-full font-bold
            hover:bg-[#e8b624] transition-all duration-300
            transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Botão de Ação
        </Link>
      </div>
    </div>
  </div>
</section>
```

## Footer Personalizado

```tsx
const FooterContent = () => (
  <div className="text-center">
    <h2 className="text-[56px] font-bold text-white mb-4">
      Título do Footer
    </h2>
    <p className="text-xl text-white/90 max-w-2xl mx-auto">
      Texto do footer aqui...
    </p>
    <div className="mt-8">
      <a
        href="mailto:contato@octodiversidade.com.br"
        className="inline-block px-8 py-4 bg-white text-[#972ae6] rounded-full font-bold"
      >
        Ação do Footer
      </a>
    </div>
  </div>
);

// Na página
<StandardLayout
  // ... outras props
  footerContent={<FooterContent />}
>
  {/* Conteúdo da página */}
</StandardLayout>
```

## Melhores Práticas

1. **Componentização**: Crie componentes para as seções para melhor organização do código
2. **Alternância de Cores**: Alterne entre fundos brancos e cinza claro para as seções
3. **Responsividade**: Use o sistema de grid do Tailwind para layouts responsivos
4. **Consistência**: Mantenha a mesma paleta de cores e espaçamentos em todas as páginas
5. **Acessibilidade**: Mantenha contrastes adequados e textos alternativos para imagens

## Animações

O StandardLayout suporta animações de entrada para a página através da prop `animation`:

```tsx
<StandardLayout
  // ... outras props
  animation="slide" // Opções: 'fade', 'slide', 'scale', 'none'
>
  {/* Conteúdo */}
</StandardLayout>
```

## Fluxo de Trabalho para Migração de Páginas

1. Analise a estrutura atual da página
2. Identifique as seções principais e seu conteúdo
3. Escolha as cores e imagens adequadas para o hero banner
4. Refatore cada seção usando os padrões de espaçamento e cores
5. Verifique a responsividade em diferentes tamanhos de tela
6. Teste a acessibilidade com ferramentas como Lighthouse 