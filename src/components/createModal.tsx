"use client"
import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { SyntheticEvent, useState, useEffect } from "react";


interface CreateModalProps {
  show: boolean;
  handleClose: () => void;
  handleSwitchModal: () => void; // Function to switch to the login modal
}

const CreateModal: React.FC<CreateModalProps> = ({ show, handleClose, handleSwitchModal }) => {
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);



  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
    setSearchResultsLoading(true);
    setFormSubmitted(true)
    const response = await fetch("http://127.0.0.1:8000/user/create/",{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        address:wallet,
        password
    })
  });
  const data = await response.json();

  if(data.msg ==="User registration succeeded!"){

    setAlertMessage("Successfully Created a New User");
    setShowAlert(true);
    setFormSubmitted(true);
  } else {
    setAlertMessage(data.msg);
    setShowAlert(true);
    setFormSubmitted(false);
  }
} catch(error){
  console.error(error);
  }finally {
  setSearchResultsLoading(false);
}

  setShowAlert(true);
  setWallet(""); 
  setPassword("");
  };
  useEffect(() => {
    // Reset showAlert when the modal is shown or closed
    if (show) {
      setShowAlert(false);
      setFormSubmitted(false)
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="d-flex flex-column align-items-center">
                {searchResultsLoading && <Spinner animation="border" />}
               </div>

        {/* Conditionally render the alert */}
        {showAlert && (
          <Alert>
            {alertMessage}
            <br />
            
            <Button variant="success" size="sm" onClick={handleSwitchModal} >
          Login
        </Button>
          </Alert>
          
        )}


        <Form onSubmit={submit}>
          {/* Add your create user form content here */}
          <Form.Group className="mb-3" controlId="wallet.ControlInput1">
            <Form.Label>Wallet Address</Form.Label>
            <Form.Control type="wallet" placeholder="0x0000000" autoFocus onChange={e => setWallet(e.target.value)} value={wallet} disabled={formSubmitted}/>
            
          </Form.Group>
          <Form.Group className="mb-3" controlId="password.ControlInput1">
          <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} value={password} disabled={formSubmitted}/>
          </Form.Group>
          
            <Button className="mb-3" variant="success" type="submit" disabled={formSubmitted}>
            Submit
            </Button>
        </Form>

        <p>Or</p>

        <Button variant="primary" disabled={formSubmitted}>
            Connect Wallet
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleSwitchModal} disabled={formSubmitted}>
          Login Instead
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

export default CreateModal;
