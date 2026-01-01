import { useState, useEffect, useCallback } from 'react';
import { FoodItem } from '../types';
import { LocalStorageService } from '../services/storage';

export function useFoodItems() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(() => {
    const data = LocalStorageService.getFoodItems();
    // Sort by entry time descending (newest first)
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

  const addItem = useCallback((item: Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    return LocalStorageService.addFoodItem(item);
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<FoodItem>) => {
    return LocalStorageService.updateFoodItem(id, updates);
  }, []);

  const deleteItem = useCallback((id: string) => {
    return LocalStorageService.deleteFoodItem(id);
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
