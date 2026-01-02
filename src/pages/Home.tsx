import React, { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { InputSection } from '../components/InputSection';
import { FoodCard } from '../components/FoodCard';
import { useFoodItems } from '../hooks/useFoodItems';
import { Category, CATEGORY_LABELS, CATEGORY_EMOJIS, FoodItem } from '../types';
import clsx from 'clsx';
import { Search, AlertTriangle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { items, loading } = useFoodItems();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 智能过期检测 (3天内过期)
  const expiringItems = useMemo(() => {
    const now = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(now.getDate() + 3);

    return items.filter(item => {
      if (!item.expiryTime) return false;
      const expiry = new Date(item.expiryTime);
      return expiry <= threeDaysLater && expiry >= new Date(new Date().setDate(now.getDate() - 1)); // 包含今天过期和未来3天
    }).sort((a, b) => new Date(a.expiryTime!).getTime() - new Date(b.expiryTime!).getTime());
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const categories: (Category | 'all')[] = [
    'all', 
    'vegetable', 
    'fruit', 
    'meat', 
    'seafood', 
    'dairy', 
    'grain', 
    'drink', 
    'snack', 
    'cooked', 
    'other'
  ];

  return (
    <Layout>
      {/* 🚨 智能过期看板 (仅当有即将过期物品时显示) */}
      {expiringItems.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-100 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-red-700 font-bold">
              <AlertTriangle className="w-5 h-5 mr-2 animate-pulse" />
              急需处理 ({expiringItems.length})
            </div>
            <Link to="/stats" className="text-xs text-red-500 flex items-center hover:underline">
              查看全部 <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
            {expiringItems.slice(0, 5).map(item => (
              <div key={item.id} className="flex-shrink-0 w-24 bg-white rounded-xl p-2 shadow-sm border border-red-100 relative">
                <div className="text-2xl mb-1 text-center">{CATEGORY_EMOJIS[item.category]}</div>
                <div className="text-xs font-medium text-gray-800 truncate text-center">{item.name}</div>
                <div className="text-[10px] text-red-500 text-center font-medium mt-1">
                  {new Date(item.expiryTime!).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })} 到期
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <InputSection />

      {/* Search Bar */}
      <div className="relative mb-4 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400 group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="搜索食物..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm transition-all shadow-sm hover:shadow-md"
        />
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border",
              selectedCategory === cat
                ? "bg-primary text-white border-primary shadow-md transform scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            )}
          >
            {cat === 'all' ? '全部' : `${CATEGORY_EMOJIS[cat as Category]} ${CATEGORY_LABELS[cat as Category]}`}
          </button>
        ))}
      </div>

      {/* Food List */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">加载中...</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">🧊</div>
          <p className="text-gray-500">冰箱空空如也</p>
          <p className="text-gray-400 text-sm mt-1">试试点击麦克风添加食物吧</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </Layout>
  );
};
