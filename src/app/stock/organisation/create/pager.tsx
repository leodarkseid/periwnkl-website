"use client"
import {Button, Form, Spinner, Alert, Card } from "react-bootstrap";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "./../../constants";
import {ethers, Contract, Signer, providers } from "ethers";
import Loading from "@/app/loading";
import { GoOrganization } from "react-icons/go";
import { ListCard, ListTitle } from "@/components/list";
import { soContractFactory } from "@/utils/contracts";





declare global {
  interface Window{
    ethereum: any
  }
}
let provider: any;

if (typeof window !== 'undefined') {
  try{
  provider = new ethers.providers.Web3Provider((window as any).ethereum);
}catch(error){
  console.error("provider couldn't be created", error)
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
    const [ifTxSuccess, setIfTxSuccess] = useState(false)
    const [soAddress, setSoAddress] = useState("");
    const [orgList, setOrgList] = useState(Array<string[]>);
    const [addressNameList, setAddressNameList] = useState(Array<{ newContractAddress: string, name: string }>);
    const [show, setShow] = useState(true);
    const [hover, setHover] = useState<string>("0");


    let signer: Signer ;
    let soContract: Contract;
    // let soContractFactory: Contract;

  try{
    signer = provider.getSigner();
    // soContractFactory = new Contract(
    //   STOCK_OPTIONS_FACTORY_CONTRACT,
    //   STOCK_OPTIONS_FACTORY_ABI,
    //   signer,
    // )
    soContract = new Contract(
      soAddress,
      STOCK_OPTIONS_CONTRACT_ABI,
      signer
    )
  } catch(error){
    console.error('Error creating Contracts', error)
  }


  const getAddressNames = useCallback(async () => {
    if (soContractFactory) {
        const GetAddressNames = await soContractFactory.getCreatorDeployedContracts();
        setAddressNameList(GetAddressNames);
        ifTxSuccess
      } else {
        console.error('soContractFactory is not defined');
      }
      }, [ifTxSuccess]);
      
    useEffect(()=>{
      getAddressNames()
      function handleWindow(){
        if(window.ethereum){
          } else{
          errorAlert("No Ethereum Compatible wallet was detected, Please click install MetaMask")
          setFormSubmitted(true);}
      }
      handleWindow();
    },[getAddressNames])

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
                errorAlert("(Invalid Query ! ) To prevent spam, you have to Enter a Name and StockOptionsAmount")
                // setAlertVariant("danger")
                // setAlertMessage("(");
                // setShowAlert(true);
                setFormSubmitted(false);
                setLoading(false);
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
        
          <Alert variant={alertVariant} onClose={() => setShow(false)} dismissible aria-disabled={false}>
            {alertMessage}
          </Alert>
          
        
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
      <Button className="w-full" variant="primary" type="submit" disabled={formSubmitted} style={{minWidth:"80px"}}>
      {loading ?<Spinner animation="border" size="sm"/>:"Submit"}
      </Button>
    </Form>
     
     {/* End of form */}
    
        {ifTxSuccess ? <Alert variant={alertVariant} onClose={() => (setShow(false))} dismissible>Address: {soAddress}</Alert>: null }
        <div className="mt-5">
               <ListTitle title="Created Organisations"  />
              {addressNameList.map((addressName, index) => ( 
                      <ListCard key={index} name={addressName.name} address={addressName.newContractAddress} emp={1} />
                  ))}   
        </div>
              
           

    </>
    )
}