"use client"
import { Row, Col } from "react-bootstrap";
import styles from "./css/body.module.css"

export default function FPBody() {
    return (
        <div className={styles.main}>
            <div className={styles.mainGrid}>
                <div className={styles.card}>1</div>
                <div className={styles.card}>2</div>
                <div className={styles.card}>3</div>
            </div>
        </div>
    )
}