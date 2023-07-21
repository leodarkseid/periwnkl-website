"use client";
import {Button, Form, Spinner, Row,Col, Alert} from "react-bootstrap";
import { useState, FormEvent , SyntheticEvent,useEffect} from "react";
import { BiSearchAlt } from 'react-icons/bi';
import { checkIfValidAddress } from "@/utils";
import {ethers, Contract, Signer} from "ethers";
import { Employee } from "./utils/search"
import {SearchForEmployeeDetails, SearchForOrganisation} from "./utils/search"


interface PageBoxProps {
    organisation: string;
    employee: string;
  }
  
      let provider:any;
      let signer: Signer;
      let soContract: Contract;
      let accounts: any[];
      let account:Promise<string>;
      let result: Employee ;



async function  connect() {
    if (typeof window !== "undefined") {
        try {
          provider = new ethers.providers.Web3Provider(window.ethereum)
          signer = provider.getSigner();
          console.log("ths should be  new signer",signer)
        } catch (error) {
          console.error("provider couldn't be found: Error,", error);
        } finally{
          
        }
      }
  }

export default function Employee() {
    const [organisation, setOrganisation] =useState("");
    const [employee, setEmployee] = useState("");
    const [S_organisation_, setOrganisation_] =useState("");
    const [S_employee_, setEmployee_] = useState("");
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success")
    const [show, setShow] = useState(true);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [organisationName_, setOrganisationName] = useState("");
    const [totalStockOptions_, setTotalStockOptions] = useState("");
    const [stockOptions_, setStockOptions] = useState("");
    const [vestingSchedule_, setVestingSchedule] = useState("");
    const [vestingCountdown_, setVestingCountdown] = useState("");
    const [vestedOptions_, setVestedOptions] = useState("");
    const [excercisedOptions_, setExcercisedOptions] = useState("");

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        if(S_employee_ !=="" ){
            connect();
                if (S_organisation_ === ""){
                    const orgs: string[] | any = SearchForOrganisation(signer, S_employee_);
                    console.log("from page", orgs)
                
                    for(const temp of orgs){
                        getD(temp, S_employee_);
                        console.log("submit called")
                    }
                }
                else if(S_organisation_ !== ""){getD(S_organisation_, S_employee_)}
                else{
                    handleAlert("danger", "Invalid")
                    }
            }   
    }

    async function getD(organisation:string, employee: string){
        try{  
           
            console.log("expected signer", signer)
            result = await SearchForEmployeeDetails(organisation, signer, employee) as Employee;
            console.log(result)
            setOrganisationName(result?.organisationName)    
            setTotalStockOptions(result?.totalStockOptions)
            setStockOptions(result?.checkSO)
            setVestingSchedule(result?.checkVS)
            setVestingCountdown(result?.vestingCountdown)
            setVestedOptions(result?.getVestedOptions)
            setExcercisedOptions(result?.getExcercised)       
            console.log(result)
          } catch(error){
            console.error("error is from 2",error)
          }}

    function handleClose(){
        setShow(false)
        setShowAlert(false)
    }

    useEffect(()=>{
    const handleFormChanges = (()=>{
        handleClose();
        
        const organisation_:string = (organisation)?.toString().trim() as string;
        const employee_:string = (employee)?.toString().trim() as string;
        try{
        if(organisation_ !== "" || employee_ !== ""){  
            if( organisation_ === ""? checkIfValidAddress([employee_]) === true : checkIfValidAddress([organisation_,employee_]) === true){
                setDisableSubmit(false);
                setValidated(true);
                handleAlert("success", "Looks Good !")
                setOrganisation_(organisation_);
                setEmployee_(employee_);
            } else{
                setDisableSubmit(true)
                setValidated(false);
                console.log("success")
                handleAlert("danger","Please use a valid Address !")
                setShowAlert(true)
            }
        }
    }catch(error){
        console.error
    } finally{
        setValidated(false)
        
    }
    
    })
    handleFormChanges()
}, [employee,organisation])


const handleAlert = ((variant: string, msg:string) => {
    setAlertMessage(msg);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(()=>{
        setShowAlert(false);
        setAlertMessage("");
    },10000)
})

    return (
        <>
        {showAlert && (
        <Alert variant={alertVariant} onClose={() => handleClose()} dismissible className="w-25 justify-content-center text-center mx-auto">
        {alertMessage}
        </Alert>)}
            <div className="container d-flex justify-content-center p-2">
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}  className="w-50">
                    <Form.Group className="mb-3" controlId="search-input">
                        <Form.Label>Search for Employee </Form.Label>
                            <Row className="p-0">
                                <Col className="px-0">
                                    <Form.Control className="border-end-0 rounded-0 rounded-start" name="organisation" onChange={e => setOrganisation(e.target.value)} placeholder="Organisation Address"/>
                                    <Form.Control.Feedback type="valid">Thanks</Form.Control.Feedback>
                                  </Col>
                                <Col className="px-0">
                                    <Form.Control className="border-end-0 rounded-0" name="employee" onChange={e => setEmployee(e.target.value)} placeholder="Employee Address"/>
                               </Col>
                                <Col className="p-0" xs={1} >
                                    <Button type="submit" className=" rounded-0 rounded-end" disabled={disableSubmit} >
                                        <BiSearchAlt />
                                    </Button></Col></Row>
                    </Form.Group>
                </Form>
            </div>
            <div className="shadow p-3 mb-5 mt-5 bg-white rounded">
          <table className="table table-hover table-responsive">
          <thead>
              <tr>
                <th>Organisation Name</th>
                <td> 
                  {organisationName_}
                  </td>
              </tr>
              <tr>
                <th>Total Stock Options</th>
                <td> 
                  {totalStockOptions_}
                  </td>
              </tr>
              <tr>
                <th>Stock Options</th>
                <td> 
                    {stockOptions_}
                  </td>
              </tr>
              <tr>
                <th>Vesting Schedule</th>
                <td> 
                    {vestingSchedule_}
                  </td>
              </tr>
              <tr>
                <th>Vesting Countdown</th>
                <td> 
                  {vestingCountdown_}
                  </td>
              </tr>
              <tr>
                <th>Vested Options</th>
                <td> 
                  {vestedOptions_}
                  </td>
              </tr>
              <tr>
                <th>Excercised Options</th>
                <td> 
                  {excercisedOptions_}
                  </td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        </>
    );
}