import React, { useState, useEffect } from 'react';
import { X, Save, User, Briefcase, Calendar } from 'lucide-react';
import { UserSettings } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onSave: (s: UserSettings) => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose, settings, onSave }) => {
  const [tempSettings, setTempSettings] = useState<UserSettings>(settings);

  useEffect(() => {
    setTempSettings(settings);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(tempSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Ajustes & Visual</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={tempSettings.userName}
                onChange={(e) => setTempSettings({...tempSettings, userName: e.target.value})}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Como quer ser chamado?"
              />
            </div>
          </div>

          <div className="flex gap-4">
            {/* Idade */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={tempSettings.age}
                  onChange={(e) => setTempSettings({...tempSettings, age: e.target.value})}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Ex: 30"
                />
              </div>
            </div>

            {/* Profissão */}
            <div className="flex-[1.5]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Profissão</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={tempSettings.profession}
                  onChange={(e) => setTempSettings({...tempSettings, profession: e.target.value})}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Ex: Designer"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Meta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta de Poupança Mensal</label>
            <p className="text-xs text-gray-500 mb-2">Quanto você quer guardar todo mês?</p>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">R$</span>
              <input
                type="number"
                value={tempSettings.savingsGoal}
                onChange={(e) => setTempSettings({...tempSettings, savingsGoal: Number(e.target.value)})}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2 mt-4 shadow-lg"
          >
            <Save className="w-4 h-4" /> Salvar Preferências
          </button>
        </form>
      </div>
    </div>
  );
};