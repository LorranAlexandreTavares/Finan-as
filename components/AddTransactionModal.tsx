import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, Tag } from 'lucide-react';
import { Transaction, TransactionType, Frequency, CATEGORIES } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (t: Omit<Transaction, 'id'>) => void;
  initialData?: Transaction | null;
}

export const AddTransactionModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('variable');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Efeito para carregar dados se estiver editando
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setType(initialData.type);
        setDescription(initialData.description);
        setAmount(initialData.amount.toString());
        setCategory(initialData.category);
        setFrequency(initialData.frequency);
        // Tenta extrair a data YYYY-MM-DD da string ISO
        try {
          setDate(new Date(initialData.date).toISOString().split('T')[0]);
        } catch (e) {
          setDate(new Date().toISOString().split('T')[0]);
        }
      } else {
        // Reset para adicionar novo
        setType('expense');
        setDescription('');
        setAmount('');
        setCategory('');
        setFrequency('variable');
        setDate(new Date().toISOString().split('T')[0]);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) return;

    const now = new Date();
    const [year, month, day] = date.split('-').map(Number);
    // Preserva a hora atual para não bagunçar a ordenação
    const dateObj = new Date(year, month - 1, day, now.getHours(), now.getMinutes());

    onSave({
      description,
      amount: parseFloat(amount.replace(',', '.')),
      type,
      frequency,
      category,
      date: dateObj.toISOString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">
            {initialData ? 'Editar Transação' : 'Nova Transação'}
          </h3>
          <button onClick={onClose} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setType('expense')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                type === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Saída (Gasto)
            </button>
            <button
              type="button"
              onClick={() => setType('income')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Entrada (Ganho)
            </button>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Valor</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold text-gray-800"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Data</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Descrição</label>
            <input
              type="text"
              placeholder="Ex: Almoço, Salário, Uber"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Categoria</label>
            <div className="relative">
              <Tag className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 appearance-none"
                required
              >
                <option value="" disabled>Selecione uma categoria</option>
                {CATEGORIES[type].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Frequency/Type */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-500 ml-1">Tipo de recorrência</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${frequency === 'variable' ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-600'}`}>
                <input 
                  type="radio" 
                  name="frequency" 
                  value="variable" 
                  checked={frequency === 'variable'} 
                  onChange={() => setFrequency('variable')}
                  className="hidden" 
                />
                <span className="text-sm font-medium">Variável</span>
              </label>
              
              <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${frequency === 'recurring' ? 'border-indigo-200 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-600'}`}>
                <input 
                  type="radio" 
                  name="frequency" 
                  value="recurring" 
                  checked={frequency === 'recurring'} 
                  onChange={() => setFrequency('recurring')}
                  className="hidden" 
                />
                <span className="text-sm font-medium">Fixo Mensal</span>
              </label>
            </div>
            <p className="text-xs text-gray-400 ml-1">
              {frequency === 'recurring' 
                ? 'Ex: Aluguel, Assinaturas, Salário. Repete todo mês.' 
                : 'Ex: Café, Mercado, Lazer. Acontece esporadicamente.'}
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-gray-200"
          >
            {initialData ? 'Salvar Alterações' : 'Adicionar'}
          </button>
        </form>
      </div>
    </div>
  );
};