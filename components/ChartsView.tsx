import React, { useState } from 'react';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

export const ChartsView: React.FC<Props> = ({ transactions }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // --- Data Preparation for All Expenses (Existing Bars) ---
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);

  const expensesByCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount);

  // --- Data Preparation for Variable Expenses (Pie Chart) ---
  const variableExpenses = transactions.filter(t => t.type === 'expense' && t.frequency === 'variable');
  const totalVariable = variableExpenses.reduce((acc, t) => acc + t.amount, 0);

  const variableByCategory = variableExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const BASE_COLORS = ['#4f46e5', '#ec4899', '#8b5cf6', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6', '#64748b'];

  const pieData = Object.entries(variableByCategory)
    .map(([category, amount], index) => ({
      category,
      amount,
      color: BASE_COLORS[index % BASE_COLORS.length],
      percentage: totalVariable > 0 ? amount / totalVariable : 0
    }))
    .sort((a, b) => b.amount - a.amount);

  // --- SVG Math Helper ---
  let cumulativePercent = 0;
  
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent - Math.PI / 2);
    const y = Math.sin(2 * Math.PI * percent - Math.PI / 2);
    return [x, y];
  };

  const pieSlices = pieData.map((slice) => {
    const start = getCoordinatesForPercent(cumulativePercent);
    cumulativePercent += slice.percentage;
    const end = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = slice.percentage > 0.5 ? 1 : 0;
    
    // Path command: Move to start, Arc to end, Line to center (0,0) implied for closing but we want donut
    const pathData = `M 0 0 L ${start[0]} ${start[1]} A 1 1 0 ${largeArcFlag} 1 ${end[0]} ${end[1]} Z`;
    
    return { ...slice, pathData };
  });

  // --- Interaction Logic ---
  const activeSlice = hoveredCategory 
    ? pieData.find(d => d.category === hoveredCategory) 
    : null;

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">Sem dados para exibir gráficos.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. Variable Expenses Pie Chart */}
      {totalVariable > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <h3 className="font-semibold text-gray-800 mb-2 w-full text-left">Gastos Variáveis</h3>
          <p className="text-xs text-gray-400 mb-6 w-full text-left">Toque no gráfico para ver detalhes</p>
          
          <div className="relative w-64 h-64">
            <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full transform rotate-0">
              {pieSlices.map((slice) => (
                <path
                  key={slice.category}
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="white"
                  strokeWidth="0.05"
                  className={`transition-all duration-300 cursor-pointer ${hoveredCategory === slice.category ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'}`}
                  onMouseEnter={() => setHoveredCategory(slice.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                />
              ))}
              {/* Donut Hole (White Circle in middle) */}
              <circle cx="0" cy="0" r="0.75" fill="white" />
            </svg>

            {/* Center Info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {activeSlice ? (
                <>
                  <span className="text-xs text-gray-500 font-medium">{activeSlice.category}</span>
                  <span className="text-xl font-bold text-gray-800">{(activeSlice.percentage * 100).toFixed(0)}%</span>
                  <span className="text-xs text-gray-500 font-medium">R$ {activeSlice.amount.toFixed(0)}</span>
                </>
              ) : (
                <>
                  <span className="text-xs text-gray-400 font-medium">Total Variável</span>
                  <span className="text-xl font-bold text-gray-800">R$ {totalVariable.toLocaleString('pt-BR', { notation: "compact" })}</span>
                </>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {pieData.map((item) => (
               <div 
                 key={item.category} 
                 className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-colors cursor-pointer ${hoveredCategory === item.category ? 'bg-gray-50 border-gray-300' : 'border-transparent'}`}
                 onMouseEnter={() => setHoveredCategory(item.category)}
                 onMouseLeave={() => setHoveredCategory(null)}
               >
                 <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                 <span className="text-xs text-gray-600 font-medium">{item.category}</span>
               </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Expenses by Category (Bar List) */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Ranking de Gastos (Total)</h3>
        <div className="space-y-4">
          {categoryData.length > 0 ? (
            categoryData.map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="text-gray-500">R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({item.percentage.toFixed(0)}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">Nenhum gasto registrado.</p>
          )}
        </div>
      </div>

      {/* 3. Income vs Expenses Simple Bar */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-800 mb-4">Balanço Geral</h3>
        {(() => {
           const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
           const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
           const max = Math.max(income, expense);
           
           return (
             <div className="space-y-4">
                {/* Income */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-emerald-600">Entradas</span>
                    <span className="text-gray-900">R$ {income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-emerald-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: max > 0 ? `${(income / max) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>

                {/* Expense */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-rose-600">Saídas</span>
                    <span className="text-gray-900">R$ {expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div 
                      className="bg-rose-500 h-3 rounded-full transition-all duration-1000" 
                      style={{ width: max > 0 ? `${(expense / max) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
             </div>
           )
        })()}
      </div>
    </div>
  );
};