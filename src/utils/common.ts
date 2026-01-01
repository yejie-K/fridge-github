import { Category, FoodItem } from '../types';

const CATEGORY_KEYWORDS = {
  seafood: ['鱼', '虾', '蟹', '贝', '海鲜', '海带', '紫菜', '鱿鱼', '章鱼', '蛤', '螺', '蚝'],
  meat: ['肉', '鸡', '鸭', '牛', '羊', '猪', '火腿', '香肠', '培根', '排骨', '翅', '腿'],
  vegetable: ['菜', '萝卜', '土豆', '番茄', '黄瓜', '葱', '姜', '蒜', '茄子', '椒', '菇', '笋', '豆', '藕', '芹', '菠菜', '西兰花', '玉米', '南瓜', '冬瓜'],
  fruit: ['果', '蕉', '梨', '桃', '橘', '橙', '瓜', '葡萄', '莓', '枣', '柚', '柿', '榴莲', '芒'],
  dairy: ['奶', '蛋', '酪', '黄油', '乳'],
  grain: ['米', '面', '粉', '饼', '包', '馒头', '饺子', '馄饨', '燕麦', '薯'],
  drink: ['水', '汁', '茶', '酒', '乐', '碧', '奶茶', '咖啡'],
  snack: ['糖', '巧克', '薯片', '干', '条', '糕', '冻', '冰淇淋'],
  cooked: ['剩', '餐', '饭', '炒', '炖', '汤', '煲']
} as const;

export function classifyFood(foodName: string): Category {
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => foodName.includes(keyword))) {
      return category as Category;
    }
  }
  return 'other';
}

export function parseFoodInfo(text: string): { name: string; quantity: number } | null {
  if (!text || !text.trim()) return null;

  // Filter out common filler words and invalid inputs
  const invalidWords = ['嗯', '啊', '哦', '呃', '那个', '这个', '喂', 'hello', 'hi', '你好'];
  // Also check if text is too short or just punctuation
  const cleanText = text.replace(/[，。！？,.!?\s]/g, '');
  
  if (cleanText.length < 1 || invalidWords.includes(cleanText)) {
    return null;
  }

  // Extract number (default to 1 if not found)
  // Support chinese numbers could be complex, sticking to digits for now or simple mapping if needed
  // For MVP, we assume digits or "一" to "十" mapping could be added later
  
  const quantityMatch = text.match(/(\d+)/);
  const quantity = quantityMatch ? parseInt(quantityMatch[1], 10) : 1;
  
  // Remove numbers and common quantifiers to get the name
  // Remove punctuation
  let name = text
    .replace(/\d+/g, '')
    .replace(/[个只条包盒瓶斤两kg g]/g, '')
    .replace(/[，。！？,.!?]/g, '')
    .trim();
    
  // Final validation on extracted name
  if (!name || name.length === 0 || invalidWords.includes(name)) {
    return null;
  }
  
  return { name, quantity };
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}
