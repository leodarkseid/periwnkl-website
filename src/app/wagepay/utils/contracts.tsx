import { ReturnColor } from "@/utils";
import { PAYWAGES_ABI, PAYWAGES_FACTORY_ABI, PAYWAGES_FACTORY_CONTRACT } from "../constants";

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
        PAYWAGES_ABI,
        signer,)
}

export async function CreateWagePayOrganisation(tokenAddress: string, interval: number, name: string) {

    try {
        const create = await wagepayFactory.createPayWages(tokenAddress, interval, name);
        const createTx = await create.wait();
        console.log(create)

    } catch (error) {
        console.error(error)
        return ""
    }
}

export async function checkIfAnEmployee(organisationAddress: string, employeeAddress: string): Promise<boolean> {
    try {
        const contract = Wagepay(organisationAddress);
        const isEmployee: boolean = await contract.employee(employeeAddress)
        return isEmployee

    } catch (error) {
        console.error(error)
        return false
    }
}

export async function GetListOfCreatedOrgs() {
    try {
        const names = await wagepayFactory.getCreatorDeployedContracts();
        return names

    } catch (error) {
        console.error(error)
        return ""
    }
}


export async function SearchForOrganisation(employeeAddress: string): Promise<string[]> {
    try {
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

    } catch (error) {
        console.error(error)
        return []
    }
}

export async function GetNumberOfEmployee(organisationAddress: string) {
    try {
        console.log("called GetNumberOfEmployee")
        const contract = Wagepay(organisationAddress)
        const getNumber: BigNumber = await contract.employeesNumber();
        return getNumber.toNumber();
    } catch (error) {
        return 0
    }
}

export async function GetOrgName(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress);
        const name = await contract.name_();
        return name

    } catch (error) {
        console.error(error)
        return ""
    }
}



export async function GetLastWithdrawal(organisationAddress: string, employeeAddress: string) {
    try {
        const contract = Wagepay(organisationAddress);
        const date_ = await contract.lastWithdrawal(employeeAddress);
        const date = new Date(date_ * 1000);
        return date.toLocaleString(undefined, { dateStyle: 'medium' });

    } catch (error) {
        console.error(error)
        return ""
    }
}
export async function IsSuspended(organisationAddress: string, employeeAddress: string) {
    try {
        const contract = Wagepay(organisationAddress);
        const status = await contract.suspended(employeeAddress);
        return status

    } catch (error) {
        console.error(error)
        return ""
    }
}
export async function UnSuspendEmployee(organisationAddress: string, employeeAddress: string) {
    try {
        const contract = Wagepay(organisationAddress);
        const status = await contract.unSuspendEmployee(employeeAddress);
        return status
    } catch (error) {
        console.error(error)
        return ""
    }
}
export async function SuspendEmployee(organisationAddress: string, employeeAddress: string) {
    try {


        const contract = Wagepay(organisationAddress);
        const status = await contract.suspendEmployee(employeeAddress);
        return status
    } catch (error) {
        console.error("Suspended",error);
        return ""
    }
}
export async function IntervalChange(organisationAddress: string, employeeAddress: string, _newInterval: number) {
    try {
        const contract = Wagepay(organisationAddress);
        const _amount = _newInterval * 86400
        const amount = ethers.utils.parseEther(_amount.toString())
        const status = await contract.changeEmployeeInterval(employeeAddress, amount);
        const tx = await status.wait();
        return status
    } catch (error) {
        console.error("IntervalChange",error);
    }
}
export async function WageChange(organisationAddress: string, employeeAddress: string, _newWage: number) {
    try {
        const contract = Wagepay(organisationAddress);
        const status = await contract.changeEmployeeWage(employeeAddress, _newWage);
        const tx = await status.wait();
        return status
    } catch (error) {
        console.error("WageChange",error)
    }
}

export async function GetTokenAddress(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const token = await contract.tokenAddress()
        return token
    } catch (error) {
        console.error("GetTokenAddress",error)
        return ""
    }
}
export async function GetTimeStamp(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const token = await contract.blockTimeStamp()
        return token
    } catch (error) {
        console.error("GetTimeStamp",error)
        return 0
    }
}


export async function ListOfEmployees(address: string): Promise<string[]> {
    try {
        const contract = Wagepay(address)
        const _total = await GetNumberOfEmployee(address);
        const total = Number(_total)
        const listOfEmployees = [];
        for (let i = 0; i < total; i++) {
            const id = i;
            const employee = await contract.employees(id);
            listOfEmployees.push(employee);
        }
        return listOfEmployees;

    } catch (error) {
        console.error("ListOfEmployees",error);
        return []
    }
}

