"use client"

import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap"
import styles from "./css/orgEmpDash.module.css"
import { SyntheticEvent, useEffect, useState } from "react"
import { CountdownProp, GetBalance, GetInterval, GetLastWithdrawal, GetNextWageCountdown, GetWages, IntervalChange, IsSuspended, SuspendEmployee, UnSuspendEmployee, WageChange } from "../../../utils/contracts"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { useParams } from "next/navigation"
import { useMetaMask } from "@/hooks/useMetaMask"




interface EmpDashProps {
    address: string
}

export default function EmpDashBoard(props: EmpDashProps) {
    const [countdown, setCountdown] = useState<CountdownProp>();
    const [wage_, setWage] = useState(Infinity);
    const [interval_, setInterval_] = useState(Infinity);
    const [balance_, setBalance_] = useState(Infinity);
    const [lastWithdrawal, setLastWithdrawal] = useState("");
    const [suspended, setSuspended] = useState(false);
    const [alertCountdown, setAlertCountdown] = useState(false);
    const [intervalLoading, setIntervalLoading] = useState(false);
    const [countdownLoading, setCountDownLoading] = useState(false);
    const [balanceLoading, setBalanceLoading] = useState(false);
    const [intervalSubmitLoading, setIntervalSubmitLoading] = useState(false);
    const [schedule, setSchedule] = useState("");
    const [wageSubmitLoading, setWageSubmitLoading] = useState(false);
    const [suspensionLoading, setSuspensionLoading] = useState(false);
    const [newWage, setNewWage] = useState(0);
    const [newInterval, setNewInterval] = useState(0);
    const [changesCanBeMade, setChangesCanBeMade] = useState(false);

    const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()


    const params: Params = useParams()
    const empAddr = params.emp
    const orgAddr = params.org

    async function HandleSuspension(e: SyntheticEvent) {
        e.preventDefault();
        console.log("called")
        try {
            if (wallet.accounts.length >= 1 && hasProvider) {
                if (suspended) {
                    const unSuspend = await UnSuspendEmployee(orgAddr, empAddr);
                }
                else {
                    const suspend = await SuspendEmployee(orgAddr, empAddr);
                }

            }
        } catch (error) {
            console.error(error)
        } finally {

        }
    }

    useEffect(() => {
        async function FetchData() {

            setCountDownLoading(true);


            const wage_: number = await GetWages(orgAddr, empAddr);

            const interv = await GetInterval(orgAddr, empAddr);

            const bal = await GetBalance(orgAddr, empAddr);

            const lastWithdraw = await GetLastWithdrawal(orgAddr, empAddr);

            const isSuspended = await IsSuspended(orgAddr, empAddr);

            if (isSuspended) {
                setSuspended(true);
            }






            setWage(wage_);
            setInterval_(interv);
            setBalance_(bal);
            setLastWithdrawal(lastWithdraw);


            const vestingCountdown: CountdownProp = await GetNextWageCountdown(orgAddr, empAddr);
            setCountdown(vestingCountdown);
            setCountDownLoading(false);
            if (vestingCountdown.days === 0 && vestingCountdown.hours === 0 && vestingCountdown.minutes === 0) {
                setAlertCountdown(true);
                setChangesCanBeMade(true);
            }

        }

        if (wallet.accounts.length >= 1 && hasProvider) { FetchData(); }
    }, [empAddr, hasProvider, orgAddr, wallet.accounts.length])

    async function HandleIntervalSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setIntervalSubmitLoading(true);
        if (wallet.accounts.length >= 1 && hasProvider) {
            try {
                if (newInterval > 0) {
                    const submit = await IntervalChange(orgAddr, empAddr, interval_);
                }

            } catch (error) {
                console.error(error)
            } finally {
                setIntervalSubmitLoading(false);
            }

        }
    }
    async function HandleWageSubmit(e: SyntheticEvent) {
        e.preventDefault();
        setWageSubmitLoading(true);
        if (wallet.accounts.length >= 1 && hasProvider) {
            try {
                if (newWage > 0) {
                    const submit = await WageChange(orgAddr, empAddr, wage_);
                }
            } catch (error) {
                console.error(error)
            } finally {
                setWageSubmitLoading(false);
            }
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
                        <div className="bg-primary text-center rounded-pill text-white mx-auto w-50 mb-5">Countdown to Next Wage</div>

                        {alertCountdown && <Alert variant="danger" className="mb-4" dismissible>Wage Interval is either 0 or has not been set</Alert>}

                        <div className={styles.main_grid__timer_box_small_card}>Wage: {(wage_ == Infinity) ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : wage_}</div>
                        <div className={styles.main_grid__timer_box_small_card}>Interval: {interval_ == Infinity ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : interval_}</div>
                        <div className={styles.main_grid__timer_box_small_card}>Balance: {balance_ == Infinity ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : balance_}</div>
                        <div className={styles.main_grid__timer_box_small_card}>Last Withdrawal: {lastWithdrawal == "" ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : lastWithdrawal}</div>

                    </div>
                </div>

                <div className={styles.main_grid2}>
                    <div className={styles.main_grid2__col}>

                        <Form onSubmit={HandleIntervalSubmit} >
                            <Form.Group className={styles.main_grid2__row} controlId="formBasicGrantOptions">
                                <div className={styles.main_grid2__row_display}><Form style={{ "width": "90%" }} className=""><Form.Control className="shadow-none border-0" onChange={e => setNewInterval(Number(e.target.value))} min={1} type="number" />
                                </Form>
                                </div>
                                <Button type="submit" disabled={intervalSubmitLoading || !changesCanBeMade} className={styles.main_grid2__row_button}>{intervalSubmitLoading ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Set Interval"}</Button>
                            </Form.Group>
                        </Form>

                        <Form onSubmit={HandleWageSubmit} >
                            <Form.Group className={styles.main_grid2__row} controlId="formBasicSetSchedule">
                                <div className={styles.main_grid2__row_display}><Form style={{ "width": "90%" }}><Form.Control className=" shadow-none border-0" onChange={e => setNewWage(Number(e.target.value))} type="number" min={1} />
                                </Form>
                                </div>
                                <Button disabled={wageSubmitLoading || !changesCanBeMade} className={styles.main_grid2__row_button}>{wageSubmitLoading ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Set Wage"}</Button>
                            </Form.Group>
                        </Form>

                        {!suspended && <Button onClick={HandleSuspension} variant="danger" >{suspensionLoading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : "Suspend"}</Button>}
                        {suspended && <Button type="submit" onClick={HandleSuspension} variant="success" >{suspensionLoading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : "UnSuspend"}</Button>}

                    </div>
                </div>
            </div>
        </>
    )
}