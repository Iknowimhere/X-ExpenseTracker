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
  const data = [
    {
      name: 'Food',
      amount: 2000,
      fill: '#FF6384',
    },
    {
      name: 'Rent',
      amount: 5000,
      fill: '#36A2EB',
    },
    {
      name: 'Transport',
      amount: 1500,
      fill: '#FFCE56',
    },
  ];

  return (
    <div style={{ height: 200 }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          layout='vertical'
          data={data}
                  margin={{ left: 50, right: 50, top: 20 }}
        >
                  <XAxis type='number' axisLine={false}/>
          <YAxis dataKey='name' type='category'axisLine={false} />
          <Bar dataKey='amount' barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
