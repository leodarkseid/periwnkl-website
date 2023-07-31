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

export async function GetNumberOfEmployee(address: string) {
    const contract = Wagepay(address)
    const getNumber: BigNumber = await contract.employeesCOunt();
    return getNumber.toNumber();
}

export async function GetOrgName(address: string) {
    const contract = Wagepay(address);
    const name = await contract.name_();
    return name
}

export interface CountdownProp {
    days: number;
    hours: number;
    minutes: number;
}