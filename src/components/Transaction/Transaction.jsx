import React from 'react';
import './Transaction.css';
import pizza from '../../assets/pizza.svg';

const TransactionItem = ({ name, date, amount }) => (
    <div className="list-item">
        <div className="section1">
            <img src={pizza} alt={name} />
            <div className="section-content">
                <p>{name}</p>
                <p>{date}</p>
            </div>
        </div>
        <div className="section2">
            <p>{amount}</p>
            <button className="action-btn">Delete</button>
            <button className="action-btn">Edit</button>
        </div>
    </div>
);

export const Main = () => {
    const transactions = [
        { name: 'Samosa', date: 'March 20, 2024', amount: 'R200' },
        { name: 'Pizza', date: 'March 21, 2024', amount: 'R300' },
        { name: 'Burger', date: 'March 22, 2024', amount: 'R150' },
    ];

    return (
        <div className='transaction-container'>
            <div className="recent-transactions-container">
            <h1 className="transaction-title">Recent Transactions</h1>
            <div className='recent-transactions'>
                <div className="list">
                    {transactions.map((transaction, index) => (
                        <React.Fragment key={index}>
                            <TransactionItem {...transaction} />
                            {index < transactions.length - 1 && <hr />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            </div>
            <div className="top-expenses">
                <p>Bar Chart</p>
            </div>
        </div>
    );
};
