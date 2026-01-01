import React, { useState, useMemo } from 'react';
import { Layout } from '../components/Layout';
import { InputSection } from '../components/InputSection';
import { FoodCard } from '../components/FoodCard';
import { useFoodItems } from '../hooks/useFoodItems';
import { Category, CATEGORY_LABELS, CATEGORY_EMOJIS } from '../types';
import clsx from 'clsx';
import { Search } from 'lucide-react';

export const Home: React.FC = () => {
  const { items, loading } = useFoodItems();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      <InputSection />

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
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
