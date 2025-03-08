import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../design-system/components/Card/Card';
import { GuideCardType } from '../../types/guides';
import { formatDate } from '../../utils/formatters';

interface GuideCardProps {
  guide: GuideCardType;
  className?: string;
}

/**
 * Componente que exibe uma cartilha em formato de card
 * Inclui imagem de capa, título, descrição resumida e metadados
 */
export const GuideCard: React.FC<GuideCardProps> = ({ guide, className = '' }) => {
  const {
    id,
    title,
    description,
    coverImage,
    category,
    tags,
    publishedAt,
    pageCount,
    fileSize
  } = guide;

  // Formatar data de publicação
  const formattedDate = formatDate(publishedAt);
  
  // Limitar descrição a um número específico de caracteres
  const truncatedDescription = description.length > 120
    ? `${description.substring(0, 120)}...`
    : description;

  return (
    <Link to={`/cartilhas/${id}`} className="block">
      <Card 
        variant="elevated" 
        padding="normal" 
        interactive={true} 
        className={`h-full transition-all hover-lift ${className}`}
      >
        {/* Imagem de capa */}
        <div className="relative mb-3 overflow-hidden rounded-md aspect-[4/3]">
          <img 
            src={coverImage} 
            alt={`Capa de ${title}`} 
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          
          {/* Badge de categoria */}
          <span className="absolute px-2 py-1 text-xs font-medium text-white rounded-md top-2 right-2 bg-primary-600">
            {category}
          </span>
        </div>
        
        {/* Conteúdo */}
        <div className="flex flex-col flex-grow">
          <h3 className="mb-2 text-lg font-bold transition-colors text-gray-800 group-hover:text-primary-600">
            {title}
          </h3>
          
          <p className="mb-4 text-sm text-gray-600">
            {truncatedDescription}
          </p>
          
          {/* Metadados */}
          <div className="flex flex-wrap mt-auto gap-y-2">
            <div className="flex items-center mr-4 text-xs text-gray-500">
              <span className="mr-1">🗓️</span>
              <span>{formattedDate}</span>
            </div>
            
            {pageCount && (
              <div className="flex items-center mr-4 text-xs text-gray-500">
                <span className="mr-1">📄</span>
                <span>{pageCount} páginas</span>
              </div>
            )}
            
            {fileSize && (
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-1">📦</span>
                <span>{fileSize}</span>
              </div>
            )}
          </div>
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default GuideCard; 