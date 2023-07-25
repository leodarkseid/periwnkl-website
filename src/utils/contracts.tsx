import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "@/app/stock/constants";
import { Contract, Signer } from "ethers";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import { useMetaMask } from "../hooks/useMetaMask";



export function SoContractFactory(): Contract{
  const { signer } = useMetaMask();
    try {
      
      return new Contract(
        STOCK_OPTIONS_FACTORY_CONTRACT,
        STOCK_OPTIONS_FACTORY_ABI,
        signer,
      );
    } catch (error) {
      console.error('Error creating soContractFactory:', error);
    }
  }
export const soContract =((soAddress:string, signer:Signer)=>{ new Contract(
    soAddress,
      STOCK_OPTIONS_CONTRACT_ABI,
      signer
  )})

export async function CreateStockOptionsPlan(name: string, stockOptions:number): Promise<string>{
  const soContractFactory = SoContractFactory();
  const tx = await soContractFactory.createStockOptionsPlan(name, stockOptions);
  const txReceipt = await tx.wait();
  const result: string = txReceipt.events[0].address;               
  
  return result
}