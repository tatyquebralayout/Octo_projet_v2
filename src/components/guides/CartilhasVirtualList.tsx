import React, { memo, useCallback, useMemo } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import GuideCard from './GuideCard';
import { GuideListItem } from '../../hooks/useGuides';
import { ErrorMessage } from '../../utils/errors/components';
import { ErrorType } from '../../utils/errors/types';
import { ListChildComponentProps } from 'react-window';

// Interface para dados do grid
interface GuideItemData {
  guides: GuideListItem[];
  columnCount: number;
}

// Props do componente principal
interface CartilhasVirtualListProps {
  guides: GuideListItem[];
  isLoading: boolean;
  error: Error | null;
  onRetry?: () => void;
  noResultsComponent?: React.ReactNode;
  className?: string;
}

// Item de cartilha virtualizado
const ItemRenderer = memo(({ columnIndex, rowIndex, style, data }: GridChildComponentProps<GuideItemData>) => {
  const { guides, columnCount } = data;
  const itemIndex = rowIndex * columnCount + columnIndex;
  
  if (itemIndex >= guides.length) {
    return null;
  }
  
  const guide = guides[itemIndex];
  
  // Adaptar GuideListItem para tipo Guide se necessário
  const guideForCard = {
    ...guide,
    // Garantir que downloadUrl esteja presente mesmo quando undefined
    downloadUrl: guide.downloadUrl || ''
  };
  
  return (
    <div className="guide-card-wrapper" style={style}>
      <GuideCard guide={guideForCard} />
    </div>
  );
});

ItemRenderer.displayName = 'ItemRenderer';

// Componente de esqueleto de carregamento
const LoadingSkeleton = memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div 
        key={index} 
        className="guide-skeleton-item animate-pulse"
        aria-hidden="true"
      />
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

// Componente para mensagem de erro
const ErrorDisplay = memo(({ error, onRetry }: { error: Error; onRetry?: () => void }) => (
  <div className="py-6">
    <ErrorMessage 
      message={error.message || "Não foi possível carregar as cartilhas"} 
      type={ErrorType.SERVER} 
    />
    {onRetry && (
      <button 
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Tentar novamente
      </button>
    )}
    <p className="text-sm text-gray-500 mt-2">
      Enquanto isso, você pode tentar ajustar os filtros de busca ou voltar mais tarde.
    </p>
  </div>
));

ErrorDisplay.displayName = 'ErrorDisplay';

// Componente para estado vazio (sem resultados)
const NoResultsDisplay = memo(({ customComponent }: { customComponent?: React.ReactNode }) => {
  if (customComponent) {
    return <>{customComponent}</>;
  }
  
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold mb-2">Nenhuma cartilha encontrada</h3>
      <p className="text-gray-600 mb-4">
        Tente ajustar seus filtros ou termos de busca.
      </p>
    </div>
  );
});

NoResultsDisplay.displayName = 'NoResultsDisplay';

// Componente principal para a virtualização de cartilhas
const CartilhasVirtualList: React.FC<CartilhasVirtualListProps> = ({
  guides,
  isLoading,
  error,
  onRetry,
  noResultsComponent,
  className = ''
}) => {
  // Calcular o número de colunas com base na largura da tela
  const getGridConfig = useCallback((width: number) => {
    let columnCount = 1;
    let itemWidth = 300;
    
    if (width >= 1200) { // xl
      columnCount = 3;
      itemWidth = Math.floor((width - 48) / columnCount); // Compensar gaps
    } else if (width >= 768) { // md
      columnCount = 2;
      itemWidth = Math.floor((width - 24) / columnCount); // Compensar gaps
    }
    
    const rowCount = Math.ceil((guides?.length || 0) / columnCount);
    
    return {
      columnCount,
      rowCount,
      itemWidth,
      itemHeight: 400, // Altura fixa para cada item
    };
  }, [guides?.length]);

  // Altura mínima calculada para o contêiner para evitar saltos de layout
  const minHeight = useMemo(() => {
    return Math.min(800, Math.ceil((guides?.length || 0) / 3) * 400);
  }, [guides?.length]);

  // Dados para o grid virtualizados
  const gridData = useMemo(() => {
    return { guides, columnCount: 3 }; // O columnCount será atualizado na renderização
  }, [guides]);

  // Renderizar com base no estado
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={onRetry} />;
  }

  if (!guides || guides.length === 0) {
    return <NoResultsDisplay customComponent={noResultsComponent} />;
  }

  return (
    <div className={`guides-virtual-container ${className}`} style={{ height: minHeight }}>
      <AutoSizer>
        {({ height, width }) => {
          const { columnCount, rowCount, itemWidth, itemHeight } = getGridConfig(width);
          
          // Atualizar o número de colunas para os dados do grid
          gridData.columnCount = columnCount;
          
          return (
            <Grid
              className="guide-grid"
              columnCount={columnCount}
              columnWidth={itemWidth}
              height={Math.max(height, minHeight)}
              rowCount={rowCount}
              rowHeight={itemHeight}
              width={width}
              itemData={gridData}
              overscanRowCount={1} // Pre-carrega uma linha extra para melhorar experiência de rolagem
            >
              {ItemRenderer}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default memo(CartilhasVirtualList); 