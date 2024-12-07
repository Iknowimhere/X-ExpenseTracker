import Modal from 'react-modal';


Modal.setAppElement('#root');

export const AddTransactionModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className='modal-content'
      overlayClassName='modal-overlay'
    >
      <div className='modal-header'>
        <h2>Add Expense</h2>
      </div>
    </Modal>
  );
};
