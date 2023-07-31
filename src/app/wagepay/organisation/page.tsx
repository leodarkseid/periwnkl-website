"use client";

import { ListCard } from "@/components/list";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

import { useRouter } from "next/navigation";
import { BigNumber } from "ethers";
import { useMetaMask } from "@/hooks/useMetaMask";

interface EmployeeData {
    name: string;
    address: string;
    emp: number;
}

export default function Page(){
    const [resultLoading, setResultLoading] = useState(false);
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);

    const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()

    const router = useRouter()
    


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