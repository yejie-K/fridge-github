import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useFoodItems } from '../hooks/useFoodItems';
import { Category, CATEGORY_LABELS, CATEGORY_EMOJIS, FoodItem } from '../types';
import { ArrowLeft, Trash2, Save, Calendar } from 'lucide-react';
import { formatDate } from '../utils/common';
import clsx from 'clsx';

export const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, updateItem, deleteItem } = useFoodItems();
  const [item, setItem] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState<Partial<FoodItem>>({});
  
  useEffect(() => {
    if (id) {
      const foundItem = items.find(i => i.id === id);
      if (foundItem) {
        setItem(foundItem);
        setFormData(foundItem);
      } else if (items.length > 0) {
        // Only redirect if items are loaded but id not found
        // navigate('/'); 
      }
    }
  }, [id, items, navigate]);

  const handleSave = () => {
    if (id && formData) {
      updateItem(id, formData);
      navigate(-1);
    }
  };

  const handleDelete = () => {
    if (id && window.confirm('确定要删除这个食物吗？')) {
      deleteItem(id);
      navigate('/');
    }
  };

  if (!item) return <Layout><div className="p-4">加载中或未找到...</div></Layout>;

  const categories: Category[] = ['seafood', 'meat', 'vegetable', 'other'];

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-1" />
          返回
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="text-6xl bg-gray-50 p-6 rounded-full">
              {CATEGORY_EMOJIS[formData.category as Category] || '📦'}
            </div>
          </div>

          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">食物名称</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xl font-bold border-b-2 border-gray-200 focus:border-primary outline-none py-2 bg-transparent"
              />
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">数量</label>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, quantity: Math.max(1, (prev.quantity || 1) - 1) }))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600"
                >
                  -
                </button>
                <span className="text-2xl font-medium w-12 text-center">{formData.quantity}</span>
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, quantity: (prev.quantity || 1) + 1 }))}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={clsx(
                      "flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border transition-all",
                      formData.category === cat
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    )}
                  >
                    <span>{CATEGORY_EMOJIS[cat]}</span>
                    <span>{CATEGORY_LABELS[cat]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Entry Time Info */}
            <div className="pt-4 border-t border-gray-100 text-sm text-gray-500 flex items-center">
              <Calendar size={16} className="mr-2" />
              入库时间: {item.entryTime ? formatDate(item.entryTime) : '-'}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSave}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-medium shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center"
            >
              <Save size={20} className="mr-2" />
              保存修改
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
