import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "@/app/stock/constants";
import { BigNumber, Contract, Signer, ethers, utils } from "ethers";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import { ReturnColor } from ".";

let provideR: any;
let signer: Signer

if (typeof window !== 'undefined') {
  try{
  provideR = new ethers.providers.Web3Provider((window as any).ethereum);
}catch(error){
  console.error("provider couldn't be created", error)
}
}

if(provideR){signer = provideR.getSigner();}
const soContractFactory = SoContractFactory();


export function SoContractFactory(): Contract{
    return new Contract(
        STOCK_OPTIONS_FACTORY_CONTRACT,
        STOCK_OPTIONS_FACTORY_ABI,
        signer,)
  }
export function soContract(soAddress:string): Contract{
    return new Contract(soAddress,
      STOCK_OPTIONS_CONTRACT_ABI,
      signer)
  }

export async function CreateStockOptionsPlan(name: string, stockOptions:number): Promise<string>{
  const tx = await soContractFactory.createStockOptionsPlan(name, stockOptions);
  const txReceipt = await tx.wait();
  const result: string = txReceipt.events[0].address;               
  return result
}



export async function GetListOfCreatedOrgs(){
  const names = await soContractFactory.getCreatorDeployedContracts();
  return names
}


export async function GetNumberOfEmployee(address:string){
  const contract = soContract(address)
  const getNumber:BigNumber = await contract.getTotalEmployees();
  return getNumber.toNumber();
  
}

export async function ListOfEmployees(address:string) {
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

export async function GetTimeStamp(address:string){
  const contract = soContract(address)
  const time= await contract.getBlockTimeStamp();
  
  const timeStamp = time
  const date = new Date(timeStamp * 1000);
  return date.toLocaleString(undefined, { dateStyle: 'medium' });
}

export async function VestedOptions(address: string,employeeAddress: string) {
  let vs: number = 0;
  try{
  const contract = soContract(address);
  const _vs: BigNumber = await contract.getVestedOptions(employeeAddress);
  vs = _vs.toNumber();
} catch(error){
  console.error("from vested options",error)
}
  return vs
}
export async function ExcercisedOptions(address: string,employeeAddress: string) {
  let vs: number= 0
  try{
  const contract = soContract(address);
  const _vs: BigNumber = await contract.getExcercisedOptions(employeeAddress);
  vs = _vs.toNumber();
}catch(error){
  console.error("from exercised options",error)
}
  return vs
}

export async function GetGrossVestedOptions(address: string) {
  const contract = soContract(address);
  const list = await ListOfEmployees(address);
  let total = 0
  for(const i of list){
      const vs =await VestedOptions(address, i)
      total += vs
   }
   return total 
}
export async function GetGrossExcercisedOptions(address: string) {
  const contract = soContract(address);
  const list = await ListOfEmployees(address);
  let total = 0
  for(const i of list){
      const vs =await ExcercisedOptions(address, i)
      total += vs
   }
  return total
}

export async function GetStockOptionsAmount(employeeAddress: string, address:string) {
  const contract = soContract(address);
  const a = await contract.getEmployee(employeeAddress);
  const _amount:BigNumber = a.stockOptions;
  const amount = _amount.toNumber();
  return amount
}

export async function GetPieData(address:string) {
  const listResult = await ListOfEmployees(address);
          const data = await Promise.all(
            listResult.map(async (addressObj: string, index:number) => {
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

export async function GetOrgName(address:string) {
  const contract = soContract(address);
  const name = await contract.name();
  return name
}

export async function AddEmployee(employee: string, address:string){
  try{
  const contract = soContract(address);
  const add = await contract.addEmployee(employee)
  const addReceipt = add.wait();
  return addReceipt
  }catch(error){
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
  for (const org of listOfContracts) {
    console.log("sorting through orgs", org)
    if (await checkIfAnEmployee(org, employeeAddress)) {
      listOfOrgs.push(org)
    }
  }
  return listOfOrgs
}