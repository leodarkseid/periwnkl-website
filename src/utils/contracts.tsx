import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "@/app/stock/constants";
import { Contract, Signer, ethers, utils } from "ethers";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { useMetaMask } from "../hooks/useMetaMask";

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
  console.log("names", names)
  return names
}


export async function GetNumberOfEmployee(address:string){
  console.log("get number called")
  const contract = soContract(address)
  const getNumber = await contract.getTotalEmployees();
  return getNumber
  
}

export async function ListOfEmployees(address:string) {
  const contract = soContract(address)
  const _total = GetNumberOfEmployee(address);
  const total = Number(_total)
  const listOfEmployees = [];
  for (let i = 0; i < total; i++) {
    const id = i;
    const employee = await contract.employees(id);
    listOfEmployees.push(employee);
  }
  return listOfEmployees;  
}

export async function TimeStamp(address:string){
  const contract = soContract(address)
  const _time = contract.getBlockTimeStamp();
  const time = utils.formatEther(_time);
  const timeStamp = Number(time)
  return timeStamp
}