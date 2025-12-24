import { View, Text } from '@tarojs/components'
import { InventoryItem, Category } from '../types'
import { ICON_MAP } from '../constants/icons'
import { getDaysStored, getFreshnessColor, formatDate } from '../utils/common'

interface Props {
  item: InventoryItem
  showTrash: boolean
  onUpdateQuantity: (id: string, delta: number) => void
  onMoveToTrash: (id: string) => void
  onRestore: (id: string) => void
  onDeleteForever: (id: string) => void
}

export function InventoryItemCard({
  item,
  showTrash,
  onUpdateQuantity,
  onMoveToTrash,
  onRestore,
  onDeleteForever
}: Props) {
  const daysStored = getDaysStored(item.addedDate)
  const freshStatus = getFreshnessColor(daysStored)

  // 🎨 UI升级：低饱和度莫兰迪色系
  // 背景使用最淡的 50，图标使用 500 或自定义 hex，避免高对比度
  const getCategoryTheme = (cat: Category) => {
    switch (cat) {
      case Category.MEAT: 
        // 肉类：淡粉红背景 + 柔和红图标
        return { icon: ICON_MAP.meat, bg: 'bg-red-50', text: 'text-red-400' }
      case Category.VEGETABLE: 
        // 蔬菜：淡绿背景 + 森林绿图标
        return { icon: ICON_MAP.vegetable, bg: 'bg-green-50', text: 'text-green-500' }
      case Category.FRUIT: 
        // 水果：淡橙背景 + 暖橙图标
        return { icon: ICON_MAP.fruit, bg: 'bg-orange-50', text: 'text-orange-400' }
      case Category.SEAFOOD: 
        // 海鲜：淡蓝背景 + 天空蓝图标
        return { icon: ICON_MAP.seafood, bg: 'bg-sky-50', text: 'text-sky-500' }
      default: 
        // 其他：淡灰背景 + 灰色图标
        return { icon: ICON_MAP.package, bg: 'bg-slate-50', text: 'text-slate-400' }
    }
  }

  const theme = getCategoryTheme(item.category)

  return (
    <View className="bg-white p-4 rounded-[24px] shadow-[0_2px_15px_rgba(0,0,0,0.02)] mb-3 flex flex-row items-center justify-between gap-3 active:scale-[0.99] transition-transform duration-200 border border-slate-50">
      
      {/* 左侧：图标与信息 */}
      <View className="flex flex-row items-center gap-3 flex-1 min-w-0">
        {/* 图标容器：背景色极淡 */}
        <View className={`w-14 h-14 rounded-[20px] flex items-center justify-center flex-shrink-0 ${theme.bg}`}>
          {/* 图标颜色也调柔和了 */}
          <Text className={`text-2xl ${theme.text}`}>{theme.icon}</Text>
        </View>
        
        <View className="flex-1 min-w-0">
          <Text className="font-bold text-slate-700 text-lg leading-tight block mb-1.5 truncate">
            {item.name}
          </Text>
          
          <View className="flex flex-row items-center gap-2 flex-wrap">
            {/* 日期：纯灰色，降低存在感 */}
            <Text className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-lg">
              {formatDate(item.addedDate)}
            </Text>
            
            {/* 新鲜度标签 */}
            {!showTrash && (
              <View className={`px-2 py-1 rounded-lg ${freshStatus.bg}`}>
                <Text className={`text-xs font-medium ${freshStatus.text}`}>
                   {daysStored} 天
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 右侧：操作区 */}
      <View className="flex flex-row items-center pl-1 flex-shrink-0">
        {showTrash ? (
          <View className="flex flex-row gap-2">
            <View 
              onClick={(e) => { e.stopPropagation(); onRestore(item.id) }}
              className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center active:scale-90"
            >
              <Text className="text-sm">{ICON_MAP.restore}</Text>
            </View>
            <View 
              onClick={(e) => { e.stopPropagation(); onDeleteForever(item.id) }}
              className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center active:scale-90"
            >
              <Text className="text-sm">{ICON_MAP.deleteForever}</Text>
            </View>
          </View>
        ) : (
          <View className="flex flex-row items-center gap-2">
            {/* 数量控制器：更淡的边框 */}
            <View className="flex flex-row items-center bg-white rounded-full p-1 h-9 border border-slate-100 shadow-sm">
              <View 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(item.id, -1) }}
                className="w-7 h-full flex items-center justify-center rounded-full active:bg-slate-50"
              >
                <Text className="text-slate-300 font-bold text-sm mb-[2px]">{ICON_MAP.subtract}</Text>
              </View>
              
              <View className="w-8 flex items-center justify-center">
                <Text className="font-bold text-slate-700 text-sm">{item.quantity}</Text>
              </View>
              
              <View 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(item.id, 1) }}
                className="w-7 h-full flex items-center justify-center rounded-full active:bg-slate-50"
              >
                <Text className="text-slate-300 font-bold text-sm mb-[2px]">{ICON_MAP.add}</Text>
              </View>
            </View>

            {/* 单位 */}
            <Text className="text-sm font-medium text-slate-400 w-6 text-center">
                {item.unit}
            </Text>

            {/* 删除按钮 */}
            <View 
              onClick={(e) => { e.stopPropagation(); onMoveToTrash(item.id) }}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-300 active:text-red-400 transition-colors"
            >
              <Text className="text-sm opacity-50">{ICON_MAP.trash}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}