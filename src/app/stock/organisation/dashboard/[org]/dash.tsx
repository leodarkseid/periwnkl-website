"use client"
import { ListCard, ListEmployee } from "@/components/list"
import { Button, Modal, Form, Spinner, Row, Col, InputGroup, Alert } from "react-bootstrap"
import styles from "./css/dash.module.css"
import { SyntheticEvent, useEffect, useState, useCallback } from "react"
import { BiTime } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { BsBank } from "react-icons/Bs"
import { IoMdArrowRoundBack } from "react-icons/io"
import { LiaSuitcaseSolid } from "react-icons/lia"
import { AddEmployee, GetGrossExcercisedOptions, GetGrossVestedOptions, GetNumberOfEmployee, GetOrgName, GetPieData, GetTimeStamp, ListOfEmployees } from "@/utils/contracts"
import { Placehold } from "@/components/placeholder"
import { checkIfValidAddress } from "@/utils"
import { useMetaMask } from "@/hooks/useMetaMask"
import { Piechart } from "@/components/pieChart"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"

interface DashProps {
    address: string
}

interface PieData {
    color: string;
    title: string;
    value: number;
}

export default function Dashboard(props: DashProps) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState<PieData[]>([]);
    const [pieLoading, setPieLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [empAmount, setEmpAmount] = useState(Infinity);
    const [grossExcercised, setGrossExcercised] = useState(Infinity);
    const [grossVested, setGrossVested] = useState(Infinity);
    const [date, setDate] = useState("");
    const [list, setList] = useState<string[]>([]);
    const [addLoading, setAddLoading] = useState(false);
    const [addDisabled, setAddDisabled] = useState(false);
    const [addr, setAddr] = useState("");
    const [submitFail, setSubmitFail] = useState(false);

    const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()
    const router = useRouter();

    const allValuesZero = data.every((item) => item.value === 0);


    const FetchData = useCallback(async () => {
        if (wallet.accounts.length >= 1 && hasProvider) {

            setPieLoading(true);
            const _name = await GetOrgName(props.address)
            setName(_name)
            setAddress(props.address);
            const date = await GetTimeStamp(props.address);
            setDate(date);
            const listEmployees = await ListOfEmployees(props.address);
            setList(listEmployees);
            const empAmount = await GetNumberOfEmployee(props.address);
            setEmpAmount(empAmount);
            const result = await GetPieData(props.address);
            setData(result)
            setPieLoading(false)
            const grossExcercised = await GetGrossExcercisedOptions(props.address);
            setGrossExcercised(grossExcercised);
            const grossVested = await GetGrossVestedOptions(props.address);
            setGrossVested(grossVested);
        }
    }, [props, wallet, hasProvider])

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
    }, [props, wallet, hasProvider, setList, FetchData, submitFail])


    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        const addr_ = (addr)?.toString().trim();
        if (wallet.accounts.length >= 1 && hasProvider) {
            setAddDisabled(true);
            setAddLoading(true);
            try {
                if (checkIfValidAddress([addr_]) && ethers.utils.isAddress(addr_)) {
                    const add_ = await AddEmployee(addr_, props.address)
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
            <div className="bg-primary rounded text-center text-white p-2 w-100 "> {name == "" ? <Placehold size={3} /> : name} - {address} </div>

            <Button onClick={(() => router.back())} className="mt-1 mb-0 border-0 bg-altYellow "><IoMdArrowRoundBack />Dashboard</Button>
            <div className={styles.dash_grid}>

                <div className={styles.emp_grid}>
                    <div className="bg-primary text-center text-white p-2 w-100 mb-3"> Employees </div>
                    {addLoading && <Spinner className="mb-2 text-success" />}
                    <Form onSubmit={handleSubmit} >
                        <Row style={{ "width": "300px" }}>
                            <Form.Control
                                type="address"
                                placeholder="0x00000..."
                                autoFocus
                                onChange={e => setAddr(e.target.value)}
                                disabled={addDisabled}
                                required />
                            {submitFail && <div className="text-danger " style={{ "fontSize": "12px" }}>Invalid Address !!</div>}
                        </Row>
                        <Row className="w-50 mx-auto mt-2 mb-3"><Button type="submit" disabled={addDisabled} >Add</Button></Row>
                    </Form>



                    {list.map((data, index) => (
                        <ListEmployee onClick={(() => router.push(`/stock/organisation/dashboard/${address}/${data}`))} key={index++} id={index + 1} address={data} />
                    ))}
                </div>
                <div className={styles.emp_others}>
                    <div className={styles.emp_slab1}>
                        <div className="bg-36b9cc w-75 p-3 text-white  rounded-end-pill mb-3"> <BiTime style={{ "transform": "scale(1.5)", "marginRight": "10px" }} /> Block Time : {date == "" ? <Placehold size={3} /> : date} </div>
                        <div className="bg-f6c23e w-75 p-3 text-white  rounded-end-pill mb-3"> <CgProfile style={{ "transform": "scale(1.5)", "marginRight": "10px" }} />Total Employees : {empAmount == Infinity ? <Placehold size={3} /> : empAmount}</div>
                        <div className="bg-primary w-75 p-3 text-white  rounded-end-pill mb-3"><LiaSuitcaseSolid style={{ "transform": "scale(1.5)", "marginRight": "10px" }} />Gross Excercised options : {grossExcercised == Infinity ? <Placehold size={1} /> : grossExcercised}</div>
                        <div className="bg-ff6f61 w-75 p-3 text-white  rounded-end-pill mb-3"><BsBank style={{ "transform": "scale(1.5)", "marginRight": "10px" }} />Gross Vested options : {grossVested == Infinity ? <Placehold size={2} /> : grossVested} </div>
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