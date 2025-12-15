import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface Props {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const MonthSelector: React.FC<Props> = ({ currentDate, onPrevMonth, onNextMonth }) => {
  const monthName = currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <button 
        onClick={onPrevMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <span className="font-bold text-gray-800 capitalize text-lg">
          {monthName}
        </span>
      </div>

      <button 
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};