import React from 'react';
import { Home, TrendingUp, TrendingDown, Lock, ShoppingBag, Target } from 'lucide-react';
import { ViewType } from '../types';

interface Props {
  activeView: ViewType;
  onChangeView: (view: ViewType) => void;
}

export const Navigation: React.FC<Props> = ({ activeView, onChangeView }) => {
  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'income', label: 'Entradas', icon: TrendingUp },
    { id: 'expenses', label: 'Saídas', icon: TrendingDown },
    { id: 'fixed', label: 'Fixos', icon: Lock },
    { id: 'variable', label: 'Variáveis', icon: ShoppingBag },
    { id: 'goals', label: 'Metas', icon: Target },
  ];

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed top-0 bottom-0 left-0 z-40 p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">FinSimples</h1>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id as ViewType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Bottom Nav Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50 flex justify-between items-center pb-safe">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewType)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-full transition-all ${isActive ? 'bg-indigo-50' : ''}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};