"use client"
import { useState, FormEvent , SyntheticEvent,useEffect} from "react";
import Dashboard from "./dash";
import { GetPieData } from "@/utils/contracts";
import { checkIfValidAddress } from "@/utils";
import { useRouter } from 'next/navigation'


interface PageProps {
    params: {org :string}
}



export default function Page({ params: {org} }: PageProps) {

    const router = useRouter()
    useEffect(()=>{
        if({org}.org != "" || checkIfValidAddress([{org}.org]) == false){
            // router.replace('./notvalidquery')
        }
    },[org,router])
    return (
        <div>
           
            <Dashboard address={{org}.org} />
        </div>
    )
}