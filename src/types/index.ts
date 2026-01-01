export type Category = 
  | 'vegetable' 
  | 'fruit' 
  | 'meat' 
  | 'seafood' 
  | 'dairy' 
  | 'grain' 
  | 'drink' 
  | 'snack' 
  | 'cooked' 
  | 'other';

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  category: Category;
  entryTime: string; // ISO date string
  expiryTime?: string; // ISO date string
  createdAt: string;
  updatedAt: string;
  createdBy?: string; // Nickname of the user who added the item
}

export const CATEGORY_LABELS: Record<Category, string> = {
  vegetable: '蔬菜',
  fruit: '水果',
  meat: '肉禽',
  seafood: '海鲜',
  dairy: '蛋奶',
  grain: '主食',
  drink: '饮品',
  snack: '零食',
  cooked: '熟食',
  other: '其他',
};

export const CATEGORY_EMOJIS: Record<Category, string> = {
  vegetable: '🥬',
  fruit: '🍎',
  meat: '🥩',
  seafood: '🐟',
  dairy: '🥚',
  grain: '🍚',
  drink: '🥤',
  snack: '🍪',
  cooked: '🍲',
  other: '📦',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  vegetable: 'bg-green-100 text-green-700 border-green-200',
  fruit: 'bg-red-100 text-red-700 border-red-200',
  meat: 'bg-rose-100 text-rose-700 border-rose-200',
  seafood: 'bg-blue-100 text-blue-700 border-blue-200',
  dairy: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  grain: 'bg-orange-100 text-orange-700 border-orange-200',
  drink: 'bg-sky-100 text-sky-700 border-sky-200',
  snack: 'bg-purple-100 text-purple-700 border-purple-200',
  cooked: 'bg-amber-100 text-amber-700 border-amber-200',
  other: 'bg-gray-100 text-gray-700 border-gray-200',
};
