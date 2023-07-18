"use client"
import {Button, Form, Spinner, Alert } from "react-bootstrap";
import { useState, SyntheticEvent, } from "react";
import { STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "./../../constants";
import {ethers, Contract} from "ethers";

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

export default function Create(){
    const [name, setName] = useState("");
    const [stockOptions, setStockOptions] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success")
    
    if((window as any).ethereum){
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    
    const signer = provider.getSigner();
    }
    
    

    

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const _name = (name)?.toString().trim();
        const _stockOptions = (stockOptions)?.toString().trim();

        if (_name && _stockOptions) {
            try {
                const tokenContract = new Contract(
                    STOCK_OPTIONS_FACTORY_CONTRACT,
                    STOCK_OPTIONS_FACTORY_ABI,
                    signer,
                  )
                const tX = await tokenContract.createStockOptionsPlan("Example")
                setFormSubmitted(true);
                setLoading(true);
                const txReceipt = await tX.wait();
                console.log(txReceipt);
                
                setAlertMessage("Successfully created and Organisation");
                setShowAlert(true);
            } catch(error){
                console.log(error)
                setAlertVariant("danger")
                setAlertMessage("An error occurred. Please try again.");
                setShowAlert(true);
                setFormSubmitted(false);
            } finally {
                setLoading(false);
                
            }
    }
    else{
        setAlertVariant("danger")
        setAlertMessage("(Invalid Query ! ) To prevent spam you have to Enter a Name and StockOptionsAmount");
        setShowAlert(true);
        setFormSubmitted(false);
    }}

    return(
        <>
               {/* Conditionally render the alert */}
        {showAlert && (
          <Alert variant={alertVariant}>
            {alertMessage}
          </Alert>
          
        )}
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Organisation Name</Form.Label>
        <Form.Control type="name" placeholder="Enter Organisation Name" autoFocus onChange={e => setName(e.target.value)} disabled={formSubmitted}/>
        <Form.Text className="text-muted">
          You can always change the name later
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Total amount of stock Options</Form.Label>
        <Form.Control type="number" placeholder="0" autoFocus onChange={e => setStockOptions(e.target.value)} disabled={formSubmitted}/>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={formSubmitted}>
      {loading ?<Spinner animation="border" size="sm"/>:"Submit"}
      </Button>
    </Form>
    </>
    )
}