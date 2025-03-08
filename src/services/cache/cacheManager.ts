/**
 * Gerenciador principal do sistema de cache
 * Centraliza a lógica de cache, persistência e expiração
 */
import { 
  CacheConfig, 
  StorageType, 
  CacheItem, 
  CacheMetadata, 
  CacheOptions, 
  CacheResult,
  CacheEvent,
  CacheEventType,
  CacheEventListener
} from './types';
import { CACHE_CONFIG, CACHE_SCHEMA_VERSION, NON_CACHEABLE_ENDPOINTS } from './config';
import { StorageFactory, StorageAdapter, isStorageAvailable } from './storageManager';
import { createHash } from './utils';

/**
 * Classe principal do gerenciador de cache
 */
export class CacheManager {
  private config: CacheConfig;
  private storage: StorageAdapter;
  private eventListeners: CacheEventListener[] = [];
  private networkStatus: boolean = navigator.onLine;

  constructor(config: Partial<CacheConfig> = {}) {
    // Mesclar configuração padrão com as opções fornecidas
    this.config = {
      ...CACHE_CONFIG,
      ...config,
    };

    // Inicializar o adaptador de armazenamento preferido
    // Com fallback para outros métodos se o preferido não estiver disponível
    this.initStorage();

    // Registrar ouvintes para eventos de rede
    this.setupNetworkListeners();
  }

  /**
   * Inicializa o armazenamento com fallback
   */
  private initStorage(): void {
    const { defaultStorage } = this.config;

    // Verificar se o armazenamento preferido está disponível
    if (isStorageAvailable(defaultStorage)) {
      this.storage = StorageFactory.createStorage(defaultStorage, this.config);
    } 
    // Tentar IndexedDB como segunda opção
    else if (defaultStorage !== StorageType.INDEXED_DB && isStorageAvailable(StorageType.INDEXED_DB)) {
      console.warn(`Armazenamento ${defaultStorage} não disponível. Usando IndexedDB.`);
      this.storage = StorageFactory.createStorage(StorageType.INDEXED_DB, this.config);
    } 
    // Tentar localStorage como terceira opção
    else if (defaultStorage !== StorageType.LOCAL_STORAGE && isStorageAvailable(StorageType.LOCAL_STORAGE)) {
      console.warn(`Armazenamento ${defaultStorage} e IndexedDB não disponíveis. Usando localStorage.`);
      this.storage = StorageFactory.createStorage(StorageType.LOCAL_STORAGE, this.config);
    } 
    // Memória como última opção
    else {
      console.warn('Nenhum armazenamento persistente disponível. Usando memória.');
      this.storage = StorageFactory.createStorage(StorageType.MEMORY, this.config);
    }
  }

  /**
   * Configura listeners para eventos de rede
   */
  private setupNetworkListeners(): void {
    // Atualizar status de rede quando mudar
    window.addEventListener('online', this.handleNetworkChange.bind(this));
    window.addEventListener('offline', this.handleNetworkChange.bind(this));
  }

  /**
   * Manipulador de eventos de mudança na conectividade
   */
  private handleNetworkChange(): void {
    const wasOnline = this.networkStatus;
    this.networkStatus = navigator.onLine;

    // Se reconectou, verificar sincronização
    if (!wasOnline && this.networkStatus) {
      this.emit({
        type: CacheEventType.SYNC_STARTED,
        timestamp: Date.now()
      });

      // Aqui poderia iniciar a sincronização de dados offline
      // this.syncQueue.process();
    }
  }

  /**
   * Verifica se um endpoint é cacheável
   */
  private isCacheable(url: string): boolean {
    // Verificar se o endpoint está na lista de não cacheáveis
    return !NON_CACHEABLE_ENDPOINTS.some(endpoint => url.includes(endpoint));
  }

  /**
   * Gera uma chave de cache para um URL e parâmetros
   */
  private generateCacheKey(url: string, params?: any): string {
    // Gerar hash único para a combinação de URL e parâmetros
    return createHash(url, params);
  }

  /**
   * Cria metadados para um item de cache
   */
  private createMetadata(key: string, options?: CacheOptions): CacheMetadata {
    const now = Date.now();
    const expiresIn = options?.expiresIn || this.config.defaultExpiryTime;
    
    return {
      key,
      hash: this.generateCacheKey(key, options),
      timestamp: now,
      expiresAt: now + expiresIn,
      version: options?.version || CACHE_SCHEMA_VERSION,
      updating: false
    };
  }

