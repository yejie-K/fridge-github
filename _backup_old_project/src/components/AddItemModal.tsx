import { View, Text, Input } from '@tarojs/components'
import { useState } from 'react'
import { Category, InventoryItem } from '../types'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdd: (item: Omit<InventoryItem, 'id' | 'addedDate' | 'isDeleted'>) => void
}

export function AddItemModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [unit, setUnit] = useState('个')
  const [category, setCategory] = useState<Category>(Category.OTHER)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!name.trim()) return
    onAdd({
      name,
      quantity: parseFloat(quantity) || 1,
      unit,
      category
    })
    // 提交后重置表单
    setName('')
    setQuantity('1')
    setUnit('个')
    setCategory(Category.OTHER)
    onClose()
  }

  return (
    <View className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 黑色半透明背景遮罩 */}
      <View 
        className="absolute inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* 弹窗主体 */}
      <View className="relative bg-white w-[85%] rounded-3xl p-6 z-10 shadow-2xl">
        <Text className="text-xl font-bold text-slate-900 mb-6 block text-center">添加新食材</Text>
        
        {/* 输入名称 */}
        <View className="mb-4">
            <Text className="text-xs text-slate-500 mb-2 block font-medium">名称</Text>
            <Input 
                className="bg-slate-50 p-3 rounded-xl text-slate-800 text-base h-11"
                placeholder="例如: 鸡蛋"
                placeholderClass="text-slate-400"
                value={name}
                onInput={e => setName(e.detail.value)}
            />
        </View>

        {/* 数量和单位 (并排显示) */}
        <View className="flex flex-row gap-3 mb-5">
            <View className="flex-1">
                <Text className="text-xs text-slate-500 mb-2 block font-medium">数量</Text>
                <Input 
                    type="digit"
                    className="bg-slate-50 p-3 rounded-xl text-slate-800 text-base h-11"
                    value={quantity}
                    onInput={e => setQuantity(e.detail.value)}
                />
            </View>
            <View className="flex-1">
                <Text className="text-xs text-slate-500 mb-2 block font-medium">单位</Text>
                <Input 
                    className="bg-slate-50 p-3 rounded-xl text-slate-800 text-base h-11"
                    value={unit}
                    onInput={e => setUnit(e.detail.value)}
                />
            </View>
        </View>

        {/* 分类选择 (标签形式) */}
        <View className="mb-8">
            <Text className="text-xs text-slate-500 mb-2 block font-medium">分类</Text>
            <View className="flex flex-row flex-wrap gap-2">
                {Object.values(Category).map(cat => (
                    <View 
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                            category === cat 
                            ? 'bg-slate-900 border-slate-900' 
                            : 'bg-white border-slate-200'
                        }`}
                    >
                        <Text className={`text-xs font-bold ${category === cat ? 'text-white' : 'text-slate-600'}`}>
                            {cat}
                        </Text>
                    </View>
                ))}
            </View>
        </View>

        {/* 底部按钮 */}
        <View className="flex flex-row gap-3">
            <View 
                onClick={onClose}
                className="flex-1 bg-slate-100 h-12 rounded-xl flex items-center justify-center active:bg-slate-200"
            >
                <Text className="text-slate-600 font-bold">取消</Text>
            </View>
            <View 
                onClick={handleSubmit}
                className="flex-1 bg-slate-900 h-12 rounded-xl flex items-center justify-center active:bg-slate-800"
            >
                <Text className="text-white font-bold">保存</Text>
            </View>
        </View>
      </View>
    </View>
  )
}