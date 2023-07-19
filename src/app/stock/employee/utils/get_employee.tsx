import { useState } from "react";
import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "../../constants";
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
export default async function SearchForEmployeeDetails(organisationAddress: string, signer:Signer, employeeAddress: string ): Promise<Employee[]>{
    console.log("getAddress called")
    console.log(organisationAddress, signer, employeeAddress)
    // const [employeeDetails, setEmployeeDetails] = useState(Array<Employee>);
    
    
        soContract = new Contract(
            organisationAddress,
            STOCK_OPTIONS_CONTRACT_ABI,
            signer)
        // check stock options and vesting schedule
        try{
        const checkSO_VO: Array<string[]> = await soContract.employee(employeeAddress);
        const organisationName: string = await soContract.Name();
        const totalStockOptions: number = await soContract.TotalStockOptions();
        const vestingCountdown: number = await soContract.vestingCountdown(employeeAddress);
        const getVestedOptions: number = await soContract.getVestedOptions(employeeAddress);
        const getExcercised: number = await soContract.getExcercisedOptions(employeeAddress);
        const ar: Employee = {checkSO_VO, organisationName, totalStockOptions, vestingCountdown, getVestedOptions, getExcercised}
        // setEmployeeDetails([ar]);
        
    return ([ar])
} catch(error){
    console.error(error)
}
}
    
    