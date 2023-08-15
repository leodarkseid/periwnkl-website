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
import Link from 'next/link';




export default function Body() {

    return (
        <>

            <div className={Style.grid}>
                <div>
                    <div className={Style.title}>
                        <h1 >Stock Manager</h1>
                        <p>A simple and secure way to manage StockOptions for Organizations and Employee in a Trustless Manner  </p>
                    </div>
                    <div className={Style.todo}>To Create an Organisation</div>
                    <Link href="/stock/organisation/create"><Button variant="primary">Create Organisation</Button></Link>
                    <div className={Style.todo}>For Employees</div>
                    <Link href="/stock/employee"><Button variant="primary">Employees</Button></Link>
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