// Tipo base para cartilhas com campos comuns essenciais
export interface GuideBase {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
}

// Tipo para listagem de cartilhas (pode ter campos opcionais)
export interface GuideListItem extends GuideBase {
  fileSize?: string;
  pageCount?: number;
  downloadUrl?: string;
}

// Tipo completo de cartilha (com todos os campos possíveis)
export interface Guide extends GuideBase {
  downloadUrl: string;  // Obrigatório no tipo completo
  fileSize?: string;
  pageCount?: number;
  author?: string;
  lastUpdated?: string;
  featuredContent?: boolean;
}

// Função auxiliar para converter GuideListItem para Guide
export function convertToGuide(listItem: GuideListItem): Guide {
  return {
    ...listItem,
    downloadUrl: listItem.downloadUrl || '',
  };
}

// Tipo para o componente de card que aceita ambos os tipos
export type GuideCardType = Guide | (GuideListItem & { downloadUrl: string }); 