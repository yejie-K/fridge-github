import { useState, useEffect, useCallback } from 'react';
import { FoodItem } from '../types';
import { FoodService } from '../services/food';

export function useFoodItems() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    const data = await FoodService.list();
    data.sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime());
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();

    const handleStorageUpdate = () => {
      fetchItems();
    };

    // Listen for custom event from LocalStorageService
    window.addEventListener('storage-update', handleStorageUpdate);
    // Also listen for storage events from other tabs
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage-update', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [fetchItems]);

  const addItem = useCallback(async (item: Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    return FoodService.create(item);
  }, []);

  const updateItem = useCallback(async (id: string, updates: Partial<FoodItem>) => {
    return FoodService.update(id, updates);
  }, []);

  const deleteItem = useCallback(async (id: string) => {
    return FoodService.remove(id);
  }, []);

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    refresh: fetchItems
  };
}
