import { GoogleGenAI } from "@google/genai";
import { Transaction, FinancialSummary, UserSettings } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (
  summary: FinancialSummary,
  recentTransactions: Transaction[],
  settings: UserSettings
): Promise<string> => {
  try {
    const prompt = `
      Você é um consultor financeiro pessoal amigável, direto e focado em hábitos diários para brasileiros comuns (classe média/baixa).
      
      Perfil do Usuário:
      - Nome: ${settings.userName}
      - Idade: ${settings.age}
      - Profissão: ${settings.profession}
      
      Situação Financeira Atual:
      - Renda Total: R$ ${summary.totalIncome.toFixed(2)}
      - Despesas Fixas: R$ ${summary.totalFixedExpenses.toFixed(2)}
      - Despesas Variáveis (já gastas este mês): R$ ${summary.totalVariableExpenses.toFixed(2)}
      - Saldo Atual: R$ ${summary.balance.toFixed(2)}
      - Meta de Poupança: R$ ${summary.savingsGoal.toFixed(2)}
      - Dias restantes no mês: ${summary.daysRemaining}
      - Valor seguro para gastar POR DIA (após descontar contas fixas e meta de poupança): R$ ${summary.dailySafeToSpend.toFixed(2)}

      Últimas 5 transações:
      ${recentTransactions.slice(0, 5).map(t => `- ${t.description}: R$ ${t.amount} (${t.category})`).join('\n')}

      Tarefa:
      Analise a situação considerando a profissão e idade do usuário se fornecidos. Dê 3 conselhos curtos, práticos e motivadores. 
      Use emojis.
      Fale diretamente com o usuário usando o nome dele.
      
      Se o "Valor seguro para gastar por dia" for baixo ou negativo, dê um alerta gentil mas firme.
      Se estiver alto, parabenize.
      
      Formato de saída: Apenas o texto dos conselhos, separado por quebras de linha.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "Não foi possível gerar dicas no momento.";
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Desculpe, estou com dificuldades para analisar seus dados agora. Tente novamente mais tarde.";
  }
};