import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-primary mb-4">Página não encontrada</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}; 