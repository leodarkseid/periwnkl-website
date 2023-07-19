"use client"
import {ethers, Contract, Signer, providers } from "ethers";
import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "./../constants";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";

let provider: any;
    let signer: Signer;
    let soContract: Contract;
    let accounts: any[];
    let account;
    if (typeof window !== 'undefined') {
        try{
        provider = new ethers.providers.Web3Provider((window as any).ethereum);
      }catch(error){
        console.error("provider couldn't be created", error)
      }
      }
      

export default function PageBox(){
    const [soAddress, setSoAddress] = useState("");

    try{
        signer = provider.getSigner();
        account = signer.getAddress();
        soContract = new Contract(
          soAddress,
          STOCK_OPTIONS_CONTRACT_ABI,
          signer
        )
      } catch(error){
        console.error('Error creating Contracts', error)
      }

   

      useEffect(()=>{
        async function connect() {
            let account =await signer.getAddress();
                provider.on('accountsChanged', function (accounts: any[]) {
                account = accounts[0];
                });}connect()
      },[])
      
    return(
        <div className="shadow p-3 mb-5 mt-5 bg-white rounded">
        </div>
    );
}