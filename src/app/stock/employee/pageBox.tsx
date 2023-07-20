"use client"
import {ethers, Contract, Signer, providers } from "ethers";
import { STOCK_OPTIONS_CONTRACT_ABI, STOCK_OPTIONS_FACTORY_ABI, STOCK_OPTIONS_FACTORY_CONTRACT } from "./../constants";
import { useState, useRef, SyntheticEvent, useEffect, useCallback, useMemo } from "react";
import SearchForEmployeeDetails from "./utils/get_employee"
import { Employee } from "./utils/get_employee"

    let provider: any;
    let signer: Signer;
    let soContract: Contract;
    let accounts: any[];
    let account;
    let result: Employee | undefined;
    
    if (typeof window !== 'undefined') {
        try{
        provider = new ethers.providers.Web3Provider((window as any).ethereum);
      }catch(error){
        console.error("provider couldn't be found: Error, pageBox", error)
      }
      }
      

export default function PageBox(organisation:string, employee: string){
  console.log("page box called")
    // const [employeeDetails, setEmployeeDetails] = useState<Employee | undefined>();
    getD(organisation, employee)
    async function getD(organisation:string, employee: string){
    const [superSub, sub2] = await ethers.getSigners();
    try{
        provider ? signer = provider.getSigner(): signer = signer
        result = await SearchForEmployeeDetails(organisation, signer, employee);
        // setEmployeeDetails(result)
        console.log(result)
      } catch(error){
        console.error(error)
      }}

   

      // useEffect(()=>{
      //   async function connect() {
      //       let account =await signer.getAddress();
      //           provider.on('accountsChanged', function (accounts: any[]) {
      //           account = accounts[0];
      //           });}connect()
      // },[])
      
    return(
        <div className="shadow p-3 mb-5 mt-5 bg-white rounded">
          <table className="table table-hover table-responsive">
          <thead>
              <tr>
                <th>Organisation Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              
                <tr>
                  <td>
                    
                    {/* {employeeDetails?.checkSO}
                    {employeeDetails?.checkVS}
                    {employeeDetails?.organisationName}
                    {employeeDetails?.totalStockOptions}
                    {employeeDetails?.vestingCountdown}
                    {employeeDetails?.getVestedOptions}
                    {employeeDetails?.getExcercised} */}

                  </td>
                  
                </tr>
              
            </tbody>
          </table>
          {result?.checkSO}
        </div>
    );
}