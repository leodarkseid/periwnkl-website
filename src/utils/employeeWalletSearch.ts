"use client"
import { useState } from "react";
import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "./../../constants";
import {ethers, Contract, Signer, providers } from "ethers";

//stock options contract
let soContract: Contract;

interface Employee{
    checkSO_VO: Array<string[]>,
    organisationName: string,
    totalStockOptions: number,
    vestingCountdown: number,
    getVestedOptions: number,
    getExcercised: number,
}
export default function SearchForEmployeeDetails(organisationAddress: string, signer:Signer, employeeAddress: string ): Employee[]{
    const [employeeDetails, setEmployeeDetails] = useState(Array<{checkSO_VO: Array<string[]>,
        organisationName: string,
        totalStockOptions: number,
        vestingCountdown: number,
        getVestedOptions: number,
        getExcercised: number}>);
    
    async function getAll(organisationAddress: string, signer: Signer, employeeAddress: string ){
        soContract = new Contract(
            organisationAddress,
            STOCK_OPTIONS_CONTRACT_ABI,
            signer)
        // check stock options and vesting schedule
        const checkSO_VO: Array<string[]> = await soContract.employee(employeeAddress);
        const organisationName: string = await soContract.Name();
        const totalStockOptions: number = await soContract.TotalStockOptions();
        const vestingCountdown: number = await soContract.vestingCountdown();
        const getVestedOptions: number = await soContract.getVestedOptions(employeeAddress);
        const getExcercised: number = await soContract.getExcercisedOptions(employeeAddress);
        const ar = {checkSO_VO, organisationName, totalStockOptions, vestingCountdown, getVestedOptions, getExcercised}
        setEmployeeDetails(ar);
        
    }
    getAll(organisationAddress,signer, employeeAddress)
    return (employeeDetails)
}
    
    