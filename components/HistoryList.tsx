import React from 'react';
import { Transaction } from '../types';
import { Trash2, TrendingUp, TrendingDown, Edit2 } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

export const HistoryList: React.FC<Props> = ({ transactions, onDelete, onEdit }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
        <p className="text-gray-400 text-sm">Nenhuma movimentação este mês.</p>
        <p className="text-indigo-500 text-xs font-medium mt-1">Adicione sua primeira conta ou ganho!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-50 bg-gray-50/50">
        <h3 className="font-semibold text-gray-700">Histórico Recente</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map((t) => (
          <div key={t.id} className="p-4 flex items-center justify-between group hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {t.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{t.description}</p>
                <div className="flex items-center gap-2">
                   <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{t.category}</span>
                   {t.frequency === 'recurring' && (
                     <span className="text-[10px] text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">Fixo</span>
                   )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-semibold text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
              </span>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => onEdit(t)}
                  className="p-1.5 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(t.id)}
                  className="p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};