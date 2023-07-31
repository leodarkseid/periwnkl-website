"use client"
import { ListCard, ListEmployee } from "@/components/list"
import { Collapse, Button, Modal, Form, Spinner, Row, Col, InputGroup, Alert } from "react-bootstrap"
import styles from "./css/dash.module.css"
import { SyntheticEvent, useEffect, useState, useCallback } from "react"
import { BiTime } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { BsBank } from "react-icons/Bs"
import { IoMdArrowRoundBack } from "react-icons/io"
import { LiaSuitcaseSolid } from "react-icons/lia"
import { AddEmployee, GetContractBalance, GetNumberOfEmployee, GetOrgName, GetPieData, GetTimeStamp, GetTotalEmployeesBalance, GetWageBill, ListOfEmployees } from "../../utils/contracts"
import { Placehold } from "@/components/placeholder"
import { checkIfValidAddress } from "@/utils"
import { useMetaMask } from "@/hooks/useMetaMask"
import { Piechart } from "@/components/pieChart"
import { useRouter, useParams } from "next/navigation"
import { ethers } from "ethers"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

interface DashProps {
    address: string
}

interface PieData {
    color: string;
    title: string;
    value: number;
}

export default function Page() {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [addDisabled, setAddDisabled] = useState(false);
    const [address_, setAddress_] = useState("");
    const [wage_, setWage_] = useState(0);
    const [interval_, setInterval_] = useState(0);
    const [submitFail, setSubmitFail] = useState(false);
    const [pieLoading, setPieLoading] = useState(false);
    const [timeStamp, setTimeStamp] = useState("");
    const [list, setList] = useState<string[]>([]);
    const [empAmount, setEmpAmount] = useState(Infinity);
    const [data, setData] = useState<PieData[]>([]);
    const [contractBalance, setContractBalance] = useState(0);
    const [wageBill, setWageBill] = useState(0);
    const [totalEmployeesBalance, setEmployeesBalance] = useState(0);

    const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()
    const router = useRouter();
    const params: Params = useParams()
    const orgAddr = params.org

    const account = wallet.accounts[0]

    const allValuesZero = data.every((item) => item.value === 0);


    const FetchData = useCallback(async () => {

        setPieLoading(true);
        const _name = await GetOrgName(orgAddr)
        setName(_name)
        const date = await GetTimeStamp(orgAddr);
        setTimeStamp(date);
        const listEmployees = await ListOfEmployees(orgAddr);
        setList(listEmployees);
        const empAmount = await GetNumberOfEmployee(orgAddr);
        setEmpAmount(empAmount);
        const result = await GetPieData(orgAddr);
        setData(result);
        setPieLoading(false);
        const contractBal = await GetContractBalance(orgAddr);
        setContractBalance(contractBal);

        const wageBill = await GetWageBill(orgAddr);
        setWageBill(wageBill);

        const totalEmployeesBalance = await GetTotalEmployeesBalance(orgAddr);
        setEmployeesBalance(totalEmployeesBalance);

    

    }, [orgAddr]);

    useEffect(() => {
        if (wallet.accounts.length >= 1 && hasProvider) {
            FetchData()
            setAddDisabled(false)
        } else { setAddDisabled(true) }
        setList
        if (submitFail == true) {
            setTimeout(() => {
                setSubmitFail(false)
            }, 5000);
        }
    }, [wallet, hasProvider, setList, FetchData, submitFail])


    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        const addr = (address_)?.toString().trim();
        if (wallet.accounts.length >= 1 && hasProvider) {
            setAddDisabled(true);
            setAddLoading(true);
            try {
                if (checkIfValidAddress([addr]) && wage_ > 0) {
                    const add_ = await AddEmployee(orgAddr, account, wage_, interval_)
                    console.log(add_)
                }
                else { setSubmitFail(true) }
            } catch (error) { console.error(error) }
            finally {
                setAddDisabled(false);
                setAddLoading(false);
                FetchData
            }
        }
    }


    return (
        <>
            <div className="bg-primary rounded text-center text-white p-2 w-100 "> {name == "" ? <Placehold size={3} /> : name} - {orgAddr} </div>

            <Button onClick={(() => router.back())} className="mt-1 mb-0 border-0 bg-altYellow "><IoMdArrowRoundBack />Dashboard</Button>
            <div className={styles.dash_grid}>

                <div className={styles.emp_grid}>
                    <div className="bg-primary text-center text-white p-2 w-100 mb-3"> Employees </div>
                    {addLoading && <Spinner className="mb-2 text-success" />}
                    <Collapse in={open}>
                        <Form onSubmit={handleSubmit} >
                            <Row style={{ "width": "350px" }}>
                                <InputGroup>
                                    <InputGroup.Text className="text-primary" id="inputGroup-sizing-sm">Address</InputGroup.Text>
                                    <Form.Control
                                        type="address"
                                        placeholder="0x00000..."
                                        autoFocus
                                        onChange={e => setAddress_(e.target.value)}
                                        disabled={addDisabled}
                                        required /></InputGroup>
                                {submitFail && <div className="text-danger " style={{ "fontSize": "12px" }}>Invalid Address !!</div>}
                            </Row>
                            <Row style={{ "width": "350px", "marginTop": "10px" }}>
                                <InputGroup>
                                    <InputGroup.Text className="text-primary" id="inputGroup-sizing-sm">Wage</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        autoFocus
                                        onChange={e => setWage_(Number(e.target.value))}
                                        disabled={addDisabled}
                                        required /></InputGroup>
                                {submitFail && <div className="text-danger " style={{ "fontSize": "12px" }}>Invalid Address !!</div>}
                            </Row>
                            <Row style={{ "width": "350px", "marginTop": "10px" }}>
                                <InputGroup>
                                    <InputGroup.Text className="text-primary" id="inputGroup-sizing-sm">Interval</InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        autoFocus
                                        onChange={e => setInterval_(Number(e.target.value))}
                                        disabled={addDisabled}
                                    /></InputGroup>
                                {submitFail && <div className="text-danger " style={{ "fontSize": "12px" }}>Invalid Address !!</div>}
                            </Row>
                            <Row className="w-50 mx-auto mt-2 mb-3"><Button type="submit" disabled={addDisabled} >Add</Button></Row>
                        </Form>
                    </Collapse>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        Add A New Employee
                    </Button>


                    {list.map((data, index) => (
                        <ListEmployee onClick={(() => router.push(`/stock/organisation/${orgAddr}/${data}`))} key={index++} id={index + 1} address={data} />
                    ))}
                </div>
                <div className={styles.emp_others}>
                    <div className={styles.emp_slab1}>
                        <div className="bg-36b9cc w-75 p-3 text-white  rounded-end-pill mb-3"> <BsBank 
                        style={{ "transform": "scale(1.5)", "marginRight": "10px" }} /> Contract Balance : 
                        {contractBalance == Infinity ? <Placehold size={3} /> : contractBalance} </div>
                        <div className="bg-f6c23e w-75 p-3 text-white  rounded-end-pill mb-3"> <CgProfile 
                        style={{ "transform": "scale(1.5)", "marginRight": "10px" }} />Total Employees : 
                        {empAmount == Infinity ? <Placehold size={3} /> : empAmount}</div>
                        <div className="bg-primary w-75 p-3 text-white  rounded-end-pill mb-3"><LiaSuitcaseSolid 
                        style={{ "transform": "scale(1.5)", "marginRight": "10px" }} />Wage Bill : 
                        {wageBill == Infinity ? <Placehold size={1} /> : wageBill}</div>
                        <div className="bg-ff6f61 w-75 p-3 text-white  rounded-end-pill mb-3"><BsBank 
                        style={{ "transform": "scale(1.5)", "marginRight": "10px" }} />Total Balance : 
                        {totalEmployeesBalance == Infinity ? <Placehold size={2} /> : totalEmployeesBalance} </div>
                        <div className="bg-36b9cc w-75 p-3 text-white  rounded-end-pill mb-3"> <BiTime 
                        style={{ "transform": "scale(1.5)", "marginRight": "10px" }} /> Block Time : 
                        {timeStamp == "" ? <Placehold size={3} /> : timeStamp} </div>
                        <div ></div>
                    </div>
                    {pieLoading && wallet.accounts.length >= 1 && <Spinner animation="border" className=" mt-3 d-block mx-auto text-success" />}
                    {!pieLoading && wallet.accounts.length >= 1 && <>
                        {allValuesZero ? <Alert variant="success">All Employees currently do not have Stock Options</Alert> : <Piechart data={data} />}

                        <div className="text-center text-white bg-primary rounded-pill w-75 mx-auto p-1 mt-3 mb-3">Employee StockOptions InfoGraph</div></>}


                </div>
            </div>
        </>
    )
}