"use client"
import { Button, Form, Spinner, Alert, Card } from "react-bootstrap";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { ListCard, ListTitle } from "@/components/list";
import { useMetaMask } from "@/hooks/useMetaMask";
import { CreateStockOptionsPlan, GetListOfCreatedOrgs, GetNumberOfEmployee, SearchForOrganisation } from "@/utils/contracts";

import { useRouter } from "next/navigation";
import { BigNumber } from "ethers";

interface EmployeeData {
    name: string;
    address: string;
    emp: number;
}

export default function Create() {
    const [resultLoading, setResultLoading] = useState(false);
    const [pageDisabled, setPageDisabled] = useState(false);
    const [addressNameList, setAddressNameList] = useState(Array<{ contractAddress: string, name: string }>);
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);
    const [submitLoading, setSubmitLoading] = useState(false);
    //for alert


    const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()

    const router = useRouter()
    useEffect(() => {
        setPageDisabled(wallet.accounts.length < 1 || submitLoading == true);
        const fetchData = async () => {
            setResultLoading(true);
            try {
                //cache
                const cache = await caches.open('my-cache');
                const cachedResponse = await cache.match('employee-organisation-data');
                if (wallet.accounts.length >= 1 && hasProvider) {
                    if (cachedResponse) {
                        const data = await cachedResponse.json();
                        setEmployeeData(data);
                    }
                }

                const listResult = await SearchForOrganisation(wallet.accounts[0]);
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
                    'employee-organisation-data',
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


    }, [wallet.accounts.length, submitLoading, hasProvider])

    return (
        <><div>
            <div className="bg-primary rounded text-white text-center p-2 mb-2 mx-auto"> Organisations</div>

            {resultLoading && <Spinner animation="border" className=" mt-3 d-block mx-auto text-success" />}
            {employeeData.map((data, index) => (
                <div onClick={(() => router.push(`/stock/organisation/dashboard/${data.address}`))} key={index}><ListCard key={index} name={data.name} address={data.address} emp={data.emp} /></div>
            ))}
        </div>
        </>
    )
}