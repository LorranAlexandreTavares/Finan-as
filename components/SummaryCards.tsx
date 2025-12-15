import React from 'react';
import { FinancialSummary } from '../types';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Target, Clock } from 'lucide-react';

interface Props {
  summary: FinancialSummary;
}

export const SummaryCards: React.FC<Props> = ({ summary }) => {
  return (
    <div className="space-y-3 mb-6">
      <div className="grid grid-cols-2 gap-3">
        {/* Income */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1 text-emerald-600">
            <ArrowUpCircle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Entradas</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            R$ {summary.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Fixed Expenses */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1 text-amber-600">
            <Wallet className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Fixos</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            R$ {summary.totalFixedExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Variable Expenses */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1 text-rose-600">
            <ArrowDownCircle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Variáveis</span>
          </div>
          <span className="text-lg font-bold text-gray-900">
            R$ {summary.totalVariableExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* Balance */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-1 text-blue-600">
            <Target className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Saldo Real</span>
          </div>
          <span className={`text-lg font-bold ${summary.balance < 0 ? 'text-rose-600' : 'text-gray-900'}`}>
            R$ {summary.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Highlighted Daily Limit */}
      <div className="bg-gray-900 p-5 rounded-2xl shadow-lg text-white flex justify-between items-center relative overflow-hidden">
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1 text-indigo-300">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Limite Diário</span>
            </div>
            <p className="text-xs text-gray-400">Sugestão segura para hoje</p>
         </div>
         <span className="text-3xl font-bold relative z-10">
            R$ {summary.dailySafeToSpend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
         </span>
         
         {/* Decoration */}
         <div className="absolute right-0 top-0 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
      </div>
    </div>
  );
};