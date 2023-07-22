import { useState } from "react";
import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "../../constants";
import {ethers, Contract, Signer, providers, utils, BigNumber } from "ethers";

//stock options contract
let soContract: Contract;
let soContractFactory: Contract;

export interface Employee{
    checkSO: string,
    checkVS: string,
    organisationName: string,
    totalStockOptions: string,
    vestingCountdown: string,
    getVestedOptions: string,
    getExcercised: string,
}
export async function SearchForEmployeeDetails(organisationAddress: string, signer:Signer, employeeAddress: string ): Promise<Employee|undefined>{
    
    // const [employeeDetails, setEmployeeDetails] = useState(Array<Employee>);
    
        console.log("get employee starting up")
        console.log("org from getEmpl",organisationAddress)
        console.log("emp from geEmpl",employeeAddress)
        soContract = new Contract(
            organisationAddress,
            STOCK_OPTIONS_CONTRACT_ABI,
            signer)
        // check stock options and vesting schedule
        try{
        const checkSO_VS: any = await soContract.getEmployee(employeeAddress);
        const _checkSO: BigNumber = await checkSO_VS.stockOptions;
        const checkSO: string = utils.formatEther(_checkSO)
        const _checkVS: BigNumber = await checkSO_VS.vestingSchedule;
        const checkVS: string = utils.formatEther(_checkVS)
        const organisationName: string = await soContract.Name();
        const _totalStockOptions: BigNumber = await soContract.TotalStockOptions();
        const totalStockOptions: string = utils.formatEther(_totalStockOptions)
        const _vestingCountdown: BigNumber = await soContract.vestingCountdown(employeeAddress);
        const vestingCountdown: string = utils.formatEther(_vestingCountdown);
        const _getVestedOptions: BigNumber = await soContract.getVestedOptions(employeeAddress);
        const getVestedOptions: string = utils.formatEther(_getVestedOptions)
        const _getExcercised: BigNumber = await soContract.getExcercisedOptions(employeeAddress);
        const getExcercised: string = utils.formatEther(_getExcercised)
        const ar: Employee = {checkSO, checkVS, organisationName, totalStockOptions, vestingCountdown, getVestedOptions, getExcercised}
        // setEmployeeDetails([ar]);
    console.log("arr from employee",ar)
    return (ar)
} catch(error){
    console.error("from getEmployee",error)
}
}

async function checkIfAnEmployee(organisationAddress: string, employeeAddress: string, signer: Signer): Promise<boolean>{
    soContract = new Contract(
        organisationAddress, 
        STOCK_OPTIONS_CONTRACT_ABI,
        signer
    )
    const isEmployee: boolean = await soContract.isEmployee(employeeAddress)
    return isEmployee

}

export async function SearchForOrganisation(signer:Signer, employeeAddress: string): Promise<string[]>{
    console.log("called search")
    let listOfOrgs: string[] = [];
    soContractFactory = new Contract(
        STOCK_OPTIONS_FACTORY_CONTRACT,
        STOCK_OPTIONS_FACTORY_ABI,
        signer)
    const listOfContracts: Array<string> = await soContractFactory.getDeployedStockOptions();
    for(const org of listOfContracts){
        console.log("sorting through orgs",org )
        if(await checkIfAnEmployee(org, employeeAddress, signer)){
            listOfOrgs.push(org)
        }
    }
    return listOfOrgs
}
    