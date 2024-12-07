import Modal from 'react-modal';
import './AddExpenseModal.css';

Modal.setAppElement('#root');

export const AddExpenseModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
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
          <div className="input-group">
            <input type="text" placeholder='Title' />
            <input type="text" placeholder='Price' />
            <input type="text" placeholder='category' />
            <input type="text" placeholder='dd/mm//yy' />
          </div>
          <div className="button-group">
            <button type="submit" className='expense-btn'>Add Expense</button>
            <button type="button" className='cancel-btn' onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
