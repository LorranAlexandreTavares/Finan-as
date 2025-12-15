import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { FinancialSummary, Transaction, UserSettings } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface Props {
  summary: FinancialSummary;
  transactions: Transaction[];
  settings: UserSettings;
}

export const FinancialCoach: React.FC<Props> = ({ summary, transactions, settings }) => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    const result = await getFinancialAdvice(summary, transactions, settings);
    setAdvice(result);
    setLoading(false);
    setHasLoaded(true);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-indigo-100 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          FinCoach IA
        </h3>
        {!hasLoaded && (
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Analisar Finanças'}
          </button>
        )}
      </div>

      {!hasLoaded && !loading && (
        <p className="text-indigo-800 text-sm opacity-80">
          Toque em "Analisar Finanças" para receber dicas personalizadas para <strong>{settings.userName}</strong> baseadas no seu perfil e gastos atuais.
        </p>
      )}

      {loading && (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-indigo-100 rounded w-3/4"></div>
          <div className="h-4 bg-indigo-100 rounded w-1/2"></div>
          <div className="h-4 bg-indigo-100 rounded w-5/6"></div>
        </div>
      )}

      {hasLoaded && !loading && advice && (
        <div className="space-y-4">
          <div className="prose text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {advice}
          </div>
          <div className="flex justify-end">
             <button
            onClick={handleGetAdvice}
            className="text-xs text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-800"
          >
            <RefreshCw className="w-3 h-3" /> Atualizar análise
          </button>
          </div>
        </div>
      )}
    </div>
  );
};