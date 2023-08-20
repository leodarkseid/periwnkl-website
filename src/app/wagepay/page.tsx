"use client"

import { Button, Form, Spinner, Row, Col, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, FormEvent, SyntheticEvent, useEffect } from "react";
import { BiSearchAlt } from 'react-icons/bi';
import { checkIfValidAddress } from "@/utils";
import { ethers, Contract, Signer } from "ethers";
import { useRouter } from "next/navigation";
import Style from "./css/top.module.css";
import Image from "next/image"
import Stock from "@/image/stockPage.svg"
import Security from "@/image/securityEllipse.svg"
import SupportMo from "@/image/supportMO.svg"
import HandShake from "@/image/handshake.svg"
import Team from "@/image/team.svg"
import ContractWage from "@/image/contract.svg"
import Sec from "@/image/homeCircle.svg"
import Link from "next/link";
import ToolTip from "@/image/tooltip.svg"


export default function Page() {
    // const [organisation, setOrganisation] = useState("");
    // const [employee, setEmployee] = useState("");
    // const [validated, setValidated] = useState(false);
    // const [disableSubmit, setDisableSubmit] = useState(false);
    // const [loading, setLoading] = useState(false);

    // const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()

    // async function handleSubmit(e: SyntheticEvent) {
    //     e.preventDefault();
    //     setDisableSubmit(true);
    //     setLoading(true);

    //     const org = (organisation)?.toString().trim();
    //     const emp = (employee)?.toString().trim();

    //     if (wallet.accounts.length >= 1) {
    //         try { 
    //         if (org == "") {
    //             null
    //         }
    //         else if (emp == "") {
    //             null
    //         }
    //         else {
    //             null
    //         }
    //     } catch(error){
    //         console.error("search error", error)
    //     }
    //     }
    // }

    return (
        <>
            {/* <div className="container d-flex justify-content-center p-2">
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
            </div> */}

            <div className={Style.grid}>
                <div>
                    <div className={Style.title}>
                        <h1 >Wage Pay</h1>
                        <p>
                            A Simple Wage Manager, that automates wage payment and also assures Employees of Payment for at least One Payment Cycle
                        </p>
                    </div>
                    <div className={Style.todo}>For Organisations</div>
                    <Link href="/wagepay/organisation"><Button variant="primary">Organisation</Button></Link>
                    <div className={Style.todo}>For Employees</div>
                    <Link href="/wagepay/employee"><Button variant="primary">Employees</Button></Link>
                </div>
                <div>
                    <div>
                        <Image
                            alt="stock"
                            src={ContractWage} />
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

                <div className={Style.beta}>Support For Multiple Organisations for Both Admins and Employees</div>
                <div className="d-flex justify-content-center"><Image
                    alt="secure"
                    src={SupportMo}
                    width={300}
                    height={300}
                /></div>

                <div className={Style.beta}>The Contract is designed to protect Employees</div>

                <div className="d-flex justify-content-center"><Image
                    alt="secure"
                    src={Sec}
                    width={100}
                    height={100}
                /></div>

                <div className={Style.beta} >Abstraction and Delegation</div>
                <div className={Style.delegationList} style={{ "textAlign": "center" }}>
                    <div>Gasless transaction</div>
                    <div>Ability to Delegate Wages and have access to unlimited use cases like Auto Purchase, Auto Save and so much more </div>

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