"use client"
import { ListCard, ListEmployee} from "@/components/list"
import { Button, Modal,Form, Spinner } from "react-bootstrap"
import styles from "./css/dash.module.css"
import { useEffect, useState } from "react"
import {BiTime} from "react-icons/bi"
import {CgProfile} from "react-icons/cg"
import {BsBank} from "react-icons/Bs"
import {LiaSuitcaseSolid} from "react-icons/lia"
import { PieChart } from 'react-minimal-pie-chart';
import { GetNumberOfEmployee, GetOrgName, GetPieData } from "@/utils/contracts"

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
    const [empAmount, setEmpAmount] = useState(0);

    useEffect(()=>{
        setPieLoading(true);
        async function FetchData(){
    const result = await GetPieData(props.address);
    const _name = await GetOrgName(props.address)
    const empAmount = await GetNumberOfEmployee(props.address);
    setAddress(props.address)
    setData(result)
    setName(_name)
    setEmpAmount(empAmount);
    setPieLoading(false)
}
    FetchData()
},[props])
    return(
        <>
        <div className="bg-primary rounded text-center text-white p-2 w-100 "> {name == "" ? <Spinner/> : name} </div>
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
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="0x00000..."
                                autoFocus
                            />
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={(()=>{setShow(false)})}>
                            Add
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    </div>




                    <ListEmployee id={"1"} address="0xBB1e33e483c7F672a4f3C6856Cbdd7e3211a2a79"/>
                    <ListEmployee id={"2"} address="0xBB1e33e483c7F672a4f3C6856Cbdd7e3211a2a79"/>
                
            </div>
            <div className={styles.emp_others}>
                <div className={styles.emp_slab1}>
                    <div className="bg-36b9cc w-75 p-3 text-white  rounded-end-pill mb-3"> <BiTime style={{"transform":"scale(1.5)", "marginRight":"10px"}}/> Block Time </div>
                    <div className="bg-f6c23e w-75 p-3 text-white  rounded-end-pill mb-3"> <CgProfile style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Total Employees : {empAmount == 0 ? <Spinner/> : name}</div>
                    <div className="bg-primary w-75 p-3 text-white  rounded-end-pill mb-3"><LiaSuitcaseSolid style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Gross Excercised options</div>
                    <div className="bg-ff6f61 w-75 p-3 text-white  rounded-end-pill mb-3"><BsBank style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Gross Vested options </div>
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