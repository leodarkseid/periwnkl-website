"use client"
import { ListCard, ListEmployee} from "@/components/list"
import { Button, Modal,Form } from "react-bootstrap"
import styles from "./css/dash.module.css"
import { useState } from "react"
import {BiTime} from "react-icons/bi"
import {CgProfile} from "react-icons/cg"
import {BsBank} from "react-icons/Bs"
import {LiaSuitcaseSolid} from "react-icons/lia"


export default function Dashboard(){
    const [show, setShow] = useState(false)
    return(
        <>
        <div className="bg-primary rounded text-center text-white p-2 w-100 "> Name of Org </div>
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
                    <div className="bg-36b9cc w-75 p-3 text-white  rounded-end-pill mb-3"> <BiTime style={{"transform":"scale(1.5)", "marginRight":"10px"}}/> Block Time</div>
                    <div className="bg-f6c23e w-75 p-3 text-white  rounded-end-pill mb-3"> <CgProfile style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Total Employees</div>
                    <div className="bg-primary w-75 p-3 text-white  rounded-end-pill mb-3"><LiaSuitcaseSolid style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Gross Excercised options</div>
                    <div className="bg-ff6f61 w-75 p-3 text-white  rounded-end-pill mb-3"><BsBank style={{"transform":"scale(1.5)", "marginRight":"10px"}}/>Gross Vested options </div>
                    <div ></div>
                </div>
            </div>
        </div>
        </>
    )
}