"use client"
import { Row, Col } from "react-bootstrap";
import styles from "./css/body.module.css"
import Wage from "@/image/wage.svg";
import Stock from "@/image/stock.svg";
import Image from "next/image"

export default function FPBody() {
    return (
        <>

            <div className={styles.main}>
                <div className={styles.mainGrid}>
                    <div className={styles.card}>
                        <Col>
                            <Image
                                alt="LogoText"
                                src={Wage}
                                width="300"
                                height="300"
                            />
                            <div className={styles.card_below}>
                                <h3>WagePay</h3>
                                <p>A Fully Onchain product for organizing and managing employee Wages</p>
                            </div>
                        </Col>
                    </div>
                    <div className={styles.card}>
                        <Col>
                            <Image
                                alt="LogoText"
                                src={Stock}
                                width="300"
                                height="300"
                            />
                            <div className={styles.card_below}>
                                <h3>StockOptions</h3>
                                <p>A Fully Onchain product for organizing and managing employee Wages</p>
                            </div>
                        </Col>
                    </div>
                    <div className={styles.card}>
                        <Col>
                            <Image
                                alt="LogoText"
                                src={Wage}
                                width="300"
                                height="300"
                            />
                            <div className={styles.card_below}>
                                <h3>CRM</h3>
                                <p>A CRM built with power of Delegation, supports selective sharing of sensitive data for Protocols</p>
                            </div>
                        </Col>
                    </div>
                    <div className={styles.card}>
                        <Col>
                            <Image
                                alt="LogoText"
                                src={Wage}
                                width="300"
                                height="300"
                            />
                            <div className={styles.card_below}>
                                <h3>Tax Manager</h3>
                                <p>An Onchain product that allows Taxes to be processed seamlessly</p>
                            </div>
                        </Col>
                    </div>
                </div>


            </div>
            <div className="text-primary text-center mt-5 mb-3"> <h5> Mission: To build Products that Utilizes the uniqueness and strength of Ethereum Like Blockchains</h5> </div>
        </>
    )
}