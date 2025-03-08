import React, { memo, useCallback, useMemo } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import GuideCard from './GuideCard';
import { GuideListItem } from '../../types/guides';
import { convertToGuide } from '../../types/guides';
import { Loading, Error, Empty } from '../../design-system/components/ui';
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
  error?: Error | null;
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
  
  // Evitar recalcular guideForCard desnecessariamente, usando useMemo
  return (
    <div className="guide-card-wrapper" style={style}>
      <MemoizedGuideCard guide={guide} />
    </div>
  );
}, (prevProps, nextProps) => {
  // Implementar comparação personalizada para evitar rerenderizações desnecessárias
  const prevData = prevProps.data as GuideItemData;
  const nextData = nextProps.data as GuideItemData;
  
  const prevGuide = prevData.guides[prevProps.rowIndex * prevData.columnCount + prevProps.columnIndex];
  const nextGuide = nextData.guides[nextProps.rowIndex * nextData.columnCount + nextProps.columnIndex];
  
  // Só renderizar novamente se o guia ou posição mudarem
  return (
    prevProps.columnIndex === nextProps.columnIndex &&
    prevProps.rowIndex === nextProps.rowIndex &&
    prevProps.style === nextProps.style &&
    prevGuide?.id === nextGuide?.id
  );
});

// Componente GuideCard memoizado que converte o guia internamente
const MemoizedGuideCard = memo(({ guide }: { guide: GuideListItem }) => {
  // Converter GuideListItem para Guide de forma segura com a função utilitária
  const guideForCard = useMemo(() => convertToGuide(guide), [guide.id]);
  
  return <GuideCard guide={guideForCard} />;
});

MemoizedGuideCard.displayName = 'MemoizedGuideCard';
ItemRenderer.displayName = 'ItemRenderer';

// Componente principal para a virtualização de cartilhas
const CartilhasVirtualList: React.FC<CartilhasVirtualListProps> = ({
  guides,
  isLoading,
  error,
  onRetry,
  noResultsComponent,
  className = ''
}) => {
  // Evitar problemas com arrays nulos/undefined
  const safeGuides = useMemo(() => guides || [], [guides]);
  
  // Calcular o número de colunas com base na largura da tela - OTIMIZADO
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
    
    const rowCount = Math.ceil(safeGuides.length / columnCount);
    
    return {
      columnCount,
      rowCount,
      itemWidth,
      itemHeight: 400, // Altura fixa para cada item
    };
  }, [safeGuides.length]);

  // Altura mínima calculada para o contêiner para evitar saltos de layout
  const minHeight = useMemo(() => {
    return Math.min(800, Math.ceil(safeGuides.length / 3) * 400);
  }, [safeGuides.length]);

  // Dados para o grid virtualizados - OTIMIZADO para evitar recriação do objeto
  // que causa problema de memória em listas grandes
  const gridData = useMemo(() => {
    return { guides: safeGuides, columnCount: 3 };
  }, [safeGuides]); // Dependência apenas do array de guides
  
  // OTIMAÇÃO: Limitar a quantidade de itens pré-renderizados para evitar
  // consumo excessivo de memória em listas grandes
  const overscanRowCount = useMemo(() => Math.min(1, Math.ceil(safeGuides.length / 10)), [safeGuides.length]);
  
  // Renderização condicional memoizada para minimizar trabalho na rerenderização
  const renderContent = useCallback(() => {
    if (isLoading) {
      return <Loading size="lg" variant="spinner" />;
    }
  
    if (error) {
      return (
        <Error 
          title="Falha ao carregar cartilhas"
          message={error.message || "Não foi possível carregar as cartilhas"}
          variant="card"
          size="md"
          onRetry={onRetry}
          retryText="Tentar novamente"
        />
      );
    }
  
    if (safeGuides.length === 0) {
      if (noResultsComponent) {
        return <>{noResultsComponent}</>;
      }
      
      return (
        <Empty 
          title="Nenhuma cartilha encontrada" 
          message="Tente ajustar seus filtros ou termos de busca."
          variant="card"
          size="md"
          centered
        />
      );
    }
    
    return (
      <div className={`guides-virtual-container ${className}`} style={{ height: minHeight }}>
        <AutoSizer>
          {({ height, width }) => {
            const { columnCount, rowCount, itemWidth, itemHeight } = getGridConfig(width);
            
            // Atualizar o número de colunas usando ref para evitar recriação do objeto
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
                overscanRowCount={overscanRowCount}
                itemKey={({columnIndex, rowIndex, data}) => {
                  const index = rowIndex * data.columnCount + columnIndex;
                  return index < data.guides.length ? `guide-${data.guides[index].id}` : `empty-${rowIndex}-${columnIndex}`;
                }}
              >
                {ItemRenderer}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>
    );
  }, [isLoading, error, safeGuides, noResultsComponent, minHeight, className, getGridConfig, gridData, overscanRowCount, onRetry]);

  return renderContent();
};

export default memo(CartilhasVirtualList); 