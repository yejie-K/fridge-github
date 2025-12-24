// 1. 生成简单 ID
export const generateId = () => Math.random().toString(36).substring(2, 11);

// 2. 计算存储天数
export const getDaysStored = (dateStr: string) => {
  const added = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - added.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
};

// 3. 格式化日期 (YYYYMMDD)
export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

// 4. 获取新鲜度颜色 (🎨 调色板优化：更柔和的低饱和度配色)
export const getFreshnessColor = (days: number) => {
  if (days <= 3) {
    // 新鲜：由原来的 Emerald 改为更自然的 Green，字色变深一点点以保证清晰度，背景极淡
    return { bg: 'bg-[#F0FDF4]', text: 'text-[#166534]', border: 'border-green-100', label: '新鲜' };
  }
  if (days <= 7) {
    // 良：由 Amber 改为 Orange，去掉了刺眼的黄色感
    return { bg: 'bg-[#FFF7ED]', text: 'text-[#9A3412]', border: 'border-orange-100', label: '良' };
  }
  // 久置：由 Rose 改为 Slate/Red 混合，降低警示感，增加高级感
  return { bg: 'bg-[#FEF2F2]', text: 'text-[#991B1B]', border: 'border-red-100', label: '久置' };
};