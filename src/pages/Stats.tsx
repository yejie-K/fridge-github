import React, { useMemo } from 'react';
import { Layout } from '../components/Layout';
import { useFoodItems } from '../hooks/useFoodItems';
import { CATEGORY_LABELS, Category } from '../types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DataBackupService } from '../services/backup'; // We'll create this next
import { Download, Upload } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Stats: React.FC = () => {
  const { items, refresh } = useFoodItems();

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {
      seafood: 0,
      meat: 0,
      vegetable: 0,
      other: 0
    };

    items.forEach(item => {
      if (counts[item.category] !== undefined) {
        counts[item.category] += item.quantity;
      } else {
        counts.other += item.quantity;
      }
    });

    return counts;
  }, [items]);

  const chartData = {
    labels: Object.keys(categoryData).map(k => CATEGORY_LABELS[k as Category]),
    datasets: [
      {
        label: '数量',
        data: Object.values(categoryData),
        backgroundColor: [
          '#60A5FA', // Blue for seafood
          '#F87171', // Red for meat
          '#4CAF50', // Green for veg
          '#9CA3AF', // Gray for other
        ],
        borderWidth: 0,
      },
    ],
  };

  const handleExport = () => {
    DataBackupService.exportData();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      DataBackupService.importData(file)
        .then(() => {
          alert('数据导入成功！');
          refresh();
        })
        .catch(err => alert('导入失败: ' + err.message));
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-6 text-gray-800">库存统计</h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="h-64 flex justify-center">
          {items.length > 0 ? (
            <Doughnut 
              data={chartData} 
              options={{
                cutout: '70%',
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  }
                }
              }}
            />
          ) : (
             <div className="flex items-center justify-center text-gray-400">
               暂无数据
             </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-medium text-gray-700 mb-4">数据管理</h3>
        <div className="flex space-x-4">
          <button
            onClick={handleExport}
            className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Download className="text-primary mb-2" size={24} />
            <span className="text-sm font-medium">导出数据</span>
          </button>
          
          <label className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
            <Upload className="text-secondary mb-2" size={24} />
            <span className="text-sm font-medium">导入数据</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>
    </Layout>
  );
};
