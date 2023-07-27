"use client"
import {Button, Form, Spinner, Alert, Card } from "react-bootstrap";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { ListCard, ListTitle } from "@/components/list";
import { useMetaMask } from "@/hooks/useMetaMask";
import { CreateStockOptionsPlan, GetListOfCreatedOrgs, GetNumberOfEmployee } from "@/utils/contracts";
import { BigNumber,utils} from "ethers";

import { useRouter } from "next/navigation";


interface EmployeeData {
  name: string;
  address: string;
  emp: number;
}
    
export default function Create(){
    const [name, setName] = useState("");
    const [stockOptions, setStockOptions] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [resultLoading, setResultLoading] = useState(false);
    const [pageDisabled, setPageDisabled] = useState(false);
    const [ifTxSuccess, setIfTxSuccess] = useState(false)
    const [soAddress, setSoAddress] = useState("");
    //for alert
    const [show, setShow] = useState(true);
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
    

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
      setPageDisabled(wallet.accounts.length < 1 || submitLoading == true );
      const fetchData = async () => {
        setResultLoading(true);
        try {

                  //cache
        const cache = await caches.open('my-cache');
        const cachedResponse = await cache.match('employee-data');
        if (cachedResponse) {
          // If the data is cached, use it
          const data = await cachedResponse.json();
          setEmployeeData(data);
        }

          const listResult = await GetListOfCreatedOrgs();
          const data = await Promise.all(
            listResult.map(async (addressObj: { newContractAddress: string; name: any; }) => {
              const empCount = await GetNumberOfEmployee(addressObj.newContractAddress);
              return {
                name: addressObj.name,
                address: addressObj.newContractAddress,
                emp: (empCount),
              };
            })
          );
          await cache.put(
            'employee-data',
            new Response(JSON.stringify(data), {
              headers: { 'Content-Type': 'application/json' },
            })
          );
          setResultLoading(false);
          setEmployeeData(data);
        } catch (error) {
          console.error(error);
        } finally {
          setResultLoading(false);
        }
      };
  
      fetchData();
      setTimeout(()=>{
        if(ifTxSuccess === true){
          setIfTxSuccess(false)
        }
      },300000)
    }, [wallet.accounts.length,submitLoading, ifTxSuccess])

    
    
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
              {resultLoading && <Spinner animation="border" className=" mt-3 d-block mx-auto text-success" />} 
              {employeeData.map((data, index) => ( 
                      <div onClick={(()=>router.push("/stock"))} key={index}><ListCard key={index} name={data.name} address={data.address} emp={data.emp} /></div>
                  ))}   
        </div>
              
           

    </>
    )
}