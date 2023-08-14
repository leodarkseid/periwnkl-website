"use client"

import { Button, Form, Spinner, Row, Col, Alert } from "react-bootstrap";
import { useState, FormEvent, SyntheticEvent, useEffect } from "react";
import { BiSearchAlt } from 'react-icons/bi';
import { checkIfValidAddress } from "@/utils";
import { ethers, Contract, Signer } from "ethers";
import { useRouter } from "next/navigation";
import Style from "./css/top.module.css";
import Image from "next/image"
import Stock from "@/image/stockPage.svg"


export default function Body() {
    const [organisation, setOrganisation] = useState("");
    const [employee, setEmployee] = useState("");
    const [S_organisation_, setOrganisation_] = useState("");
    const [S_employee_, setEmployee_] = useState("");
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState("success")
    const [show, setShow] = useState(true);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [orgList, setOrgList] = useState<string[]>([]);

    return (
        <>
            <div className={Style.top}>

                <div className="container d-flex justify-content-center p-2">

                    <Form noValidate validated={validated} className="w-50">
                        <Form.Group className="mb-3" controlId="search-input">
                            <Form.Label>Search for Employee </Form.Label>
                            <Row className="p-0">
                                <Col className="px-0">
                                    <Form.Control className="border-end-0 rounded-0 rounded-start" name="organisation" placeholder="Organisation Address" />
                                    <Form.Control.Feedback type="valid">Thanks</Form.Control.Feedback>
                                </Col>
                                <Col className="px-0">
                                    <Form.Control className="border-end-0 rounded-0" name="employee" placeholder="Employee Address" />
                                </Col>
                                <Col className="p-0" xs={1} >
                                    <Button type="submit" className=" rounded-0 rounded-end" >
                                        <BiSearchAlt />
                                    </Button></Col></Row>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <div className={Style.grid}>
                <div>
                    <div className={Style.title}>
                        <h1 >Stock Options Manager</h1>
                        <p>Stock options manager is a simple and secure way to manage StockOptions for Organizations and Employee in a Trustless Manner  </p>
                    </div>
                </div>
                <div>
                    <div>
                        <Image
                        alt="stock" 
                        src={Stock}/>
                    </div>
                </div>
            </div>

        </>
    );

}