export async function GetWages(organisationAddress: string, employeeAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const tx = await contract.wage(employeeAddress)
        const amount = ethers.utils.formatUnits(tx.toString(),10);
        return Number(amount)
    } catch (error) {
        console.error("GetWages",error)
        return 0
    }
}

export async function GetInterval(organisationAddress: string, employeeAddress: string) {
    try {
        const contract = Wagepay(organisationAddress);
        const tx = await contract.interval(employeeAddress)
        const amount = tx/86400;
        return Number(amount)
    } catch (error) {
        console.error("GetInterval",error)
        return 0
    }
}

export async function GetPieData(address: string) {
    try {
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
    } catch (error) {
        console.error("GetPieData",error)
        return []
    }
}


export async function GetBalance(organisationAddress: string, employeeAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const tx = await contract.balance(employeeAddress)
        const amount = ethers.utils.formatEther(tx.toString());
        return Number(amount)
    } catch (error) {
        console.error("GetBalance",error)
        return 0
    }
}
export async function GetContractBalance(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const tx = await contract.contractBalance()
        const amount = ethers.utils.formatUnits(tx.toString(),10);
        return Number(amount)
    } catch (error) {
        console.error("GetContractBalance",error)
        return 0
    }
}
export async function GetWageBill(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const tx = await contract.totalWageBill()
        const amount = ethers.utils.formatEther(tx.toString());
        return Number(amount)
    } catch (error) {
        console.error("GetWageBil",error)
        return 0
    }
}
export async function GetTotalEmployeesBalance(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const tx = await contract.totalEmployeesBalance()
        const amount = ethers.utils.formatEther(tx.toString());
        return Number(amount)
    } catch (error) {
        console.error("GetTotalEmployees",error)
        return 0
    }
}
export async function WithdrawAll(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const tx = await contract.withdrawAll()
        console.log(tx)
        return tx
    } catch (error) {
        console.error("SetUpdateBalance",error)
        return 0
    }
}
export async function GetEstimatedBalance(organisationAddress: string, employeeAddress: string) {
    try {
        let tx;
        const contract = Wagepay(organisationAddress)
        try{
        tx = await contract.calculateIntervalToBeAdded()
    }catch(error){
        console.error("error from calculateInterval", error)
        tx = 0;
    }
        const txWage = await contract.wage(employeeAddress)
        const amount = ethers.utils.formatEther(txWage.toString());
        const b = Number(amount)
        return tx * b
    } catch (error) {
        console.error(" get estimated balance ",error)
        return 0
    }
}

export async function SetUpdateBalance(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const tx = await contract.updateBalance()
        return tx
    } catch (error) {
        console.error("SetUpdateBalance",error)
    }
}
export async function updateBalance_withdraw(organisationAddress: string) {
    try {
        const contract = Wagepay(organisationAddress)
        const tx = await contract.update_withdraw()
        return tx
    } catch (error) {
        console.error("updateBalance_withdraw",error)
        return ""
    }
}

export async function AddEmployee(organisationAddress: string, employeeAddress: string, wage: number, interval: number) {
    try {
        const contract = Wagepay(organisationAddress)
        const _wage = ethers.utils.parseUnits(interval.toString(), 10)
        const tx = await contract.addEmployee(employeeAddress, Number(_wage), (interval*86400))
        return tx
    } catch (error) {
        console.error("from add employee",error)
        return ""
    }
}


export interface CountdownProp {
    days: number;
    hours: number;
    minutes: number;
}

export async function GetNextWageCountdown(organisationAddress: string, employeeAddress: string): Promise<CountdownProp> {
    try {
        const contract = Wagepay(organisationAddress);
        const vestingCountdown = await contract.countdown(employeeAddress);
        console.log(vestingCountdown,"vestingCountdown")
        const days = Math.floor(vestingCountdown / (24 * 60 * 60));
        console.log(days, "days")
        const hours = Math.floor((vestingCountdown % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((vestingCountdown % (60 * 60)) / 60);
        const data = { days, hours, minutes };
        console.log(data)
        return data
    } catch (error) {
        console.error("countdown error", error)
        return { days: 0, hours: 0, minutes: 0 }
    }
}
