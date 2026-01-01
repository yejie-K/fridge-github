import { LocalStorageService } from './storage';
import { FoodItem } from '../types';

const STORAGE_KEYS = {
  FOOD_ITEMS: 'intelligent_fridge_items',
};

export class DataBackupService {
  // 导出数据为JSON文件
  static exportData(): void {
    const items = LocalStorageService.getFoodItems();
    const dataStr = JSON.stringify(items, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `fridge_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  }

  // 从JSON文件导入数据
  static importData(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const items = JSON.parse(content);
          
          // Basic validation
          if (!Array.isArray(items)) {
            throw new Error('Invalid data format: expected array');
          }
          
          // Save to local storage
          localStorage.setItem(STORAGE_KEYS.FOOD_ITEMS, JSON.stringify(items));
          // Trigger update event
          window.dispatchEvent(new Event('storage-update'));
          resolve();
        } catch (error) {
          reject(new Error('文件格式错误或数据无效'));
        }
      };
      reader.onerror = () => reject(new Error('读取文件失败'));
      reader.readAsText(file);
    });
  }
}
