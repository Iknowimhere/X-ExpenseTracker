import { useState } from 'react';
import { useExpense } from '../../context/ExpenseContext';
import { AddExpenseModal } from '../Modal/AddExpenseModal';
import { FaTrash, FaEdit } from 'react-icons/fa';
import {
  FaPizzaSlice,
  FaBus,
  FaGamepad,
  FaFileInvoice,
  FaEllipsisH
} from 'react-icons/fa';
import { useSnackbar } from 'notistack';
import './Transaction.css';
import { TopExpenses } from './TopExpenses';

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Food': return <FaPizzaSlice />;
    case 'Transport': return <FaBus />;
    case 'Entertainment': return <FaGamepad />;
    case 'Bills': return <FaFileInvoice />;
    default: return <FaEllipsisH />;
  }
};

const TransactionItem = ({ expense, onEdit, onDelete }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    onDelete(expense);
    enqueueSnackbar('Expense deleted successfully', { variant: 'success' });
  };

  return (
    <div className='list-item'>
      <div className='section1'>
        <div className='category-icon'>
          {getCategoryIcon(expense.category)}
        </div>
        <div className='section-content'>
          <p>{expense.title}</p>
          <p className='date'>{new Date(expense.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className='section2'>
        <p className='amount'>₹{expense.amount}</p>
        <button className='action-btn edit' onClick={() => onEdit(expense)}>
          <FaEdit />
        </button>
        <button className='action-btn delete' onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export const Main = () => {
  const { expenses, deleteExpense } = useExpense();
  const [editingExpense, setEditingExpense] = useState(null);


    // Add pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
  

      // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

 // Pagination controls
 const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};


  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  return (
    <div className='transaction-container'>
      <div className='recent-transactions-container'>
        <h1 className='transaction-title'>Recent Transactions</h1>
        <div className='recent-transactions'>
          <div className='list'>
            {expenses.length > 0 ? (
              currentItems.map((expense) => (
                <TransactionItem
                  key={expense.id}
                  expense={expense}
                  onEdit={handleEdit}
                  onDelete={deleteExpense}
                />
              ))
            ) : (
              <p className="no-expenses">No expenses to show</p>
            )}
          </div>
          
          {/* Add Pagination Controls */}
          {expenses.length > itemsPerPage && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='top-expenses-container'>
        <h1>Top Expenses</h1>
        <TopExpenses />
      </div>

      {editingExpense && (
        <AddExpenseModal
          isOpen={!!editingExpense}
          onClose={() => setEditingExpense(null)}
          expenseToEdit={editingExpense}
        />
      )}
    </div>
  );
};
