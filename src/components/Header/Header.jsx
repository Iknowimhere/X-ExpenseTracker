import './Header.css';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

import { useState } from 'react';
import { AddIncomeModal } from '../Modal/AddIncomeModal';
import { AddExpenseModal } from '../Modal/AddExpenseModal';

export const Header = () => {
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const openIncomeModal = () => {
    setIsIncomeModalOpen(true);
  };
  const closeIncomeModal = () => {
    setIsIncomeModalOpen(false);
  };
  const openExpenseModal = () => {
    setIsExpenseModalOpen(true);
  };
  const closeExpenseModal = () => {
    setIsExpenseModalOpen(false);
  };


  const data = [
    { name: 'Food', value: 120, color: '#FF6384' },
    { name: 'Transport', value: 150, color: '#36A2EB' },
    { name: 'Entertainment', value: 80, color: '#FFCE56' },
    { name: 'Bills', value: 100, color: '#4BC0C0' },
    { name: 'Others', value: 50, color: '#9966FF' },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className='header-container'>
      <h1 className='header-title'>Expense Tracker</h1>
      <div className='stats-container'>
        {/* wallet balance */}
        <div className='stats-card'>
          <p className='stats-amount'>
            Wallet Balance: <span className='balance-amount'>₹ 4500</span>
          </p>
          <button
            className='add-income-btn'
            onClick={() => openIncomeModal()}
          >
            Add Income
          </button>
          <AddIncomeModal isOpen={isIncomeModalOpen} onClose={closeIncomeModal} />
        </div>
        {/* Expenses */}
        <div className='stats-card'>
          <p className='stats-amount'>
            Expenses: <span className='expense-amount'>₹ 500</span>
          </p>
          <button
            className='add-expense-btn'
            onClick={openExpenseModal}
          >
            Add Expense
          </button>
          <AddExpenseModal isOpen={isExpenseModalOpen} onClose={closeExpenseModal} />
        </div>
        {/* pie chart */}
        <div className='pie-chart-container'>
          {/* <h1>PieChart</h1> */}
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
                {data.map((entry, index) => {
                  return <Cell key={`cell-${index}`} fill={entry.color} />;
                })}
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
