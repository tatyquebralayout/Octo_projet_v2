/**
 * Hook para gerenciar o perfil do usuário
 */
import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';
import { ProfileUpdateRequest, UserProfile } from '../services/api/types';

/**
 * Hook que fornece funcionalidades para gerenciar o perfil do usuário
 */
export const useProfile = () => {
  const { authState } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega os dados do perfil do usuário
   */
  const loadProfile = useCallback(async () => {
    // Se não estiver autenticado, não faz nada
    if (!authState.isAuthenticated) {
      setProfile(null);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authService.getProfile();
      
      if (response.success && response.data) {
        setProfile(response.data as UserProfile);
        return response.data;
      } else {
        throw new Error(response.message || 'Falha ao carregar perfil');
      }
    } catch (error: any) {
      const message = error.message || 'Erro ao carregar perfil';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [authState.isAuthenticated]);

  /**
   * Atualiza os dados do perfil do usuário
   */
  const updateProfile = useCallback(async (data: ProfileUpdateRequest) => {
    // Se não estiver autenticado, não faz nada
    if (!authState.isAuthenticated) {
      setError('Usuário não autenticado');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authService.updateProfile(data);
      
      if (response.success && response.data) {
        setProfile(prev => prev ? { ...prev, ...response.data } : response.data);
        return true;
      } else {
        throw new Error(response.message || 'Falha ao atualizar perfil');
      }
    } catch (error: any) {
      const message = error.message || 'Erro ao atualizar perfil';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [authState.isAuthenticated]);

  return {
    profile,
    loading,
    error,
    loadProfile,
    updateProfile
  };
};

export default useProfile; 