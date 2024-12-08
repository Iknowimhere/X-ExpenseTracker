import Modal from 'react-modal';
import { useExpense } from '../../context/ExpenseContext';
import { useSnackbar } from 'notistack';
import './AddIncomeModal.css';

Modal.setAppElement('#root');

export const AddIncomeModal = ({ isOpen, onClose }) => {
  const { addIncome } = useExpense();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(e.target.amount.value);
    
    if (amount <= 0) {
      enqueueSnackbar('Please enter a valid amount', { 
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      });
      return;
    }

    addIncome(amount);
    enqueueSnackbar(`Successfully added ₹${amount} to wallet`, {
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }
    });
    
    e.target.reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className='modal-content'
      overlayClassName='modal-overlay'
    >
      <div className='modal-header'>
        <h2>Add Income</h2>
      </div>
      <div className='modal-body'>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            name="amount"
            placeholder='Income Amount' 
            min="0"
            step="0.01"
            required 
          />
          <div className="button-group">
            <button type="submit" className='income-btn'>Add Income</button>
            <button type="button" className='cancel-btn' onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
