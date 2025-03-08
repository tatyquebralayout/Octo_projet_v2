import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Guide } from '../services/api/types';
import { ENDPOINTS } from '../services/api/config';
import { useNotifications } from '../services/notifications';
import { NotificationType } from '../services/notifications/types';
import { formatDate } from '../utils/formatters';
import { Loading, Error } from '../design-system/components/ui';
import { useDataFetching } from '../hooks';

const CartilhaDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useNotifications();
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Usar o hook useDataFetching para buscar os detalhes da cartilha
  const { 
    data: guide, 
    isLoading, 
    error 
  } = useDataFetching<Guide>({
    endpoint: `${ENDPOINTS.RESOURCES.GUIDES}/${id}`,
    method: 'GET',
    autoFetch: !!id,
    useCache: true,
    retry: true,
    showErrorNotification: true,
    errorTitle: 'Erro ao carregar cartilha',
    errorMessage: 'Não foi possível carregar os detalhes da cartilha solicitada.'
  });
  
  // Iniciar download da cartilha
  const handleDownload = async () => {
    if (!id || !guide) return;
    
    try {
      setIsDownloading(true);
      
      // Criar uma instância do hook para o download
      const downloadHook = useDataFetching<{ downloadUrl: string }>({
        endpoint: `${ENDPOINTS.RESOURCES.GUIDES}/${id}/download`,
        method: 'GET',
        autoFetch: false, // Não buscar automaticamente
        showSuccessNotification: true,
        successTitle: 'Download iniciado',
        successMessage: 'O download da cartilha foi iniciado com sucesso.',
        // Adicionar onSuccess para abrir a URL em uma nova aba
        onSuccess: (data) => {
          if (data && data.downloadUrl) {
            window.open(data.downloadUrl, '_blank');
          }
        },
        // Adicionar onError para tratar erros
        onError: (error) => {
          showToast({
            title: 'Erro ao baixar cartilha',
            message: error.message || 'Erro desconhecido ao baixar a cartilha',
            type: NotificationType.ERROR,
            autoClose: true
          });
        }
      });
      
      // Executar a busca
      await downloadHook.fetchData();
    } catch (err) {
      // Tratar erros não capturados pelo hook
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao baixar a cartilha';
      
      showToast({
        title: 'Erro ao baixar cartilha',
        message: errorMessage,
        type: NotificationType.ERROR,
        autoClose: true
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Voltar para a página de cartilhas
  const handleBack = () => {
    navigate('/cartilhas');
  };
  
  if (isLoading) {
    return <Loading fullPage accessibilityLabel="Carregando cartilha..." />;
  }
  
  if (error || !guide) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Error
            title="Cartilha não encontrada"
            message="Não foi possível encontrar a cartilha solicitada. Ela pode ter sido removida ou o link está incorreto."
            variant="card"
            size="lg"
            onRetry={handleBack}
            retryText="Voltar para a lista de cartilhas"
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-4 flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para a lista de cartilhas
        </button>
        
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{guide.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-2">
            <div className="flex items-center">
              <span className="mr-1">🗓️</span>
              <span>Publicado em {formatDate(guide.publishedAt)}</span>
            </div>
            
            {guide.author && (
              <div className="flex items-center">
                <span className="mr-1">👤</span>
                <span>Por {guide.author}</span>
              </div>
            )}
            
            {guide.pageCount && (
              <div className="flex items-center">
                <span className="mr-1">📄</span>
                <span>{guide.pageCount} páginas</span>
              </div>
            )}
            
            {guide.fileSize && (
              <div className="flex items-center">
                <span className="mr-1">📦</span>
                <span>{guide.fileSize}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Imagem de capa */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-md">
          <img
            src={guide.coverImage}
            alt={`Capa de ${guide.title}`}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Descrição */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Sobre esta cartilha</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {guide.description}
          </p>
        </div>
        
        {/* Metadados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Categoria</h3>
            <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full">
              {guide.category}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Botão de download */}
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <Loading size="sm" variant="spinner" className="mr-2" />
                Baixando...
              </>
            ) : (
              <>
                <span className="mr-2">📥</span>
                Baixar Cartilha
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartilhaDetalhe; 