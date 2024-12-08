import { createContext, useContext, useEffect, useState } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [walletBalance, setWalletBalance] = useState(() => {
    return parseFloat(localStorage.getItem('walletBalance')) || 5000;
  });
  
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || [];
  });

  useEffect(() => {
    localStorage.setItem('walletBalance', walletBalance);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [walletBalance, expenses]);

  const addIncome = (amount) => {
    setWalletBalance(prev => prev + parseFloat(amount));
  };

  const addExpense = (expense) => {
    if (expense.amount > walletBalance) {
      alert('Insufficient balance!');
      return false;
    }
    setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
    setWalletBalance(prev => prev - parseFloat(expense.amount));
    return true;
  };

  const deleteExpense = (expense) => {
    setExpenses(prev => prev.filter(e => e.id !== expense.id));
    setWalletBalance(prev => prev + parseFloat(expense.amount));
  };

  const editExpense = (id, updatedExpense) => {
    const expense = expenses.find(e => e.id === id);
    const balanceDiff = expense.amount - updatedExpense.amount;
    
    if (balanceDiff < 0 && Math.abs(balanceDiff) > walletBalance) {
      alert('Insufficient balance!');
      return false;
    }

    setExpenses(prev => prev.map(e => e.id === id ? {...updatedExpense, id} : e));
    setWalletBalance(prev => prev + balanceDiff);
    return true;
  };

  return (
    <ExpenseContext.Provider value={{
      walletBalance,
      expenses,
      addIncome,
      addExpense,
      deleteExpense,
      editExpense
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
