import { useState, useCallback, useEffect } from 'react';
import { getElements } from '../services/listService';
import type { RemoteItem } from '../types/remote';

export const useList = () => {
  const [items, setItems] = useState<RemoteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getElements();
      setItems(data || []);
    } catch (err) {
      setItems([]);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const retry = useCallback(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return {
    items,
    loading,
    error,
    loadItems,
    clearError,
    retry,
  };
};
