import Modal from 'react-modal';
import { useExpense } from '../../context/ExpenseContext';
import './AddExpenseModal.css';

Modal.setAppElement('#root');

export const AddExpenseModal = ({ isOpen, onClose, expenseToEdit = null }) => {
  const { addExpense, editExpense } = useExpense();

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      title: e.target.title.value,
      amount: parseFloat(e.target.amount.value),
      category: e.target.category.value,
      date: e.target.date.value,
    };

    const success = expenseToEdit 
      ? editExpense(expenseToEdit.id, expense)
      : addExpense(expense);

    if (success) {
      e.target.reset();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className='modal-content'
      overlayClassName='modal-overlay'
    >
      <div className='modal-header'>
        <h2>{expenseToEdit ? 'Edit Expense' : 'Add Expense'}</h2>
      </div>
      <div className='modal-body'>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
              type="text" 
              name="title"
              placeholder='Title'
              defaultValue={expenseToEdit?.title}
              required 
            />
            <input 
              type="number" 
              name="amount"
              placeholder='Amount'
              min="0"
              step="0.01"
              defaultValue={expenseToEdit?.amount}
              required 
            />
            <select 
              name="category" 
              defaultValue={expenseToEdit?.category || ''}
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills">Bills</option>
              <option value="Others">Others</option>
            </select>
            <input 
              type="date" 
              name="date"
              defaultValue={expenseToEdit?.date}
              required 
            />
          </div>
          <div className="button-group">
            <button type="submit" className='expense-btn'>
              {expenseToEdit ? 'Update Expense' : 'Add Expense'}
            </button>
            <button type="button" className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
