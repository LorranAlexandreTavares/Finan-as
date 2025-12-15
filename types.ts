export type TransactionType = 'income' | 'expense';

export type Frequency = 'recurring' | 'variable';

export type ViewType = 'home' | 'income' | 'expenses' | 'fixed' | 'variable' | 'goals';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  frequency: Frequency;
  category: string;
  date: string; // ISO string
}

export interface FinancialSummary {
  totalIncome: number;
  totalFixedExpenses: number;
  totalVariableExpenses: number;
  balance: number;
  savingsGoal: number; // Meta mensal geral
  dailySafeToSpend: number;
  totalSafeToSpend: number;
  daysRemaining: number;
}

export interface UserSettings {
  savingsGoal: number;
  userName: string;
  age: string;
  profession: string;
}

export interface SavingsGoal {
  id: string;
  name: string; // Ex: Viagem, Carro
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  icon?: string;
}

export const CATEGORIES = {
  income: ['Salário', 'Freelance', 'Investimentos', 'Outros'],
  expense: ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Assinaturas', 'Outros']
};