"use client";
import { useParams } from "next/navigation"
import styles from "./css/page.module.css"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { useEffect, useState } from "react";
import { CountdownProp, GetBalance, GetEstimatedBalance, GetLastWithdrawal, GetNextWageCountdown, GetTokenAddress, SetUpdateBalance, WithdrawAll, updateBalance_withdraw } from "../../utils/contracts";
import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap";

import { useMetaMask } from "@/hooks/useMetaMask";

export default function Page() {
    const [countdownLoading, setCountDownLoading] = useState(false);
    const [countdown, setCountdown] = useState<CountdownProp>();
    const [alertCountdown, setAlertCountdown] = useState(false);
    const [tokenAddress, setTokenAddress] = useState("");
    const [lastWithdrawal, setLastWithdrawal] = useState("");
    const [employeeBalance, setEmployeeBalance] = useState(0);
    const [employeeBalanceLoading, setEmployeeBalanceLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [estimatedBalance, setEstimatedBalance] = useState(0);
    const [estimatedBalanceLoading, setEstimatedBalanceLoading] = useState(false);
    const [updateBalanceWithdrawLoading, SetUpdateBalanceWithdraw] = useState(false);

    const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()

    const params: Params = useParams()
    const orgAddr = params.org
    const accountEmp = wallet.accounts[0];

    useEffect(() => {
        async function FetchData() {
            try {
            
            setCountDownLoading(true);
            setEmployeeBalanceLoading(true);
            setUpdateLoading(true);
            setWithdrawLoading(true);
            setEstimatedBalanceLoading(true);
            SetUpdateBalanceWithdraw(true);


            const getTokenAddress = await GetTokenAddress(orgAddr);
            setTokenAddress(getTokenAddress);

            const getLastWithdrawal = await GetLastWithdrawal(orgAddr, accountEmp)
            setLastWithdrawal(getLastWithdrawal);

            const employeeBalance = await GetBalance(orgAddr, accountEmp);
            setEmployeeBalance(employeeBalance);
            setEmployeeBalanceLoading(false);


            const withdrawAll = await WithdrawAll(orgAddr);
            setWithdrawLoading(false);

            const getEstimatedBalance = await GetEstimatedBalance(orgAddr, accountEmp);
            setEstimatedBalance(getEstimatedBalance);
            setEstimatedBalanceLoading(false);

            SetUpdateBalanceWithdraw(false);





            const vestingCountdown: CountdownProp = await GetNextWageCountdown(orgAddr, accountEmp);
            setCountdown(vestingCountdown);
            setCountDownLoading(false);
            if (vestingCountdown.days === 0 && vestingCountdown.hours === 0 && vestingCountdown.minutes === 0) {
                setAlertCountdown(true);
            }
        } catch (error) {
            }
            finally{
                setCountDownLoading(false);
                setEmployeeBalanceLoading(false);
                setUpdateLoading(false);
                setWithdrawLoading(false);
                setEstimatedBalanceLoading(false);
                SetUpdateBalanceWithdraw(false);
            }
        }
        
        if (wallet.accounts.length >= 1 && hasProvider) { FetchData(); }
        else {
            setCountDownLoading(false);
            setEmployeeBalanceLoading(false);
            setUpdateLoading(false);
            setWithdrawLoading(false);
            setEstimatedBalanceLoading(false);
            SetUpdateBalanceWithdraw(false);
}
    }, [accountEmp, hasProvider, orgAddr, wallet.accounts.length])

    return (
        <>
            <div className="bg-primary rounded text-center text-white p-2 w-100">{orgAddr}</div>
            <div className={"container-xl bg-white h-75 w-75 rounded shadow mt-5 mx-auto d-flex flex-column justify-content-center px-5 pb-5"}>
                <div className=" bg-ff6f61 bg-gradient mx-3 text-white text-center py-0 mt-3 mb-2"> Last withdrawal :
                    {withdrawLoading ? <Spinner as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true" /> : lastWithdrawal} </div>
                <div className="rounded w-50 bg-transparent mx-auto text-center text-primary mb-5 border border-primary border-2">Token Address :
                    {tokenAddress == "" && withdrawLoading ?
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true" /> : tokenAddress}
                </div>
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

                {/* end of countdown */}

                {alertCountdown && <Alert variant="danger" className="mb-4" dismissible>You can now Update Balance, Withdraw or Both</Alert>}

                <Card className="bg-transparent border-0 border-1 shadow-lg w-75 mx-auto mt-3 px-5 pb-3 pt-4">

                    <div className={styles.update_card}>
                        <div className={styles.update_balance}> Balance:{employeeBalanceLoading ?
                            <Spinner as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true" /> : employeeBalance}</div>
                        <Button disabled={updateLoading} className={styles.update_update}>{updateLoading ?
                            <Spinner as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true" /> : "Update"}</Button>
                        <Button disabled={withdrawLoading} className={styles.update_withdraw}>
                            {withdrawLoading ?
                                <Spinner as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true" /> : "Withdraw"}</Button>

                    </div>

                    <Col className="mt-3">
                        <div className="bg-transparent border rounded-top  border-primary border-2 w-50 shadow d-flex justify-content-center text-primary mx-auto">
                            {estimatedBalanceLoading ?
                                <Spinner as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true" /> : estimatedBalance}
                        </div>
                        <Button className="bg-primary bg-gradient border-0 text-white rounded-pill rounded-top w-50 d-flex shadow justify-content-center mx-auto">
                            {updateBalanceWithdrawLoading ? 
                            <Spinner as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true" /> : "Update and Withdraw"}
                        </Button>
                    </Col>
                </Card>
            </div>

        </>
    )
}