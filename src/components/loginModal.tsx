"use client"

import { Button, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from '@/redux/hooks';
import { setAuth } from '@/redux/features/authSlice';



interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
  handleSwitchModal: () => void; // Function to switch to the create modal
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose, handleSwitchModal }) => {
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try{
    setSearchResultsLoading(true);
    const response = await fetch("http://127.0.0.1:8000/user/login/",{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        address:wallet,
        password
    })
  });

    if(!response.ok){
      throw new Error('Failed to fetch data')
  }
  const data = {"msg":"Login Success"}
  console.log(data.msg);

  if (data.msg === "Login Success"){
    {setWallet("")}
  {setPassword("")}
  setFormSubmitted(true)
  dispatch(setAuth());
  router.push('/home')
  
  } else if(data.msg === "User login failed, password error!"){
    setAlertMessage("Login failed,  Invalid Password or Address")
    setShowAlert(true)
    
  } else if(data.msg === "Request exception!") {
    setAlertMessage("Invalid Data")
    setShowAlert(true)
    
  }
  else {
    setAlertMessage(data.msg)
    setShowAlert(true)
    
  }

  
}catch (error){
  console.error("Error:", error);
  setAlertMessage("An error occurred. Please try again.");
  setShowAlert(true);
  setFormSubmitted(false);
} finally {
  setSearchResultsLoading(false);
  setFormSubmitted(false);
}
};


useEffect(() => {
  // Reset showAlert when the modal is shown or closed
  if (show) {
    setShowAlert(false);
  }
}, [show]);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="d-flex flex-column align-items-center">
                {searchResultsLoading && <Spinner animation="border" />}
               </div>
        {/* Conditionally render the alert */}
        {showAlert && (
          <Alert variant="danger">
            {alertMessage}
          </Alert>
          
        )}
        <Form onSubmit={submit}>
          {/* Add your login form content here */}
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
          Create User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
