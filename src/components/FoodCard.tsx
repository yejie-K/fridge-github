import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MoreVertical, CalendarDays } from 'lucide-react';
import { FoodItem, CATEGORY_EMOJIS, CATEGORY_LABELS, CATEGORY_COLORS } from '../types';
import { formatDate } from '../utils/common';
import clsx from 'clsx';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  // Safe fallback for category color
  const colorClass = CATEGORY_COLORS[item.category] || 'bg-gray-100 text-gray-700 border-gray-200';
  
  // Calculate days stored
  const entryDate = new Date(item.entryTime);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - entryDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  return (
    <Link to={`/item/${item.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300 p-4 border border-transparent hover:border-primary/20 relative overflow-hidden">
        
        {/* Category Badge */}
        <div className={clsx("absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-medium border-b border-l", colorClass)}>
          {CATEGORY_LABELS[item.category]}
        </div>

        <div className="flex items-start space-x-4 mt-2">
          {/* Icon Box */}
          <div className={clsx("w-14 h-14 flex items-center justify-center text-3xl rounded-2xl shadow-inner border", colorClass)}>
            {CATEGORY_EMOJIS[item.category] || '📦'}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-lg truncate group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            
            <div className="flex items-center space-x-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                x {item.quantity}
              </span>
              
              <span className="text-xs text-gray-400 flex items-center">
                <CalendarDays size={12} className="mr-1" />
                已存 {diffDays} 天
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            <span>{formatDate(item.entryTime)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
