import React from 'react';
import { Helmet } from 'react-helmet-async';
import { cn } from '../../utils/cn';
import { Loading } from '../../design-system/components/ui/Loading';
import { Error } from '../../design-system/components/ui/Error';
import { AnimatePresence, motion } from 'framer-motion';

export interface PageLayoutProps {
  /** Título da página */
  title: string;
  /** Descrição para SEO */
  description?: string;
  /** Caminho para a imagem OpenGraph */
  ogImage?: string;
  /** Breadcrumbs para navegação */
  breadcrumbs?: React.ReactNode;
  /** Conteúdo principal da página */
  children: React.ReactNode;
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
 * Fornece estrutura consistente, controle de estados e SEO
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  description,
  ogImage = '/images/og-default.jpg',
  breadcrumbs,
  children,
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

      {breadcrumbs && (
        <div className="container mx-auto px-4 py-4">
          {breadcrumbs}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          className={cn(
            "min-h-[50vh] container mx-auto px-4 py-6",
            className
          )}
          initial={selectedVariant.initial}
          animate={selectedVariant.animate}
          exit={selectedVariant.exit}
          transition={selectedVariant.transition}
        >
          <h1 className="text-h1 mb-8">{title}</h1>
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export default PageLayout; 