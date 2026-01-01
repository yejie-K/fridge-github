import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Category, InventoryItem } from '../../types'
import { ICON_MAP } from '../../constants/icons'
import { generateId } from '../../utils/common'
import { InventoryItemCard } from '../../components/InventoryItemCard'
import { AddItemModal } from '../../components/AddItemModal'
import './index.scss'

const STORAGE_KEY = 'smart-fridge-inventory-v2'

export default function Index() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [filterCategory, setFilterCategory] = useState<Category | 'ALL'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [showTrash, setShowTrash] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 加载数据
  useEffect(() => {
    try {
      const saved = Taro.getStorageSync(STORAGE_KEY)
      if (saved && saved.length > 0) {
        setItems(saved)
      } else {
        setItems([
          { id: '1', name: '全脂牛奶', quantity: 1, unit: 'L', category: Category.OTHER, addedDate: new Date(Date.now() - 86400000 * 1).toISOString(), isDeleted: false },
          { id: '2', name: '基围虾', quantity: 20, unit: '只', category: Category.SEAFOOD, addedDate: new Date(Date.now() - 86400000 * 0).toISOString(), isDeleted: false },
          { id: '3', name: '上海青', quantity: 3, unit: '把', category: Category.VEGETABLE, addedDate: new Date(Date.now() - 86400000 * 4).toISOString(), isDeleted: false },
          { id: '4', name: '澳洲牛排', quantity: 2, unit: '块', category: Category.MEAT, addedDate: new Date(Date.now() - 86400000 * 8).toISOString(), isDeleted: false },
        ])
      }
    } catch (e) {
      console.error("Failed to load inventory", e)
    }
  }, [])

  // 保存数据
  useEffect(() => {
    Taro.setStorageSync(STORAGE_KEY, items)
  }, [items])

  const handleAddItem = (newItem: Omit<InventoryItem, 'id' | 'addedDate' | 'isDeleted'>) => {
    const item: InventoryItem = {
      ...newItem,
      id: generateId(),
      addedDate: new Date().toISOString(),
      isDeleted: false
    }
    setItems(prev => [item, ...prev])
    Taro.showToast({ title: '已添加', icon: 'success' })
  }

  const moveToTrash = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isDeleted: true } : item))
    Taro.showToast({ title: '已回收', icon: 'none' })
  }

  const restoreFromTrash = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isDeleted: false } : item))
    Taro.showToast({ title: '已恢复', icon: 'success' })
  }

  const deleteForever = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const handleUpdateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }))
  }

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (showTrash) return item.isDeleted
      if (item.isDeleted) return false
      const matchesCategory = filterCategory === 'ALL' || item.category === filterCategory
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    }).sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
  }, [items, filterCategory, searchTerm, showTrash])

  return (
    <View className="min-h-screen bg-[#F6F7FB] pb-32 font-sans text-slate-900 animate-fade-in">
      
      {/* 🎨 UI升级：头部区域，增加高度和留白 */}
      <View className="bg-white sticky top-0 z-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] pb-2 rounded-b-[32px]">
        {/* 第一行：标题与开关 */}
        <View className="px-5 h-16 flex flex-row items-center justify-between mt-1">
          <View className="flex flex-row items-center gap-3">
            <View 
                onClick={() => setShowTrash(false)}
                className={`flex flex-row items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${!showTrash ? 'bg-slate-900 shadow-lg shadow-slate-200 scale-105' : 'bg-transparent'}`}
            >
               <Text className={!showTrash ? 'text-white font-bold text-lg' : 'text-slate-400 font-medium text-lg'}>
                 我的冰箱
               </Text>
               {!showTrash && <View className="w-1.5 h-1.5 rounded-full bg-emerald-400"></View>}
            </View>

            <View className="w-[1px] h-4 bg-slate-200 mx-1"></View>

            <View 
                onClick={() => setShowTrash(true)}
                className={`flex flex-row items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${showTrash ? 'bg-red-50 shadow-sm scale-105' : 'bg-transparent'}`}
            >
               <Text className={showTrash ? 'text-red-500 font-bold text-lg' : 'text-slate-400 font-medium text-lg'}>
                 回收站
               </Text>
            </View>
          </View>
        </View>
        
        {/* 第二行：搜索框 (仅冰箱模式显示) */}
        {!showTrash && (
          <View className="px-5 mb-3 mt-1">
             <View className="bg-slate-100/80 rounded-full px-4 py-2.5 flex flex-row items-center w-full transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900/10 focus-within:shadow-sm">
                 <Text className="mr-2 text-sm opacity-50">{ICON_MAP.search}</Text>
                 <Input 
                    className="text-sm w-full h-full text-slate-800"
                    placeholder="搜索食材..." 
                    placeholderClass="text-slate-400"
                    value={searchTerm}
                    onInput={(e) => setSearchTerm(e.detail.value)}
                 />
             </View>
          </View>
        )}

        {/* 第三行：分类过滤器 (仅冰箱模式显示) */}
        {!showTrash && (
          <ScrollView scrollX className="whitespace-nowrap px-5 w-full no-scrollbar" showScrollbar={false}>
            <View className="flex flex-row gap-2 pb-2">
              <View 
                onClick={() => setFilterCategory('ALL')}
                className={`px-5 py-2 rounded-full transition-all duration-300 border ${filterCategory === 'ALL' ? 'bg-slate-900 border-slate-900 shadow-md shadow-slate-200' : 'bg-white border-slate-100 text-slate-500'}`}
              >
                <Text className={`text-xs font-bold ${filterCategory === 'ALL' ? 'text-white' : 'text-slate-500'}`}>全部</Text>
              </View>
              {Object.values(Category).map(cat => (
                <View 
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-5 py-2 rounded-full transition-all duration-300 border ${filterCategory === cat ? 'bg-slate-900 border-slate-900 shadow-md shadow-slate-200' : 'bg-white border-slate-100'}`}
                >
                  <Text className={`text-xs font-bold ${filterCategory === cat ? 'text-white' : 'text-slate-500'}`}>{cat}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* 列表区域 */}
      <View className="px-4 py-5">
        {filteredItems.length === 0 ? (
          <View className="flex flex-col items-center justify-center py-32 text-center opacity-60">
            <View className={`w-24 h-24 rounded-[32px] flex items-center justify-center mb-6 shadow-sm ${showTrash ? 'bg-red-50' : 'bg-white'}`}>
              <Text className="text-5xl opacity-80">
                {showTrash ? ICON_MAP.trash : ICON_MAP.package}
              </Text>
            </View>
            <Text className="text-slate-400 font-medium text-sm mb-1">
              {showTrash ? "回收站空空如也" : "冰箱里什么都没有"}
            </Text>
            {!showTrash && <Text className="text-slate-300 text-xs">点右下角加点好吃的吧</Text>}
          </View>
        ) : (
          filteredItems.map(item => (
            <InventoryItemCard 
              key={item.id}
              item={item}
              showTrash={showTrash}
              onUpdateQuantity={handleUpdateQuantity}
              onMoveToTrash={moveToTrash}
              onRestore={restoreFromTrash}
              onDeleteForever={deleteForever}
            />
          ))
        )}
      </View>

      {/* 悬浮按钮 (FAB) - 增加呼吸动效 */}
      {!showTrash && (
        <View
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-10 right-6 w-16 h-16 bg-slate-900 rounded-[24px] shadow-xl shadow-slate-900/30 flex items-center justify-center z-40 active:scale-90 transition-transform duration-200"
        >
          <Text className="text-white text-3xl mb-1">{ICON_MAP.plus}</Text>
        </View>
      )}

      <AddItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItem}
      />
    </View>
  )
}