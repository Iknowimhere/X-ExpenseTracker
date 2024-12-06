import Modal from 'react-modal';
import './AddIncomeModal.css';

Modal.setAppElement('#root');

export const AddIncomeModal = ({ isOpen, onClose }) => {
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
          <input type="number" placeholder='Income Amount' required />
          <div className="button-group">
            <button type="submit" className='income-btn'>Add Income</button>
            <button type="button" className='cancel-btn' onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
