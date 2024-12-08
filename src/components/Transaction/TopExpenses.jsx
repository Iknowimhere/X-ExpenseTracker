import { useExpense } from '../../context/ExpenseContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const TopExpenses = () => {
  const { expenses } = useExpense();

  // Group and sum expenses by category
  const categoryTotals = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  // Convert to array and sort by amount
  const data = Object.entries(categoryTotals)
    .map(([name, amount]) => ({
      name,
      amount,
      fill: getCategoryColor(name),
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5); // Top 5 categories

  function getCategoryColor(category) {
    const colors = {
      Food: '#FF6384',
      Transport: '#36A2EB',
      Entertainment: '#FFCE56',
      Bills: '#4BC0C0',
      Others: '#9966FF'
    };
    return colors[category] || '#808080';
  }

  if (data.length === 0) {
    return <div className="no-data">No expense data available</div>;
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout='vertical'
          data={data}
          margin={{ left: 50, right: 50, top: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type='number' />
          <YAxis 
            dataKey='name' 
            type='category' 
            width={100}
          />
          <Tooltip 
            formatter={(value) => [`₹${value}`, 'Amount']}
          />
          <Bar 
            dataKey='amount' 
            barSize={20}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
