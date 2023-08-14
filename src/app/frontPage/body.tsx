"use client"

import styles from "./css/body.module.css"
import Wage from "@/image/wage.svg";
import Stock from "@/image/stock.svg";
import Crm from "@/image/crm.svg";
import Image from "next/image"
import Link from 'next/link';

export default function FPBody() {
    return (
        <>

            <div className={styles.main}>
                
                <div className={styles.mainGrid}>
                    <Link href="/wagepay">
                    <div className={styles.card}>
                        <div className="d-flex justify-content-center">
                            <Image
                                alt="LogoText"
                                src={Wage}
                                width="300"
                                height="300"
                            />
                        </div>
                        <div className={styles.card_below}>
                            <h3>WagePay</h3>
                            <p>A Fully Onchain product for organizing and managing employee Wages</p>
                        </div>

                    </div>
                    </Link>
                    <Link href="/stock">
                        <div className={styles.card}>
                            <div className="d-flex justify-content-center">
                                <Image
                                    style={{ "maxHeight": "300px", "maxWidth": "300px", "position": "relative" }}
                                    alt="LogoText"
                                    src={Stock}
                                    width="300"
                                    height="300"
                                />
                            </div>
                            <div className={styles.card_below}>
                                <h3>StockOptions</h3>
                                <p>A Fully Onchain product for organizing and managing employee Wages</p>
                            </div>

                        </div>
                    </Link>
                    <div className={styles.card}>
                        <div className="d-flex justify-content-center">
                            <Image
                                style={{ "maxHeight": "300px", "maxWidth": "300px", "position": "relative" }}
                                alt="LogoText"
                                src={Crm}
                                width="300"
                                height="300"
                            />
                        </div>
                        <div className={styles.card_below}>
                            <h3>CRM</h3>
                            <p>A CRM built with power of Delegation, supports selective sharing of sensitive data for Protocol</p>
                        </div>

                    </div>
                    <div className={styles.card}>
                        <div className="d-flex justify-content-center">
                            <Image
                                alt="LogoText"
                                src={Wage}
                                width="300"
                                height="300"
                            />
                        </div>
                        <div className={styles.card_below}>
                            <h3>Tax Manager</h3>
                            <p>An Onchain product that allows Taxes to be processed seamlessly</p>
                        </div>

                    </div>
                </div>


            </div>
            <div className="text-primary text-center mt-5 mb-3"> <h5> Mission: To build Products that Utilizes the uniqueness and strength of Ethereum Like Blockchains</h5> </div>
        </>
    )
}