import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { cn } from '../../utils/cn';
import { Loading } from '../../design-system/components/ui/Loading';
import { Error } from '../../design-system/components/ui/Error';

export interface StandardLayoutProps {
  /** Título da página */
  title: string;
  /** Descrição para SEO */
  description?: string;
  /** Caminho para a imagem OpenGraph */
  ogImage?: string;
  /** Breadcrumbs para navegação */
  breadcrumbs?: React.ReactNode;
  /** Hero Banner - Imagem de fundo */
  heroBackgroundImage?: string;
  /** Cor de fundo do Hero (cor primária) */
  heroBackgroundColor?: string;
  /** Título do Hero */
  heroTitle?: string;
  /** Subtítulo do Hero */
  heroSubtitle?: string;
  /** Conteúdo principal da página (seções) */
  children: React.ReactNode;
  /** Componentes adicionais para o footer personalizado */
  footerContent?: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
  /** Estado de carregamento */
  isLoading?: boolean;
  /** Mensagem de carregamento personalizada */
  loadingMessage?: string;
  /** Erro, se houver */
  error?: Error | null;
  /** Função para tentar novamente em caso de erro */
  onRetry?: () => void;
  /** Animação de entrada */
  animation?: 'fade' | 'slide' | 'scale' | 'none';
}

/**
 * Layout padrão para todas as páginas do sistema
 * Baseado no modelo visual da página QuemSomos
 * Fornece estrutura consistente com header, hero banner, seções de conteúdo e footer
 */
export const StandardLayout: React.FC<StandardLayoutProps> = ({
  title,
  description,
  ogImage = '/images/og-default.jpg',
  breadcrumbs,
  heroBackgroundImage,
  heroBackgroundColor = '#972ae6', // Cor padrão baseada na página QuemSomos
  heroTitle,
  heroSubtitle,
  children,
  footerContent,
  className,
  isLoading = false,
  loadingMessage = 'Carregando conteúdo...',
  error = null,
  onRetry,
  animation = 'fade',
}) => {
  // Variants para animações
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
      transition: { duration: 0.3 }
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
      transition: {}
    }
  };

  const selectedVariant = variants[animation] || variants.fade;

  // Renderizar estado de carregamento
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loading variant="spinner" />
        <div className="ml-3 text-body text-gray-600">{loadingMessage}</div>
      </div>
    );
  }

  // Renderizar estado de erro
  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Error
          message="Não foi possível carregar o conteúdo"
        />
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Tentar novamente
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{title} | OCTO</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:image" content={ogImage} />
      </Helmet>

      <div className="min-h-screen">
        {/* Breadcrumbs (se fornecidos) */}
        {breadcrumbs && (
          <div className="container mx-auto px-6 py-4">
            {breadcrumbs}
          </div>
        )}

        {/* Hero Section */}
        <section className="h-[400px] bg-[#972ae6] relative overflow-hidden" style={{ backgroundColor: heroBackgroundColor }}>
          {heroBackgroundImage && (
            <div className="absolute inset-0">
              <img
                src={heroBackgroundImage}
                alt=""
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0" style={{ backgroundColor: heroBackgroundColor, opacity: 0.9 }} />
            </div>
          )}
          <div className="container mx-auto px-6 h-full relative z-10">
            <div className="flex items-center h-full">
              <div className="max-w-4xl">
                {heroTitle && (
                  <h1 className="text-[56px] font-bold text-white">
                    {heroTitle}
                  </h1>
                )}
                {heroSubtitle && (
                  <p className="text-xl text-white/90 mt-4">
                    {heroSubtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          <motion.main
            className={cn("flex-grow", className)}
            initial={selectedVariant.initial}
            animate={selectedVariant.animate}
            exit={selectedVariant.exit}
            transition={selectedVariant.transition}
          >
            {children}
          </motion.main>
        </AnimatePresence>

        {/* Footer Section */}
        {footerContent && (
          <section className="py-16 bg-[#e8b624]">
            <div className="container mx-auto px-6">
              {footerContent}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default StandardLayout; 