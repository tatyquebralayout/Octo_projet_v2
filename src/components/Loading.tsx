import { Loading as LoadingDS } from '../design-system/components/ui';

const Loading = () => {
  return (
    <LoadingDS 
      size="lg"
      variant="spinner"
      fullPage
      accessibilityLabel="Carregando conteúdo"
    />
  );
};

export default Loading;