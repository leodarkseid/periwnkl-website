import { ReturnColor } from "@/utils";
import {PAYWAGES_ABI, PAYWAGES_FACTORY_ABI, PAYWAGES_FACTORY_CONTRACT} from "../constants";

import { BigNumber, Contract, Signer, ethers, utils } from "ethers";




let provideR: any;
let signer: Signer

if (typeof window !== 'undefined') {
    try {
        provideR = new ethers.providers.Web3Provider((window as any).ethereum);
    } catch (error) {
        console.error("provider couldn't be created", error)
    }
}

if (provideR) { signer = provideR.getSigner(); }
const wagepayFactory = WagepayFactory();

export function WagepayFactory(): Contract {
    return new Contract(
        PAYWAGES_FACTORY_CONTRACT,
        PAYWAGES_FACTORY_ABI,
        signer,)
}
export function Wagepay(contractAddress: string): Contract {  
    return new Contract(
        contractAddress,
        PAYWAGES_FACTORY_ABI,
        signer,)
}

async function checkIfAnEmployee(organisationAddress: string, employeeAddress: string): Promise<boolean> {
    const contract = Wagepay(organisationAddress);
    const isEmployee: boolean = await contract.employee(employeeAddress)
    return isEmployee
}


export async function SearchForOrganisation(employeeAddress: string): Promise<string[]> {
    console.log("called search")
    let listOfOrgs: string[] = [];
    const contract = wagepayFactory
    const listOfContracts: Array<string> = await contract.getDeployedPayWages();
    await Promise.all(listOfContracts.map(async (org) => {
        console.log("sorting through orgs", org)
        if (await checkIfAnEmployee(org, employeeAddress)) {
            listOfOrgs.push(org)
        }
    }));
    return listOfOrgs
}

export async function GetNumberOfEmployee(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const getNumber: BigNumber = await contract.employeesCount();
    return getNumber.toNumber();
}

export async function GetOrgName(organisationAddress: string) {
    const contract = Wagepay(organisationAddress);
    const name = await contract.name_();
    return name
}



export async function GetLastWithdrawal(organisationAddress: string, employeeAddress: string){
    const contract = Wagepay(organisationAddress);
    const date_ = await contract.lastWithdrawal(employeeAddress);
    const date = new Date(date_ * 1000);
    return date.toLocaleString(undefined, { dateStyle: 'medium' });
}

export async function GetTokenAddress(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const token = await contract.tokenAddress()
    const tokenTx = await token.wait()
    return token
}
export async function GetTimeStamp(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const token = await contract.blockTimeStamp()
    const tokenTx = await token.wait()
    return token
}


export async function ListOfEmployees(address: string) {
    const contract = Wagepay(address)
    const _total = await GetNumberOfEmployee(address);
    const total = Number(_total)
    const listOfEmployees = [];
    for (let i = 0; i < total; i++) {
        const id = i;
        const employee = await contract.employee(id);
        listOfEmployees.push(employee);
    }
    return listOfEmployees;
}

export async function GetWages(organisationAddress: string, employeeAddress: string) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.wage(employeeAddress)
    const txReceipt = await tx.wait()
    return tx
}
    
export async function GetInterval(organisationAddress: string, employeeAddress: string) {
    const contract = Wagepay(organisationAddress);
    const tx = await contract.interval(employeeAddress)
    const txReceipt = await tx.wait()
    return tx
}

export async function GetPieData(address: string) {
    const listResult = await ListOfEmployees(address);
    const data = await Promise.all(
        listResult.map(async (addressObj: string, index: number) => {
            const wage = await GetWages(addressObj, address);
            const color = ReturnColor(index++);
            return {
                color: color,
                title: addressObj,
                value: wage
            };
        })
    );
    return data
}


export async function GetBalance(organisationAddress: string, employeeAddress: string ) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.tokenAddress(employeeAddress)
    const txReceipt = await tx.wait()
    return tx
}
export async function GetContractBalance(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.contractBalance()
    const txReceipt = await tx.wait()
    return tx
}
export async function GetWageBill(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.totalWageBill()
    const txReceipt = await tx.wait()
    return tx
}
export async function GetTotalEmployeesBalance(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.totalEmployeesBalance()
    const txReceipt = await tx.wait()
    return tx
}
export async function WithdrawAll(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.withdrawAll()
    const txReceipt = await tx.wait()
    console.log(txReceipt)
    return tx
}
export async function GetEstimatedBalance(organisationAddress: string, employeeAddress: string) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.calculateIntervalToBeAdded()
    const txWage = await contract.wage(employeeAddress)
    const txReceipt = await tx.wait()
    const txReceipt2 = await txWage.wait()
    console.log(txReceipt)
    return tx * txWage
}

export async function SetUpdateBalance(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.updateBalance()
    const txReceipt = await tx.wait()
    return tx
}
export async function updateBalance_withdraw(organisationAddress: string) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.update_withdraw()
    const txReceipt = await tx.wait()
    return tx
}

export async function AddEmployee(organisationAddress: string, employeeAddress: string, wage: number, interval: number) {
    const contract = Wagepay(organisationAddress)
    const tx = await contract.addEmployee(employeeAddress, wage, interval)
    const txReceipt = await tx.wait()
    return tx
}


export interface CountdownProp {
    days: number;
    hours: number;
    minutes: number;
}

export async function GetNextWageCountdown(organisationAddress: string, employeeAddress: string): Promise<CountdownProp> {
    try {
        const contract = Wagepay(organisationAddress);
        const vestingCountdown = await contract.vestingCountdown(employeeAddress);
        const days = Math.floor(vestingCountdown / (24 * 60 * 60));
        const hours = Math.floor((vestingCountdown % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((vestingCountdown % (60 * 60)) / 60);
        const data = { days, hours, minutes };
        return data
    } catch (error) {
        console.error("countdown error", error)
        return { days: 0, hours: 0, minutes: 0 }
    }
}
