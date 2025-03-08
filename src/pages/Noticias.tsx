import React from 'react';
import { useDataFetching } from '../hooks/useDataFetching';
import { Loading } from '../design-system/components/ui/Loading';
import { Error } from '../design-system/components/ui/Error';
import { Empty } from '../design-system/components/ui/Empty';

interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  imagem: string;
  data: string;
  categoria: string;
  link: string;
}

const Noticias = () => {
  const { data: noticias, isLoading, error, refetch } = useDataFetching<Noticia[]>({
    endpoint: '/api/noticias',
    fallbackData: []
  });

  if (isLoading) {
    return <Loading message="Carregando notícias..." />;
  }

  if (error) {
    return (
      <Error 
        message="Não foi possível carregar as notícias"
        onAction={refetch}
      />
    );
  }

  const noticiasData = noticias || [];

  if (noticiasData.length === 0) {
    return (
      <Empty 
        message="Nenhuma notícia encontrada" 
        description="No momento não há notícias disponíveis. Volte em breve para novidades."
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-h1 mb-8">OCTO Notícias</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {noticiasData.map((noticia) => (
          <div 
            key={noticia.id} 
            className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img 
                src={noticia.imagem} 
                alt={noticia.titulo} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-primary-600/80 px-3 py-1">
                <span className="text-caption text-white">{noticia.categoria}</span>
              </div>
            </div>
            
            <div className="p-5">
              <span className="text-caption text-muted block mb-2">
                {new Date(noticia.data).toLocaleDateString('pt-BR')}
              </span>
              
              <h2 className="text-h4 mb-3">{noticia.titulo}</h2>
              
              <p className="text-body mb-4">{noticia.resumo}</p>
              
              <a 
                href={noticia.link} 
                className="text-link inline-flex items-center"
              >
                Leia mais
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Noticias;