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
import Security from "@/image/securityEllipse.svg"


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


            <div className="container d-flex justify-content-center p-2">

                <Form noValidate validated={validated} className="w-50">
                    <Form.Group className="mb-1" controlId="search-input">
                        
                        <Row className="p-0">
                            <Col className="px-0">
                                <Form.Control className="border-end-0 rounded-0 rounded-start shadow-sm" name="organisation" placeholder="Organisation Address" />
                                <Form.Control.Feedback type="valid">Thanks</Form.Control.Feedback>
                            </Col>
                            <Col className="px-0">
                                <Form.Control className="border-end-0 rounded-0 shadow-sm" name="employee" placeholder="Employee Address" />
                            </Col>
                            <Col className="p-0" xs={1} >
                                <Button type="submit" className=" rounded-0 rounded-end shadow-sm" >
                                    <BiSearchAlt />
                                </Button></Col></Row>
                    </Form.Group>
                    <Form.Label className="text-altYellow text-center mt-0">Enter Organisation or Employee Address to find either, Enter Both to find Specific Employee from a specific organisation   </Form.Label>
                </Form>
            </div>

            <div className={Style.grid}>
                <div>
                    <div className={Style.title}>
                        <h1 >Stock Manager</h1>
                        <p>A simple and secure way to manage StockOptions for Organizations and Employee in a Trustless Manner  </p>
                    </div>
                </div>
                <div>
                    <div>
                        <Image
                            alt="stock"
                            src={Stock} />
                    </div>
                </div>
            </div>

            <div>
                <div className={Style.beta}>Built With Smart Contracts, with the strength and advantage of Blockchain Technology</div>
                <div className="d-flex justify-content-center"><Image
                alt="secure"
                src={Security}
                width={100}
                height={100}
                /></div>

                <div className={Style.beta}>You can Transfer your Vested Options</div>
                

                <div>Ability to Delegate Stock Options and thus still partake in all activity the ownership of the said amount of stocks grants you</div>

                <div>Ability to Assign Stocks to Stock Managers, to Manage the Stocks just the way it's currently done in TradFi and thus you can get your dividends just </div>
            </div>

        </>
    );

}