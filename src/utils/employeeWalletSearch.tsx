"use client"
import { useState } from "react";
import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "./../../constants";
import {ethers, Contract, Signer, providers } from "ethers";

//stock options contract
let soContract: Contract;


export default function SearchForEmployeeDetails(organisationAddress: string, signer:Signer  ): Array<string>{
    const [name, setName] = useState("");
    
    (async(organisationAddress: string, signer: Signer )=>{
        soContract = new Contract(
            organisationAddress,
            STOCK_OPTIONS_CONTRACT_ABI,
            signer)

        
        
    })
    return (["a","a"])
}