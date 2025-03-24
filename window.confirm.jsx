import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Cart() {
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  // ... other code ...

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      setItemToRemove(id);
      setShowModal(true);
    }
  };

  const confirmRemove = () => {
    removeFromCart(itemToRemove);
    setShowModal(false);
    setItemToRemove(null);
  };

  return (
    // ... other JSX ...
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Removal</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to remove this item from the cart?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={confirmRemove}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
    // ... rest of JSX ...
  );
}