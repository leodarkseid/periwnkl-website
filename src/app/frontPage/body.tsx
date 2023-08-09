"use client"
import { Row, Col } from "react-bootstrap";
import styles from "./css/body.module.css"
import Wage from "@/image/wage.svg";
import Image from "next/image"

export default function FPBody() {
    return (


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
            </div>
        </div>
    )
}