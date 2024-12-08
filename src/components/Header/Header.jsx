import './Header.css';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useExpense } from '../../context/ExpenseContext';
import { AddIncomeModal } from '../Modal/AddIncomeModal';
import { AddExpenseModal } from '../Modal/AddExpenseModal';
import { IoIosAdd } from "react-icons/io";

export const Header = () => {
  const { walletBalance, expenses } = useExpense();
  const { enqueueSnackbar } = useSnackbar();
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Group expenses by category for pie chart
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    color: getColorForCategory(name)
  }));

  function getColorForCategory(category) {
    const colors = {
      Food: '#FF6384',
      Transport: '#36A2EB',
      Entertainment: '#FFCE56',
      Bills: '#4BC0C0',
      Others: '#9966FF'
    };
    return colors[category] || '#808080';
  }

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const handleModalOpen = (type) => {
    if (type === 'income') {
      setIsIncomeModalOpen(true);
      enqueueSnackbar('Add income to your wallet', { 
        variant: 'info',
        autoHideDuration: 2000 
      });
    } else {
      setIsExpenseModalOpen(true);
      if (walletBalance <= 0) {
        enqueueSnackbar('Insufficient wallet balance!', { 
          variant: 'warning',
          autoHideDuration: 3000 
        });
      }
    }
  };

  return (
    <div className='header-container'>
      <h1 className='header-title'>Expense Tracker</h1>
      <div className='stats-container'>
        <div className='stats-card'>
          <p className='stats-amount'>
            Wallet Balance: <span className='balance-amount'>₹ {walletBalance}</span>
          </p>
          <button
            className='add-income-btn'
            onClick={() => handleModalOpen('income')}
          >
           <IoIosAdd/> Add Income
          </button>
          <AddIncomeModal 
            isOpen={isIncomeModalOpen} 
            onClose={() => setIsIncomeModalOpen(false)} 
          />
        </div>
        <div className='stats-card'>
          <p className='stats-amount'>
            Expenses: <span className='expense-amount'>₹ {totalExpenses}</span>
          </p>
          <button
            className='add-expense-btn'
            onClick={() => handleModalOpen('expense')}
          >
           <IoIosAdd /> Add Expense
          </button>
          <AddExpenseModal 
            isOpen={isExpenseModalOpen} 
            onClose={() => setIsExpenseModalOpen(false)} 
          />
        </div>
        <div className='pie-chart-container'>
          <ResponsiveContainer width='100%' height={250}>
            <PieChart>
              <Pie
                data={data}
                cx='50%'
                cy='50%'
                dataKey='value'
                outerRadius={100}
                labelLine={false}
                label={renderCustomizedLabel}
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                layout='horizontal'
                align='center'
                verticalAlign='bottom'
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
