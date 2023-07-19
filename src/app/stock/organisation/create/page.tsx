"use client"
import {Button, Form, Spinner, Alert } from "react-bootstrap";
import { useState, useRef, SyntheticEvent, useEffect, } from "react";
import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "./../../constants";
import {ethers, Contract, Signer, providers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";
import { useMetaMask } from "@/utils";


import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum: any
  }
}
let provider: any;

if (typeof window !== 'undefined') {
provider = new ethers.providers.Web3Provider((window as any).ethereum);
}
export default function Create(){
    const [name, setName] = useState("");
    const [stockOptions, setStockOptions] = useState("");
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success")
    const [ifTxSuccess, setIfTxSuccess] = useState(false)
    const [soAddress, setSoAddress] = useState("");
    const [orgList, setOrgList] = useState(Array<string[]>);
    const [addressNameList, setAddressNameList] = useState(Array<{ address: string, name: string }>);


    let signer: Signer;
    let soContract: Contract;
    let soContractFactory: Contract;

    if (typeof window !== 'undefined') {
    signer = provider.getSigner();
    soContractFactory = new Contract(
      STOCK_OPTIONS_FACTORY_CONTRACT,
      STOCK_OPTIONS_FACTORY_ABI,
      signer,
    )
    soContract = new Contract(
      soAddress,
      STOCK_OPTIONS_CONTRACT_ABI,
      signer
    )
  }
  async function getAddressNames(){
        const GetAddressNames = await soContractFactory.getCreatorDeployedContracts();
        console.log(GetAddressNames);
      }
    useEffect(()=>{
      
      getAddressNames
      function handleWindow(){
        if(window.ethereum){
          } else{
          errorAlert("No Ethereum Compatible wallet was detected, Please click install MetaMask")
          setFormSubmitted(true);}
      }
      handleWindow();
    })

    const errorAlert = (message: string) => {
      try{
        setAlertVariant("danger")
      setAlertMessage(message);
      setShowAlert(true);
      }
      catch(error){
        console.log(error)
      }
      
    }
    

    async function handleSubmit(e: SyntheticEvent) {
       setLoading(true);
       setFormSubmitted(true);
        e.preventDefault();
        const _name = (name)?.toString().trim();
        const _stockOptions = (stockOptions)?.toString().trim();
        
        if(window.ethereum){
            if (_name && _stockOptions) {
                try {
                    const tokenContract = new Contract(
                        STOCK_OPTIONS_FACTORY_CONTRACT,
                        STOCK_OPTIONS_FACTORY_ABI,
                        signer,
                      )
                    const tX = await soContractFactory.createStockOptionsPlan(_name, _stockOptions)
                    
                    
                    const txReceipt = await tX.wait();
                    setIfTxSuccess(true)
                    
                    setSoAddress(txReceipt.events[0].address);
                    console.log(txReceipt.events[0].address);
                    
                    setAlertMessage("Successfully created and Organisation");
                    setShowAlert(true);
                } catch(error){
                    console.log(error)
                    setFormSubmitted(true);
                    errorAlert("Transaction Terminated")
                } finally {
                    setLoading(false)
                    setFormSubmitted(true);
                    
                }
              }
            else{
                errorAlert("(Invalid Query ! ) To prevent spam you have to Enter a Name and StockOptionsAmount")
                // setAlertVariant("danger")
                // setAlertMessage("(");
                // setShowAlert(true);
                setFormSubmitted(false);
            }}
            else{
              console.log("no wallet")
              setFormSubmitted(true);
              errorAlert("No Ethereum Compatible wallet was detected")
            }
    }
    
    


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

        <Form.Control type="number" placeholder="0" onChange={e => setStockOptions(e.target.value)} disabled={formSubmitted}/>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={formSubmitted}>
      {loading ?<Spinner animation="border" size="sm"/>:"Submit"}
      </Button>
    </Form>

    <div className="shadow p-3 mb-5 bg-white rounded">
      <h2>Details</h2>
      <br />
          {ifTxSuccess ?<div><p>Address: {soAddress}</p> </div>: <div>
            We are trying to develop the best product 
          </div> }

          <h3>All Created Accounts</h3>
          
        {/* {addressNameList} */}
          
    
  </div>
    </>
    )
}