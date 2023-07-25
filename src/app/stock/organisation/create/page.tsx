"use client"
import {Button, Form, Spinner, Alert, Card } from "react-bootstrap";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { ListCard, ListTitle } from "@/components/list";
import { useMetaMask } from "@/hooks/useMetaMask";
import { CreateStockOptionsPlan, GetListOfCreatedOrgs } from "@/utils/contracts";

import { useRouter } from "next/navigation";


    
export default function Create(){
    const [name, setName] = useState("");
    const [stockOptions, setStockOptions] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [resultLoading, setResultLoading] = useState(false);
    const [pageDisabled, setPageDisabled] = useState(false);
    const [ifTxSuccess, setIfTxSuccess] = useState(false)
    const [soAddress, setSoAddress] = useState("");
    const [addressNameList, setAddressNameList] = useState(Array<{contractAddress: string, name: string}>);
    //for alert
    const [show, setShow] = useState(true);
    

    const { wallet, hasProvider, isConnecting,signer, connectMetaMask } = useMetaMask()

    const router = useRouter()

    async function handleSubmit(e: SyntheticEvent){
        e.preventDefault();
        setSubmitLoading(true);
        setPageDisabled(true);
        
        const _name = (name)?.toString().trim();
        const _stockOptions = (stockOptions);

        if(wallet.accounts.length >= 1){
                try{
                const soAddress = await CreateStockOptionsPlan(_name, _stockOptions);

                setIfTxSuccess(true);
                setSoAddress(soAddress);
               } catch(error){
                console.error("error from create org page", error)
                } finally {
                    setSubmitLoading(false)
                    setPageDisabled(false);
               }
        } else{
          e.stopPropagation();
        }
      }

  

    useEffect(()=>{
      setPageDisabled(wallet.accounts.length < 1 || submitLoading == true || resultLoading == true );
      (async () => {
        try{
        const listResult = await GetListOfCreatedOrgs();
        setAddressNameList(listResult);
      }catch(error){console.error(error)}
      })();

      setTimeout(()=>{
        if(ifTxSuccess === true){
          setIfTxSuccess(false)
        }
      },300000)
    }, [wallet.accounts.length,submitLoading, resultLoading, ifTxSuccess])
    
    return(
        <>
       

      <Form onSubmit={handleSubmit} className="mb-5">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Organisation Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Organisation Name"  onChange={e => setName(e.target.value)} disabled={pageDisabled} required/>
            <Form.Text className="text-muted">
            You can always change the name later
            </Form.Text>
          </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Total amount of stock Options</Form.Label>

        <Form.Control type="number" placeholder="0" onChange={e => setStockOptions(Number(e.target.value))} disabled={pageDisabled} required/>
      </Form.Group>
      <Button className="w-full" variant="primary" type="submit" disabled={pageDisabled} style={{minWidth:"80px"}}>
      {submitLoading ?<Spinner animation="border" size="sm"/>:"Submit"}
      </Button>
    </Form>
     
     {/* End of form */}
    
        {ifTxSuccess && <Alert variant="success" onClose={() => (setShow(false))} dismissible>New Organisation Successfully Created !  <br /><br />  Address: <a href={`https://explorer.goerli.linea.build/address/${soAddress}`} target="_blank" rel="noopener noreferrer">{soAddress}</a></Alert>}
        <div className="mt-2">
               <ListTitle title="Created Organisations"  />
              {addressNameList.map((addressName, index) => ( 
                      <div onClick={(()=>router.push("/stock"))} key={index}><ListCard key={index} name={addressName.name} address={addressName.contractAddress} emp={1} /></div>
                  ))}   
        </div>
              
           

    </>
    )
}