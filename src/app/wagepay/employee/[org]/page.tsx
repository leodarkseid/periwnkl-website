"use client";
import { useParams } from "next/navigation"
import styles from "./css/page.module.css"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { useState } from "react";
import { CountdownProp } from "../../utils/contracts";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";

export default function Page() {
    const [countdownLoading, setCountDownLoading] = useState(false);
    const [countdown, setCountdown] = useState<CountdownProp>();

    const params: Params = useParams()
    const orgAddr = params.org
    return (
        <>
            <div className="bg-primary rounded text-center text-white p-2 w-100">{orgAddr}</div>
            <div className={"container-xl bg-white h-75 w-75 rounded shadow mt-5 mx-auto d-flex flex-column justify-content-center p-5"}>
                <div className={styles.main_grid__timer_box}>
                    <div className={styles.main_grid__timer_box__small_grid}>
                        <div className={styles.main_grid__timer_box_days__val}>{countdownLoading ? <Spinner /> : countdown?.days}</div>
                        <div className={styles.main_grid__timer_box_hours__val}>{countdownLoading ? <Spinner /> : countdown?.hours}</div>
                        <div className={styles.main_grid__timer_box_mins__val}>{countdownLoading ? <Spinner /> : countdown?.minutes}</div>
                        <div className={styles.main_grid__timer_box_days}>Days</div>
                        <div className={styles.main_grid__timer_box_hours}>Hours</div>
                        <div className={styles.main_grid__timer_box_mins}>Min</div>
                    </div>
                </div>
                <div className="rounded-pill w-50 bg-primary bg-gradient mx-auto text-center text-white">Wages Countdown</div>
                <div className="rounded w-50 bg-transparent mx-auto text-center text-primary mt-5 border border-primary border-2">Token Address: 0x8w9w9ewe9w0 </div>

                <Card className="bg-transparent border border-primary border-1 shadow w-75 mx-auto mt-3 px-5 pb-3">
                    <div className=" bg-ff6f61 bg-gradient mx-3 text-white text-center py-0 mt-2 mb-3"> Last withdrawal: 24th, Fri 2023</div>
                    <div className={styles.update_card}>
                        <div className={styles.update_balance}> Balance: 5000</div>
                        <Button disabled className={styles.update_update}>Update</Button>
                        <Button disabled className={styles.update_withdraw}>Withdraw</Button>
                        
                    </div>

                    <Col className="mt-3">
                        <div className="bg-transparent border rounded-top  border-primary border-2 w-50 shadow d-flex justify-content-center text-primary mx-auto">
0
                        </div>
                        <Button className="bg-primary bg-gradient border-0 text-white rounded-pill rounded-top w-50 d-flex shadow justify-content-center mx-auto">
Update and Withdraw
                        </Button>
                    </Col>
                </Card>
            </div>
        </>
    )
}