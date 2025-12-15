import React, { useState } from 'react';
import { X, Target, DollarSign, Calendar } from 'lucide-react';
import { SavingsGoal } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (g: Omit<SavingsGoal, 'id'>) => void;
}

export const AddGoalModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount) return;

    onAdd({
      name,
      targetAmount: parseFloat(targetAmount.replace(',', '.')),
      currentAmount: currentAmount ? parseFloat(currentAmount.replace(',', '.')) : 0,
      deadline: deadline || undefined,
    });

    // Reset
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setDeadline('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Nova Meta
          </h3>
          <button onClick={onClose} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Nome */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Nome da Meta</label>
            <input
              type="text"
              placeholder="Ex: Viagem para Disney, Carro Novo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
            />
          </div>

          {/* Valor Alvo */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Valor do Objetivo</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg font-semibold text-gray-800"
                required
              />
            </div>
          </div>

          {/* Valor Atual */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Já guardou quanto? (Opcional)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                placeholder="0,00"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
            </div>
          </div>

          {/* Prazo */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">Data Limite (Opcional)</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg"
          >
            Criar Meta
          </button>
        </form>
      </div>
    </div>
  );
};