"use client"

import { Button, Form, Spinner, Row, Col, Alert, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useState, FormEvent, SyntheticEvent, useEffect } from "react";
import { BiSearchAlt } from 'react-icons/bi';
import { checkIfValidAddress } from "@/utils";
import { ethers, Contract, Signer } from "ethers";
import { useRouter } from "next/navigation";
import Style from "./css/top.module.css";
import Image from "next/image"
import Stock from "@/image/stockPage.svg"
import Security from "@/image/securityEllipse.svg"
import HandShake from "@/image/handshake.svg"
import Team from "@/image/team.svg"
import ContractWage from "@/image/contract.svg"
import ToolTip from "@/image/tooltip.svg"



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
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 50, hide: 900 }}
                    overlay={<Tooltip id="button-tooltip-2">Enter Organisation or Employee Address to find either, Enter Both to find Specific Employee from a specific Organisation</Tooltip>}
                >
                    <Image className="mx-3 my-auto" alt="tooltip" src={ToolTip} width={20} height={20} />
                </OverlayTrigger>
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
                </Form>
            </div>

            <div className={Style.grid}>
                <div>
                    <div className={Style.title}>
                        <h1 >Stock Manager</h1>
                        <p>A simple and secure way to manage StockOptions for Organizations and Employee in a Trustless Manner  </p>

                        <h3>To Create an Organisation</h3>
                        <Button variant="secondary">Create Organisation</Button>
                        <h3>For Employees</h3>
                        <Button variant="secondary">Employees</Button>
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

                <div className={Style.beta}>With Just a Click, You can Transfer your Vested Options to another Employee</div>

                <div className="d-flex justify-content-center"><Image
                    alt="secure"
                    src={HandShake}
                    width={100}
                    height={100}
                /></div>

                <div className={Style.beta} >Abstraction and Delegation</div>
                <div className={Style.delegationList} style={{ "textAlign": "center" }}>
                    <div>Gasless transaction</div>
                    <div>Ability to Delegate Stock Options and thus still partake in all activity the ownership of the said amount of stocks grants you </div>
                    <div>Ability to Assign Stocks to Stock Managers, to Manage the Stocks just the way it's currently done in TradFi and thus you can get your dividends maintaining the Status Quo </div>
                </div>
                <div className={Style.beta}>Zero Discrimination, Equal Access, Assured Security</div>
                <div className="d-flex justify-content-center"><Image
                    alt="secure"
                    src={Team}
                    width={300}




                /></div>
            </div>

        </>
    );

}