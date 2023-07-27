"use client"
import { ListCard, ListEmployee} from "@/components/list"
import { Button, Modal,Form, Spinner, Placeholder, Card } from "react-bootstrap"
import styles from "./css/dash.module.css"
import { SyntheticEvent, useEffect, useState } from "react"
import {BiTime} from "react-icons/bi"
import {CgProfile} from "react-icons/cg"
import {BsBank} from "react-icons/Bs"
import {LiaSuitcaseSolid} from "react-icons/lia"
import { PieChart } from 'react-minimal-pie-chart';
import { AddEmployee, GetGrossExcercisedOptions, GetGrossVestedOptions, GetNumberOfEmployee, GetOrgName, GetPieData, GetTimeStamp, ListOfEmployees } from "@/utils/contracts"
import { Placehold } from "@/components/placeholder"
import { checkIfValidAddress } from "@/utils"
import { useMetaMask } from "@/hooks/useMetaMask"

interface DashProps{
    address:string
}

interface PieData{
    color: string;
    title: string;
    value: number; 
}

export default function Dashboard(props : DashProps){
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

    const { wallet, hasProvider, isConnecting,signer, connectMetaMask } = useMetaMask()

    useEffect(()=>{
        try{
        
        setPieLoading(true);
        setAddress(props.address)
    
        async function FetchData(){
            const result = await GetPieData(props.address);
            setData(result)
            setPieLoading(false);
            const _name = await GetOrgName(props.address)
            setName(_name)
            const empAmount = await GetNumberOfEmployee(props.address);
            setEmpAmount(empAmount);
            const grossExcercised = await GetGrossExcercisedOptions(props.address);
            setGrossExcercised(grossExcercised);
            const grossVested = await GetGrossVestedOptions(props.address);
            setGrossVested(grossVested);
            const date = await GetTimeStamp(props.address);
            setDate(date);
            const listEmployees = await ListOfEmployees(props.address);
            setList(listEmployees);
}
if(wallet.accounts.length >= 1 && hasProvider){FetchData()}else{setAddDisabled(true)}
}catch(error){
    console.error("error adding emp", error)
}
},[props, wallet,hasProvider])


    const handleSubmit = ((e:SyntheticEvent)=>{
        setAddDisabled(true)
        setAddLoading(true)
        e.preventDefault
        const addr = (name)?.toString().trim();
        if(wallet.accounts.length >= 1 && checkIfValidAddress([addr])){
            try {
                const addEmp = AddEmployee(addr, props.address) 
            }catch(error){
                console.error("adding new Employee", error)
            }
        }
    })
    return(
        <>
        <div className="bg-primary rounded text-center text-white p-2 w-100 "> {name == "" ? <Placehold size={3}/> : name} - {address} </div>
        <div className={styles.dash_grid}>
            
            <div className={styles.emp_grid}>
                <div className="bg-primary text-center text-white p-2 w-100 mb-3"> Employees </div>
                
                <div onClick={(()=>{setShow(true)})} className="bg-success rounded text-center mt-2 text-white w-50 mb-3 pointer" style={{"cursor":"pointer"}}>Add Employee</div>
                <div>
                <Modal size="sm" show={show} onHide={(()=>{setShow(false)})}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add a New Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="0x00000..."
                                autoFocus
                                onChange={e => setAddr(e.target.value)}
                                disabled={addDisabled}
                            />
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={(()=>{setShow(false)})} disabled={addDisabled}>
                            {addLoading ? <Spinner/> : "Add"}
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    </div>



                    {list.map((data, index)=>(
                    <ListEmployee key={index++} id={index + 1} address={data}/>
                    ))}
                
            </div>
            <div className={styles.emp_others}>
                <div className={styles.emp_slab1}>
                    <div className="bg-36b9cc w-75 p-3 text-white  rounded-end-pill mb-3"> <BiTime style={{"transform":"scale(1.5)", "marginRight":"10px"}}/> Block Time : {date == ""? <Placehold size={3}/> : date} </div>
                    <div className="bg-f6c23e w-75 p-3 text-white  rounded-end-pill mb-3"> <CgProfile style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Total Employees : {empAmount == Infinity ? <Placehold size={3}/> : empAmount}</div>
                    <div className="bg-primary w-75 p-3 text-white  rounded-end-pill mb-3"><LiaSuitcaseSolid style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Gross Excercised options : {grossExcercised == Infinity ? <Placehold size={1}/> : grossExcercised}</div>
                    <div className="bg-ff6f61 w-75 p-3 text-white  rounded-end-pill mb-3"><BsBank style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Gross Vested options : {grossVested == Infinity ? <Placehold size={2}/> : grossVested} </div>
                    <div ></div>
                </div>
                {pieLoading && <Spinner animation="border" className=" mt-3 d-block mx-auto text-success"/>}
                { !pieLoading &&
               <PieChart className="mt-4"
                style={{"transform":"scale(1)","height":"50%"}}
                        animate
                        reveal={100}
                        animationDuration={500}
                        animationEasing="ease-out"
                        center={[50, 50]}
                        data={data}
                        labelPosition={50}
                        lengthAngle={360}
                        lineWidth={35}
                        paddingAngle={0}
                        radius={50}
                        rounded
                        startAngle={0}
                        viewBoxSize={[100, 100]}/>
            }

            { !pieLoading && <div className="text-center text-white bg-primary rounded-pill w-75 mx-auto p-1 mt-3 mb-3">Employee StockOptions InfoGraph</div>}
       
                
            </div>
        </div>
        </>
    )
}