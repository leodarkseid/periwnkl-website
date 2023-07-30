import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "@/app/stock/constants";
import { BigNumber, Contract, Signer, ethers, utils } from "ethers";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import { ReturnColor } from ".";

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
const soContractFactory = SoContractFactory();


export function SoContractFactory(): Contract {
  return new Contract(
    STOCK_OPTIONS_FACTORY_CONTRACT,
    STOCK_OPTIONS_FACTORY_ABI,
    signer,)
}
export function soContract(soAddress: string): Contract {
  return new Contract(soAddress,
    STOCK_OPTIONS_CONTRACT_ABI,
    signer)
}

export async function CreateStockOptionsPlan(name: string, stockOptions: number): Promise<string> {
  const tx = await soContractFactory.createStockOptionsPlan(name, stockOptions);
  const txReceipt = await tx.wait();
  const result: string = txReceipt.events[0].address;
  return result
}



export async function GetListOfCreatedOrgs() {
  const names = await soContractFactory.getCreatorDeployedContracts();
  return names
}


export async function GetNumberOfEmployee(address: string) {
  const contract = soContract(address)
  const getNumber: BigNumber = await contract.getTotalEmployees();
  return getNumber.toNumber();

}

export async function ListOfEmployees(address: string) {
  const contract = soContract(address)
  const _total = await GetNumberOfEmployee(address);
  const total = Number(_total)
  const listOfEmployees = [];
  for (let i = 0; i < total; i++) {
    const id = i;
    const employee = await contract.employees(id);
    listOfEmployees.push(employee);
  }
  return listOfEmployees;
}

export async function GetTimeStamp(address: string) {
  const contract = soContract(address)
  const time = await contract.getBlockTimeStamp();

  const timeStamp = time
  const date = new Date(timeStamp * 1000);
  return date.toLocaleString(undefined, { dateStyle: 'medium' });
}

export async function VestedOptions(address: string, employeeAddress: string) {
  let vs: number = 0;
  try {
    const contract = soContract(address);
    const _result = await contract.getVestedOptions(employeeAddress);
    const result = Number(ethers.utils.formatEther(_result.toString()));
    vs = result
  } catch (error) {
    console.error("from vested options", error)
  }
  return vs
}
export async function ExcercisedOptions(address: string, employeeAddress: string) {
  let vs: number = 0
  try {
    const contract = soContract(address);
    const _vs: BigNumber = await contract.getExcercisedOptions(employeeAddress);
    vs = _vs.toNumber();
  } catch (error) {
    console.error("from exercised options", error)
  }
  return vs
}

export async function GetGrossVestedOptions(address: string) {
  const contract = soContract(address);
  const list = await ListOfEmployees(address);
  let total = 0
  for (const i of list) {
    const vs = await VestedOptions(address, i)
    total += vs
  }
  return total
}
export async function GetGrossExcercisedOptions(address: string) {
  const contract = soContract(address);
  const list = await ListOfEmployees(address);
  let total = 0
  for (const i of list) {
    const vs = await ExcercisedOptions(address, i)
    total += vs
  }
  return total
}

export async function GetStockOptionsAmount(employeeAddress: string, address: string) {
  const contract = soContract(address);
  const a = await contract.getEmployee(employeeAddress);
  const amount = ethers.utils.formatEther(a.stockOptions.toString());
  console.log(amount)
  return Number(amount)
}

export async function GetPieData(address: string) {
  const listResult = await ListOfEmployees(address);
  const data = await Promise.all(
    listResult.map(async (addressObj: string, index: number) => {
      const stockAmount = await GetStockOptionsAmount(addressObj, address);
      const color = ReturnColor(index++);
      return {
        color: color,
        title: addressObj,
        value: stockAmount
      };
    })
  );
  return data
}

export async function GetOrgName(address: string) {
  const contract = soContract(address);
  const name = await contract.name();
  return name
}

export async function AddEmployee(employee: string, address: string) {
  try {
    const contract = soContract(address);
    const add = await contract.addEmployee(employee)
    const addReceipt = add.wait();
    return addReceipt
  } catch (error) {
    console.error(error)
  }
}

async function CheckIfAnAdminOrg(address: string): Promise<boolean> {
  const names = await GetListOfCreatedOrgs();
  return names.includes(address);
}

async function checkIfAnEmployee(organisationAddress: string, employeeAddress: string): Promise<boolean> {
  const contract = soContract(organisationAddress);
  const isEmployee: boolean = await contract.isEmployee(employeeAddress)
  return isEmployee
}

export async function SearchForOrganisation(employeeAddress: string): Promise<string[]> {
  console.log("called search")
  let listOfOrgs: string[] = [];
  const contract = soContractFactory
  const listOfContracts: Array<string> = await contract.getDeployedStockOptions();
  await Promise.all(listOfContracts.map(async (org) => {
    console.log("sorting through orgs", org)
    if (await checkIfAnEmployee(org, employeeAddress)) {
      listOfOrgs.push(org)
    }
  }));
  return listOfOrgs
}

export interface CountdownProp{
  days: number;
  hours: number;
  minutes: number;
}
export async function GetVestingCountdown(organisationAddress: string, employeeAddress: string): Promise<CountdownProp> {
 try{
  const contract = soContract(organisationAddress);
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

export async function Transfer(organisationAddress: string, recipientAddress: string, amount: number) {
  try{
    const temp: string = amount.toString();
    const _amount = ethers.utils.parseEther(temp) 
  const contract = soContract(organisationAddress);
  const transfer = await contract.transferOptions(recipientAddress, _amount);
  const transferTx =await transfer.wait();
  return transferTx 
}catch(error){
  console.error("transfer error", error)
}
}

export async function CheckForVestAble(organisationAddress: string, employeeAddress: string) {
  const contract = soContract(organisationAddress);
  const count = await GetVestingCountdown(organisationAddress, employeeAddress);
  const stock = await GetStockOptionsAmount(employeeAddress, organisationAddress)
  if (stock >= 1 && count.days > 0 && count.hours > 0 && count.minutes > 0) {
    const _stock= ethers.utils.formatEther(stock.toString());
    return Number(_stock)
  }
  else{
    return 0
  }
}

export async function GrantOptions(organisationAddress: string, employeeAddress: string , amount: number){
  const contract = soContract(organisationAddress);
  const _amount = ethers.utils.parseEther(amount.toString());
  const grant = await contract.grantStockOptions(employeeAddress,_amount );
  const grantTx = await grant.wait();
  return grantTx
}
export async function SetScheduleOptions(organisationAddress: string, employeeAddress: string , time: string){
  const contract = soContract(organisationAddress);
  const timestamp = new Date(time).getTime();
  const _timestamp = timestamp/1000
  console.log("time stamp is ", _timestamp)
 
  const grant = await contract.setVestingSchedule(employeeAddress,_timestamp );
  const grantTx = await grant.wait();
  return grantTx
}

