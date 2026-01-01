import { FoodItem } from '../types';
import { supabase, isSupabaseEnabled } from '../lib/supabase';
import { LocalStorageService } from './storage';

const TABLE = 'food_items';

export class FoodService {
  static async list(): Promise<FoodItem[]> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase
        .from(TABLE)
        .select('*')
        .order('entryTime', { ascending: false });
      if (error) {
        console.warn('Supabase list error, falling back to local:', error.message);
        return LocalStorageService.getFoodItems();
      }
      return (data ?? []) as FoodItem[];
    }
    return LocalStorageService.getFoodItems();
  }

  static async create(item: Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<FoodItem> {
    if (isSupabaseEnabled && supabase) {
      // Get current user nickname from local storage (set during login)
      const nickname = localStorage.getItem('user_nickname') || undefined;
      
      const payload: FoodItem = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: nickname,
      };
      const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
      if (error || !data) {
        console.warn('Supabase create error, using local:', error?.message);
        return LocalStorageService.addFoodItem(item);
      }
      return data as FoodItem;
    }
    return LocalStorageService.addFoodItem(item);
  }

  static async update(id: string, updates: Partial<FoodItem>): Promise<FoodItem | null> {
    if (isSupabaseEnabled && supabase) {
      const { data, error } = await supabase
        .from(TABLE)
        .update({ ...updates, updatedAt: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) {
        console.warn('Supabase update error, using local:', error.message);
        return LocalStorageService.updateFoodItem(id, updates);
      }
      return (data as FoodItem) ?? null;
    }
    return LocalStorageService.updateFoodItem(id, updates);
  }

  static async remove(id: string): Promise<boolean> {
    if (isSupabaseEnabled && supabase) {
      const { error } = await supabase.from(TABLE).delete().eq('id', id);
      if (error) {
        console.warn('Supabase delete error, using local:', error.message);
        return LocalStorageService.deleteFoodItem(id);
      }
      return true;
    }
    return LocalStorageService.deleteFoodItem(id);
  }
}

