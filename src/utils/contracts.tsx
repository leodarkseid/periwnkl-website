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
  console.log("get number called")
  const contract = soContract(address)
  const getNumber:BigNumber = await contract.getTotalEmployees();
  return getNumber.toNumber();
  
}

export async function ListOfEmployees(address:string) {
  console.log("list of employees called")
  const contract = soContract(address)
  const _total = await GetNumberOfEmployee(address);
  const total = Number(_total)
  const listOfEmployees = [];
  for (let i = 0; i < total; i++) {
    const id = i;
    const employee = await contract.employees(id);
    listOfEmployees.push(employee);
  }
  console.log(listOfEmployees)
  return listOfEmployees;  
}

export async function TimeStamp(address:string){
  const contract = soContract(address)
  const _time = contract.getBlockTimeStamp();
  const time = utils.formatEther(_time);
  const timeStamp = Number(time)
  return timeStamp
}

export async function GetStockOptionsAmount(employeeAddress: string, address:string) {
  const contract = soContract(address);
  const a = await contract.getEmployee(employeeAddress);
  const _amount:BigNumber = a.stockOptions;
  const amount = _amount.toNumber();
  return amount
}

export async function GetPieData(address:string) {
  console.log("called lets go")
  const listResult = await ListOfEmployees(address);
          const data = await Promise.all(
            listResult.map(async (addressObj: string, index:number) => {
              const stockAmount = await GetStockOptionsAmount(addressObj, address);
              const color = ReturnColor(index);
              console.log("if index", index)
              console.log("stockAmount", stockAmount)
              console.log("returned color", color)
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