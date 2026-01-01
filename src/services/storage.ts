import { FoodItem } from '../types';

const STORAGE_KEYS = {
  FOOD_ITEMS: 'intelligent_fridge_items',
  SETTINGS: 'intelligent_fridge_settings'
};

export class LocalStorageService {
  // 获取所有食物项目
  static getFoodItems(): FoodItem[] {
    try {
      const items = localStorage.getItem(STORAGE_KEYS.FOOD_ITEMS);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  }

  // 添加新食物项目
  static addFoodItem(item: Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>): FoodItem {
    const newItem: FoodItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const items = this.getFoodItems();
    items.push(newItem);
    this.saveItems(items);
    
    return newItem;
  }

  // 更新食物项目
  static updateFoodItem(id: string, updates: Partial<FoodItem>): FoodItem | null {
    const items = this.getFoodItems();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    items[index] = {
      ...items[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    this.saveItems(items);
    return items[index];
  }

  // 删除食物项目
  static deleteFoodItem(id: string): boolean {
    const items = this.getFoodItems();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    this.saveItems(filteredItems);
    return true;
  }

  // 清空所有数据
  static clearAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.FOOD_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  }

  // Helper to save items
  static saveItems(items: FoodItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FOOD_ITEMS, JSON.stringify(items));
      // Dispatch a custom event to notify listeners of changes
      window.dispatchEvent(new Event('storage-update'));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}
