import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "@/app/stock/constants";
import { Contract, Signer, ethers, utils } from "ethers";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { useMetaMask } from "../hooks/useMetaMask";


const provideR = new ethers.providers.Web3Provider((window as any).ethereum);
const signer = provideR.getSigner();
const soContractFactory = SoContractFactory();


export function SoContractFactory(): Contract{
    return new Contract(
        STOCK_OPTIONS_FACTORY_CONTRACT,
        STOCK_OPTIONS_FACTORY_ABI,
        signer,)
  }
export const soContract =((soAddress:string)=>{ new Contract(
    soAddress,
      STOCK_OPTIONS_CONTRACT_ABI,
      signer
  )})

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
  const contract = await soContract(address)
  const _getNumber = await contract.totalEmployees();
  const getNumber: string = utils.formatEther(_getNumber);
  return getNumber
}