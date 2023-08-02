"use client";

import { ListCard } from "@/components/list";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Collapse, Form, InputGroup, Spinner, Row } from "react-bootstrap";

import { useRouter } from "next/navigation";
import { BigNumber } from "ethers";
import { useMetaMask } from "@/hooks/useMetaMask";
import { checkIfValidAddress } from "@/utils";
import { CreateWagePayOrganisation, GetListOfCreatedOrgs, GetNumberOfEmployee, GetOrgName, SearchForOrganisation } from "../utils/contracts";

interface EmployeeData {
    name: string;
    address: string;
    emp: number;
}

export default function Page() {
    const [resultLoading, setResultLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
    const [open, setOpen] = useState(false);
    const [submitFail, setSubmitFail] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [addDisabled, setAddDisabled] = useState(false);
    const [orgName, setOrgName] = useState("");
    const [wageInterval, setWageInterval] = useState(0);
    const [tokenAddress, setTokenAddress] = useState("");

    const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()

    const router = useRouter()

    useEffect(() => {
        setAddDisabled(wallet.accounts.length < 1 || addLoading == true);
        const fetchData = async () => {
            setResultLoading(true);
            try {
                //cache
                const cache = await caches.open('my-cache');
                const cachedResponse = await cache.match('wage_pay-employee-organisation-data');
                if (wallet.accounts.length >= 1 && hasProvider) {
                    if (cachedResponse) {
                        const data = await cachedResponse.json();
                        setEmployeeData(data);
                    }
                }

                const listResult = await GetListOfCreatedOrgs();
                const data = await Promise.all(
                    listResult.map(async (addressObj: { newContractAddress: string; name: any; }) => {
                        const empCount = await GetNumberOfEmployee(addressObj.newContractAddress);
                        
                        return {
                            name: addressObj.name,
                            address: addressObj.newContractAddress,
                            emp: empCount,
                        };
                    })
                );

                await cache.put(
                    'wage_pay-employee-organisation-data',
                    new Response(JSON.stringify(data), {
                        headers: { 'Content-Type': 'application/json' },
                    })
                );


                setResultLoading(false);
                setEmployeeData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setResultLoading(false);
            }
        };
        fetchData();


    }, [wallet.accounts, addLoading, hasProvider])

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        const tokenAddr = (tokenAddress)?.toString().trim();
        const name = (orgName)?.toString().trim();
        if (wallet.accounts.length >= 1 && hasProvider) {
            setAddDisabled(true);
            setAddLoading(true);
            try {
                if (checkIfValidAddress([tokenAddr]) && name != "") {
                    const add_ = await CreateWagePayOrganisation(tokenAddr, wageInterval, name )
                    console.log(add_)
                }
                else { setSubmitFail(true) }
            } catch (error) { console.error(error) }
            finally {
                setAddDisabled(false);
                setAddLoading(false);
            }
        }
    }



    return (
        <>


            
            <Collapse in={open}>

                <Form onSubmit={handleSubmit} >

                    <Row className="w-50 mx-auto">
                        <InputGroup>
                            <InputGroup.Text className="text-primary" id="inputGroup-sizing-sm">Organisation Name</InputGroup.Text>
                            <Form.Control
                                type="name"
                                min={1}
                                autoFocus
                                onChange={e => setOrgName(e.target.value)}
                                disabled={addDisabled}
                                required /></InputGroup>
                        {submitFail && <div className="text-danger " style={{ "fontSize": "12px" }}>Invalid Address !!</div>}
                    </Row>
                    <Row className="w-50 mt-2  mx-auto">
                        <InputGroup>
                            <InputGroup.Text className="text-primary" id="inputGroup-sizing-sm">Token Address</InputGroup.Text>
                            <Form.Control
                                type="address"
                                placeholder="0x00000..."
                                autoFocus
                                onChange={e => setTokenAddress(e.target.value)}
                                disabled={addDisabled}
                                required /></InputGroup>
                        {submitFail && <div className="text-danger " style={{ "fontSize": "12px" }}>Invalid Address !!</div>}
                    </Row>
                    <Row className="w-50 mt-2 mx-auto">
                        <InputGroup>
                            <InputGroup.Text className="text-primary" id="inputGroup-sizing-sm">Interval</InputGroup.Text>
                            <Form.Control
                                type="number"
                                autoFocus
                                onChange={e => setWageInterval(Number(e.target.value))}
                                disabled={addDisabled}
                            /></InputGroup>
                        {submitFail && <div className="text-danger " style={{ "fontSize": "12px" }}>Invalid Address !!</div>}
                    </Row>
                    <Row className="w-50 mx-auto mt-2 mb-3"><Button type="submit" disabled={addDisabled} >{addLoading ? <Spinner 
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    className="mb-2 text-success" />:"Create"}</Button></Row>
                </Form>
            </Collapse>

            <Button onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open} className="bg-secondary border-0 mb-3 pt-0">Create Organisation
            </Button>
            <div>

                <div className="bg-primary rounded text-white text-center p-2 mb-2 mx-auto"> Organisations</div>

                {resultLoading && <Spinner animation="border" className=" mt-3 d-block mx-auto text-success" />}
                {employeeData.map((data, index) => (
                    <div onClick={(() => router.push(`/wagepay/organisation/${data.address}`))} key={index}><ListCard key={index} name={data.name} address={data.address} emp={data.emp} /></div>
                ))}
            </div>
        </>
    )
}