import React from 'react';
import { FinancialSummary } from '../types';
import { Info, Calendar } from 'lucide-react';

interface Props {
  summary: FinancialSummary;
}

export const DailyBudgetCard: React.FC<Props> = ({ summary }) => {
  // A cor continua baseada na saúde diária para alertar o usuário
  const isNegative = summary.totalSafeToSpend < 0;
  const isTight = summary.dailySafeToSpend > 0 && summary.dailySafeToSpend < 20;

  let bgColor = "bg-emerald-500";
  if (isNegative) bgColor = "bg-rose-500";
  else if (isTight) bgColor = "bg-amber-500";

  return (
    <div className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-lg mb-6 ${bgColor} transition-colors duration-500`}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium opacity-90 uppercase tracking-wide">
            Livre no mês
          </h2>
          <div className="group relative">
            <Info className="w-4 h-4 opacity-70 cursor-help" />
            <div className="absolute right-0 top-6 w-48 bg-white text-gray-800 text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              Renda - Fixos - Meta Poupança - Gastos Variáveis
            </div>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold opacity-80">R$</span>
          <span className="text-5xl font-bold tracking-tight">
            {summary.totalSafeToSpend.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <p className="mt-4 text-sm font-medium opacity-90">
          {isNegative 
            ? "Atenção! Você ultrapassou seu orçamento mensal." 
            : isTight 
              ? "Orçamento do mês está apertado."
              : "Seu orçamento mensal está saudável."}
        </p>

        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-end text-xs font-medium">
          <div className="flex flex-col gap-1">
             <span className="opacity-70">Pode gastar hoje</span>
             <div className="flex items-center gap-1 text-base font-bold">
               <Calendar className="w-4 h-4" />
               R$ {summary.dailySafeToSpend.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
             </div>
          </div>
          <div className="text-right">
            <div className="opacity-70">Dias restantes</div>
            <div className="text-base font-bold">{summary.daysRemaining}</div>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black opacity-5 rounded-full blur-xl"></div>
    </div>
  );
};