"use client";
import {Button, Form, Spinner, Row,Col, Alert} from "react-bootstrap";
import { useState, FormEvent , SyntheticEvent,useEffect} from "react";
import PageBox from "./pageBox";
import { BiSearchAlt } from 'react-icons/bi';
import { checkIfValidAddress } from "@/utils";


export default function Employee() {
    const [organisation, setOrganisation] =useState("");
    const [employee, setEmployee] = useState("");
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success")
    const [show, setShow] = useState(true);
    const [disableSubmit, setDisableSubmit] = useState(false);

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const _organisation:string = (organisation)?.toString().trim() as string;
        const _employee: string = (employee)?.toString().trim() as string;
        
        console.log("doesn't do anything")
    }

    function handleClose(){
        setShow(false)
        setShowAlert(false)
    }

    useEffect(()=>{
    const handleFormChanges = (()=>{
        handleClose();
        
        const organisation_:string = (organisation)?.toString().trim() as string;
        const employee_:string = (employee)?.toString().trim() as string;
        console.log("from page",[organisation_, employee_])
        try{
        if(organisation_ !== "" || employee_ !== ""){  
            if( organisation_ === ""? checkIfValidAddress([employee_]) === true : checkIfValidAddress([organisation_,employee_]) === true){
                setDisableSubmit(false);
                setValidated(true);
                handleAlert("success", "Looks Good !")
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
        PageBox(organisation_, employee_)
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
            <PageBox />
        </>
    );
}