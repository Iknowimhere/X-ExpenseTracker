import './Header.css'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';



export const Header = () => {
    const data = [
        { name: 'Food', value: 120, color: '#FF6384' },
        { name: 'Transport', value: 150, color: '#36A2EB' },
        { name: 'Entertainment', value: 80, color: '#FFCE56' },
        { name: 'Bills', value: 100, color: '#4BC0C0' },
        { name: 'Others', value: 50, color: '#9966FF' }
    ]
    return (
        <div className="header-container">
            <h1 className="header-title">Expense Tracker</h1>
            <div className="stats-container">
                {/* wallet balance */}
                <div className="stats-card">
                    <p className="stats-amount">
                        Wallet Balance: <span className="balance-amount">₹ 4500</span>
                    </p>
                    <button className="add-income-btn">Add Income</button>
                </div>
                {/* Expenses */}
                <div className="stats-card">
                    <p className="stats-amount">
                        Expenses: <span className="expense-amount">₹ 500</span>
                    </p>
                    <button className="add-expense-btn">Add Expense</button>
                </div>
                {/* pie chart */}
                <div className="stats-card">
                    {/* <h1>PieChart</h1> */}
                    <ResponsiveContainer width="100%">
                        <PieChart >
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                dataKey="value"
                                outerRadius={80}
                            >
                                {data.map((entry, index) => {
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                })}
                            </Pie>
                            <Legend layout='vertical' align='right' verticalAlign='middle' />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
