import { useState, useEffect, useCallback, useRef } from 'react';
import { FoodItem } from '../types';
import { FoodService } from '../services/food';
import { LocalStorageService } from '../services/storage';

export function useFoodItems() {
  // Initialize with local cache immediately
  const [items, setItems] = useState<FoodItem[]>(() => {
    const cached = LocalStorageService.getFoodItems();
    return cached.sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime());
  });
  
  // Track if we are currently loading fresh data
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    // If we have no items, show loading state. If we have cache, don't show loading spinner (silent update)
    if (items.length === 0) {
      setLoading(true);
    }
    
    try {
      const data = await FoodService.list();
      data.sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime());
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, []); // Remove items dependency to avoid loops

  useEffect(() => {
    fetchItems();

    const handleStorageUpdate = () => {
      // Reload from local storage when it changes (e.g. from other tabs or background sync)
      const data = LocalStorageService.getFoodItems();
      data.sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime());
      setItems(data);
    };

    window.addEventListener('storage-update', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage-update', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [fetchItems]);

  const addItem = useCallback(async (item: Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    // 1. Optimistic Update: Create a temporary item and add it immediately
    const tempId = `temp-${Date.now()}`;
    const nickname = localStorage.getItem('user_nickname') || undefined;
    
    const tempItem: FoodItem = {
      ...item,
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: nickname,
    };

    setItems(prev => [tempItem, ...prev]);

    try {
      // 2. Perform actual API call
      const createdItem = await FoodService.create(item);
      
      // 3. Replace temp item with real item
      setItems(prev => prev.map(i => i.id === tempId ? createdItem : i));
      
      // Update local cache manually to ensure it stays in sync
      const currentItems = LocalStorageService.getFoodItems();
      // Remove temp if it somehow got saved, add real one
      const cleanItems = [createdItem, ...currentItems.filter(i => i.id !== tempId && i.id !== createdItem.id)];
      LocalStorageService.saveItems(cleanItems);
      
      return createdItem;
    } catch (error) {
      // 4. Rollback on error
      console.error('Failed to add item:', error);
      setItems(prev => prev.filter(i => i.id !== tempId));
      throw error;
    }
  }, []);

  const updateItem = useCallback(async (id: string, updates: Partial<FoodItem>) => {
    // 1. Snapshot previous state for rollback
    const prevItems = [...items];
    const targetItem = items.find(i => i.id === id);
    if (!targetItem) return null;

    // 2. Optimistic Update
    const optimisticItem = { ...targetItem, ...updates, updatedAt: new Date().toISOString() };
    setItems(prev => prev.map(i => i.id === id ? optimisticItem : i));

    try {
      // 3. API Call
      const updated = await FoodService.update(id, updates);
      
      if (updated) {
        // Confirm update with server data
        setItems(prev => prev.map(i => i.id === id ? updated : i));
        
        // Sync cache
        const currentItems = LocalStorageService.getFoodItems();
        const newCache = currentItems.map(i => i.id === id ? updated : i);
        LocalStorageService.saveItems(newCache);
        
        return updated;
      } else {
        throw new Error('Update returned null');
      }
    } catch (error) {
      // 4. Rollback
      console.error('Failed to update item:', error);
      setItems(prevItems);
      return null;
    }
  }, [items]);

  const deleteItem = useCallback(async (id: string) => {
    // 1. Snapshot
    const prevItems = [...items];
    
    // 2. Optimistic Update
    setItems(prev => prev.filter(i => i.id !== id));

    try {
      // 3. API Call
      const success = await FoodService.remove(id);
      if (!success) throw new Error('Delete failed');
      
      // Sync cache
      const currentItems = LocalStorageService.getFoodItems();
      const newCache = currentItems.filter(i => i.id !== id);
      LocalStorageService.saveItems(newCache);
      
      return true;
    } catch (error) {
      // 4. Rollback
      console.error('Failed to delete item:', error);
      setItems(prevItems);
      return false;
    }
  }, [items]);

  return {
    items,
    loading,
    addItem,
    updateItem,
    deleteItem,
    refresh: fetchItems
  };
}