  /**
   * Verifica se um item do cache é válido (não expirou)
   */
  private isValid(metadata: CacheMetadata): boolean {
    return Date.now() < metadata.expiresAt;
  }

  /**
   * Estende o tempo de expiração de um item
   */
  private extendExpiry(metadata: CacheMetadata, expiresIn?: number): CacheMetadata {
    const extendTime = expiresIn || this.config.defaultExpiryTime;
    return {
      ...metadata,
      expiresAt: Date.now() + extendTime
    };
  }

  /**
   * Emite um evento para todos os listeners registrados
   */
  private emit(event: CacheEvent): void {
    this.eventListeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('Erro em listener de evento de cache:', error);
      }
    });
  }

  /**
   * Adiciona um listener para eventos de cache
   */
  public addEventListener(listener: CacheEventListener): void {
    this.eventListeners.push(listener);
  }

  /**
   * Remove um listener para eventos de cache
   */
  public removeEventListener(listener: CacheEventListener): void {
    const index = this.eventListeners.indexOf(listener);
    if (index !== -1) {
      this.eventListeners.splice(index, 1);
    }
  }

  /**
   * Obtém um item do cache
   */
  public async get<T>(key: string, options?: CacheOptions): Promise<CacheResult<T> | null> {
    // Não usar cache se estiver desabilitado
    if (this.config.disabled) {
      return null;
    }

    const hash = this.generateCacheKey(key, options);
    const cacheItem = await this.storage.get<T>(hash);
    
    // Não encontrado no cache
    if (!cacheItem) {
      return null;
    }

    // Verificar se a versão é compatível
    const requiredVersion = options?.version || CACHE_SCHEMA_VERSION;
    if (cacheItem.metadata.version !== requiredVersion) {
      await this.remove(hash);
      return null;
    }

    // Verificar validade
    const isItemValid = this.isValid(cacheItem.metadata);

    // Estender expiração se necessário
    if (isItemValid && options?.extendOnAccess) {
      cacheItem.metadata = this.extendExpiry(
        cacheItem.metadata, 
        options.expiresIn
      );
      await this.storage.set(hash, cacheItem);
    }

    // Remover automaticamente se expirado e configurado para auto-remoção
    if (!isItemValid && options?.autoRemove) {
      await this.remove(hash);
      return null;
    }

    // Retornar resultado com metadados
    return {
      data: cacheItem.data,
      fromCache: true,
      expiresAt: cacheItem.metadata.expiresAt,
      metadata: cacheItem.metadata
    };
  }

  /**
   * Armazena um item no cache
   */
  public async set<T>(key: string, data: T, options?: CacheOptions): Promise<void> {
    // Não usar cache se estiver desabilitado ou o endpoint não for cacheável
    if (this.config.disabled || !this.isCacheable(key)) {
      return;
    }

    const hash = this.generateCacheKey(key, options);
    const metadata = this.createMetadata(key, options);

    const cacheItem: CacheItem<T> = {
      data,
      metadata
    };

    await this.storage.set(hash, cacheItem);

    // Emitir evento de item adicionado
    this.emit({
      type: CacheEventType.ITEM_ADDED,
      key,
      timestamp: Date.now(),
      metadata,
      tags: options?.tags
    });
  }

  /**
   * Remove um item do cache
   */
  public async remove(key: string): Promise<void> {
    await this.storage.remove(key);

    // Emitir evento de item removido
    this.emit({
      type: CacheEventType.ITEM_REMOVED,
      key,
      timestamp: Date.now()
    });
  }

  /**
   * Limpa todo o cache
   */
  public async clear(): Promise<void> {
    await this.storage.clear();

    // Emitir evento de cache limpo
    this.emit({
      type: CacheEventType.CACHE_CLEARED,
      timestamp: Date.now()
    });
  }

  /**
   * Invalida itens por tags
   */
  public async invalidateByTags(tags: string[]): Promise<void> {
    const keys = await this.storage.keys();
    
    for (const key of keys) {
      const item = await this.storage.get(key);
      
      if (item && item.metadata && item.metadata.tags) {
        const itemTags = item.metadata.tags as string[];
        
        // Se houver interseção entre as tags
        if (tags.some(tag => itemTags.includes(tag))) {
          await this.remove(key);
        }
      }
    }
  }

  /**
   * Obtém ou busca dados aplicando a lógica de cache
   * @param key Chave para o cache (geralmente URL)
   * @param fetchFn Função para buscar dados quando não estiverem em cache ou forem inválidos
   * @param options Opções de cache
   */
  public async getOrFetch<T>(
    key: string, 
    fetchFn: () => Promise<T>, 
    options?: CacheOptions
  ): Promise<CacheResult<T>> {
    // Se estiver offline e não for forçada a atualização, tenta buscar do cache
    // mesmo que tenha expirado
    if (!this.networkStatus && !options?.forceRefresh) {
      const cachedData = await this.get<T>(key, { ...options, autoRemove: false });
      if (cachedData) {
        return cachedData;
      }
    }

    // Verificar cache
    const cachedResult = await this.get<T>(key, options);
    
    // Se forçar atualização, ignorar cache
    if (options?.forceRefresh) {
      return this.fetchAndCache(key, fetchFn, options);
    }
    
    // Se tiver em cache e for válido, retornar
    if (cachedResult && this.isValid(cachedResult.metadata!)) {
      // Se configurado para revalidar em segundo plano
      if (options?.staleWhileRevalidate) {
        // Não esperar a conclusão para não bloquear a UI
        this.revalidateInBackground(key, fetchFn, options);
      }
      
      return cachedResult;
    }
    
    // Buscar dados frescos
    return this.fetchAndCache(key, fetchFn, options);
  }

  /**
   * Revalida dados em segundo plano
   */
  private async revalidateInBackground<T>(
    key: string, 
    fetchFn: () => Promise<T>, 
    options?: CacheOptions
  ): Promise<void> {
    try {
      // Marcar como atualizando
      const hash = this.generateCacheKey(key, options);
      const cacheItem = await this.storage.get<T>(hash);
      
      if (cacheItem) {
        cacheItem.metadata.updating = true;
        await this.storage.set(hash, cacheItem);
      }
      
      // Buscar novos dados
      const result = await fetchFn();
      
      // Salvar no cache
      await this.set(key, result, options);
    } catch (error) {
      console.error(`Erro ao revalidar em segundo plano: ${key}`, error);
      
      // Emitir evento de erro
      this.emit({
        type: CacheEventType.ERROR,
        key,
        timestamp: Date.now(),
        error
      });
    }
  }

  /**
   * Busca dados e armazena no cache
   */
  private async fetchAndCache<T>(
    key: string, 
    fetchFn: () => Promise<T>, 
    options?: CacheOptions
  ): Promise<CacheResult<T>> {
    try {
      // Buscar dados
      const result = await fetchFn();
      
      // Salvar no cache
      await this.set(key, result, options);
      
      // Criar metadados para o resultado
      const metadata = this.createMetadata(key, options);
      
      return {
        data: result,
        fromCache: false,
        expiresAt: metadata.expiresAt,
        metadata
      };
    } catch (error) {
      // Emitir evento de erro
      this.emit({
        type: CacheEventType.ERROR,
        key,
        timestamp: Date.now(),
        error
      });
      
      // Se estiver offline, tentar obter dados do cache mesmo que expirados
      if (!this.networkStatus) {
        const expiredData = await this.get<T>(key, { ...options, autoRemove: false });
        if (expiredData) {
          return {
            ...expiredData,
            fromCache: true,
            revalidated: false
          };
        }
      }
      
      // Repassar o erro
      throw error;
    }
  }

  /**
   * Verifica o status da rede
   */
  public isOnline(): boolean {
    return this.networkStatus;
  }

  /**
   * Obtém informações sobre o cache
   */
  public async getStats(): Promise<{
    size: number;
    itemCount: number;
    storageType: StorageType;
  }> {
    const keys = await this.storage.keys();
    const size = await this.storage.size();
    
    return {
      size,
      itemCount: keys.length,
      storageType: this.config.defaultStorage
    };
  }
}

/**
 * Instância singleton do gerenciador de cache
 */
export const cacheManager = new CacheManager(); 