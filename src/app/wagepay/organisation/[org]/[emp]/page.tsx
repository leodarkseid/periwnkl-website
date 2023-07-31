"use client"

import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap"
import styles from "./css/orgEmpDash.module.css"
import { SyntheticEvent, useEffect, useState } from "react"
import { CountdownProp } from "../../../utils/contracts"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { useParams } from "next/navigation"
import { useMetaMask } from "@/hooks/useMetaMask"




interface EmpDashProps {
    address: string
}

export default function EmpDashBoard(props: EmpDashProps) {
    const [countdown, setCountdown] = useState<CountdownProp>();
    const [stockOptions, setStockOptions] = useState(0);
    const [vestedOptions, setVestedOptions] = useState(0);
    const [excercisedOptions, setExcercisedOptions] = useState(0);
    const [alertCountdown, setAlertCountdown] = useState(false);
    const [vestLoading, setVestLoading] = useState(false);
    const [sPLoading, setSpLoading] = useState(false);
    const [countdownLoading, setCountDownLoading] = useState(false);
    const [exerciseLoading, setExerciseLoading] = useState(false);
    const [grantOptions, setGrantOptions] = useState(0);
    const [grantSubmitLoading, setGrantSubmitLoading] = useState(false);
    const [schedule, setSchedule] = useState("");
    const [scheduleSubmitLoading, setScheduleSubmitLoading] = useState(false);
    const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()

    const params: Params = useParams()
    const empAddr = params.emp
    const orgAddr = params.org

    useEffect(() => {
        async function FetchData() {

            setCountDownLoading(true);
            setSpLoading(true);
            setVestLoading(true);
            setExerciseLoading(true);
            const stockOpt: number = await GetStockOptionsAmount(empAddr, orgAddr);
            const vestedOpt: number = await VestedOptions(orgAddr, empAddr);
            const exercisedOpt: number = await ExcercisedOptions(orgAddr, empAddr);


            setStockOptions(stockOpt);
            setSpLoading(false);
            setVestedOptions(vestedOpt);
            setVestLoading(false);
            setExcercisedOptions(exercisedOpt);
            setExerciseLoading(false);

            const vestingCountdown: CountdownProp = await GetVestingCountdown(orgAddr, empAddr);
            setCountdown(vestingCountdown);
            setCountDownLoading(false);
            if (vestingCountdown.days === 0 && vestingCountdown.hours === 0 && vestingCountdown.minutes === 0) {
                setAlertCountdown(true);
            }

        }

        if (wallet.accounts.length >= 1 && hasProvider) { FetchData(); }
    }, [empAddr, hasProvider, orgAddr, wallet.accounts.length])

    async function HandleGrantOptionSubmit(e: SyntheticEvent) {
        e.preventDefault();

        if (wallet.accounts.length >= 1 && hasProvider) {
            try {
                setGrantSubmitLoading(true);
                const submit = await GrantOptions(orgAddr, empAddr, grantOptions);
                console.log(submit)
            } catch (error) {
                console.error(error)
            } finally {
                setGrantSubmitLoading(false);
            }

        }
    }
    async function HandleScheduleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setScheduleSubmitLoading(true);
        // if (wallet.accounts.length >= 1 && hasProvider) {
        try {

            console.log("should submit")
            console.log("from HandleScheduleSubmit", schedule)
            const submit = await SetScheduleOptions(orgAddr, empAddr, schedule);
            console.log(submit)
        } catch (error) {
            console.error(error)
        } finally {
            setScheduleSubmitLoading(false);
            // }
        }
    }


    return (
        <>
            <div className="bg-primary rounded text-center text-white p-2 w-100">{empAddr}</div>
            <div className={styles.main}>
                <div className={styles.main_grid1}>
                    <div className={styles.main_grid1__col}>

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
                        <div className="bg-primary text-center rounded-pill text-white mx-auto w-50 mb-5">Countdown For Stock Options to Vest</div>

                        {alertCountdown && <Alert variant="danger" className="mb-4" dismissible>Vesting Schedule has not been set</Alert>}

                        <div className={styles.main_grid__timer_box_small_card}>Wage: {sPLoading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : stockOptions}</div>
                        <div className={styles.main_grid__timer_box_small_card}>Interval: {vestLoading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : vestedOptions}</div>
                        <div className={styles.main_grid__timer_box_small_card}>Balance: {exerciseLoading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : excercisedOptions}</div>
                        <div className={styles.main_grid__timer_box_small_card}>Last Withdrawal: {exerciseLoading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : excercisedOptions}</div>

                    </div>
                </div>





                <div className={styles.main_grid2}>
                    <div className={styles.main_grid2__col}>

                        <Form onSubmit={HandleGrantOptionSubmit} >
                            <Form.Group className={styles.main_grid2__row} controlId="formBasicGrantOptions">
                                <div className={styles.main_grid2__row_display}><Form style={{ "width": "90%" }} className=""><Form.Control className="w-100 shadow-none border-white" onChange={e => setGrantOptions(Number(e.target.value))} min={1} type="number" placeholder="1" /></Form></div>
                                <Button type="submit" disabled={grantSubmitLoading} className={styles.main_grid2__row_button}>{grantSubmitLoading ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Set Interval"}</Button>
                            </Form.Group>
                        </Form>

                        <Form onSubmit={HandleScheduleSubmit} >
                            <Form.Group className={styles.main_grid2__row} controlId="formBasicSetSchedule">
                                <div className={styles.main_grid2__row_display}><Form style={{ "width": "90%" }}><Form.Control className="w-100 shadow-none border-white" onChange={e => setSchedule(e.target.value)} type="datetime-local" placeholder="0x0000..." /></Form></div>
                                <Button type="submit" className={styles.main_grid2__row_button}>{scheduleSubmitLoading ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Set Wage"}</Button>
                            </Form.Group>
                        </Form>
                        {/* disabled={stockOptions < 1 || scheduleSubmitLoading} */}
                        <Button type="submit" variant="danger" >{scheduleSubmitLoading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : "Suspend"}</Button>

                    </div>
                </div>
            </div>
        </>
    )
}