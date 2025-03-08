import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { Guide } from '../services/api/types';
import { ENDPOINTS } from '../services/api/config';
import { useNotifications } from '../services/notifications';
import { NotificationType } from '../services/notifications/types';
import { formatDate } from '../utils/formatters/dates';

const CartilhaDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useNotifications();
  
  const [guide, setGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Buscar detalhes da cartilha
  useEffect(() => {
    const fetchGuide = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const response = await apiService.get<Guide>(`${ENDPOINTS.RESOURCES.GUIDES}/${id}`);
        
        if (response.success && response.data) {
          setGuide(response.data);
        } else {
          throw new Error(response.message || 'Erro ao carregar cartilha');
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
        showToast({
          title: 'Erro ao carregar cartilha',
          message: err instanceof Error ? err.message : 'Erro desconhecido',
          type: NotificationType.ERROR,
          autoClose: true
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGuide();
  }, [id, showToast]);
  
  // Iniciar download da cartilha
  const handleDownload = async () => {
    if (!id || !guide) return;
    
    try {
      setIsDownloading(true);
      const response = await apiService.get<{ downloadUrl: string }>(`${ENDPOINTS.RESOURCES.GUIDES}/${id}/download`);
      
      if (response.success && response.data) {
        // Em um ambiente real, isso redirecionaria para o URL de download
        // ou abriria em uma nova aba
        window.open(response.data.downloadUrl, '_blank');
        
        showToast({
          title: 'Download iniciado',
          message: 'O download da cartilha foi iniciado com sucesso.',
          type: NotificationType.SUCCESS,
          autoClose: true
        });
      } else {
        throw new Error(response.message || 'Erro ao iniciar download');
      }
    } catch (err) {
      showToast({
        title: 'Erro ao baixar cartilha',
        message: err instanceof Error ? err.message : 'Erro desconhecido',
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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !guide) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Cartilha não encontrada</h1>
          <p className="text-gray-600 mb-6">
            Não foi possível encontrar a cartilha solicitada. Ela pode ter sido removida ou o link está incorreto.
          </p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Voltar para Cartilhas
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Botão de voltar */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <span aria-hidden="true" className="mr-1">←</span>
          Voltar para Cartilhas
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
                <span className="animate-spin mr-2">⟳</span>
                Iniciando download...
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