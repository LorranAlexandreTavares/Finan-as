import React, { useState } from 'react';
import { X, TrendingUp, DollarSign } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  goalName: string;
  onConfirm: (amount: number) => void;
}

export const DepositGoalModal: React.FC<Props> = ({ isOpen, onClose, goalName, onConfirm }) => {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const numAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numAmount) || numAmount <= 0) return;

    onConfirm(numAmount);
    setAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
          <h3 className="font-bold text-indigo-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Depositar
          </h3>
          <button onClick={onClose} className="p-2 bg-white/50 rounded-full hover:bg-white transition">
            <X className="w-4 h-4 text-indigo-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            Quanto você quer guardar para a meta <strong className="text-gray-800">"{goalName}"</strong> hoje?
          </p>

          <div className="relative mb-6">
            <DollarSign className="absolute left-3 top-3.5 w-6 h-6 text-gray-400" />
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2xl font-bold text-gray-800"
              autoFocus
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200"
          >
            Confirmar Depósito
          </button>
        </form>
      </div>
    </div>
  );
};