const Loading = () => {
  return (
    <div 
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-label="Carregando conteúdo"
    >
      <div 
        className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-400"
        aria-hidden="true"
      />
      <span className="sr-only">Carregando...</span>
    </div>
  );
};

export default Loading;