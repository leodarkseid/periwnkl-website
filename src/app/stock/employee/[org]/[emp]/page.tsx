"use client"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ethers, Contract, Signer } from "ethers";
import { Employee, SearchForEmployeeDetails } from "../../utils/search";

let provider: any;
let signer: Signer;
let result: Employee;

async function connect() {
  if (typeof window !== "undefined") {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum)
      signer = provider.getSigner();
      console.log("ths should be  new signer", signer)
    } catch (error) {
      console.error("provider couldn't be found: Error,", error);
    } finally {

    }
  }
}


export default function Page() {
  const [organisationName_, setOrganisationName] = useState("");
  const [totalStockOptions_, setTotalStockOptions] = useState("");
  const [stockOptions_, setStockOptions] = useState("");
  const [vestingSchedule_, setVestingSchedule] = useState("");
  const [vestingCountdown_, setVestingCountdown] = useState("");
  const [vestedOptions_, setVestedOptions] = useState("");
  const [excercisedOptions_, setExcercisedOptions] = useState("");
  const [emp, setEmp] = useState("")
  const [org, setOrg] = useState(Array<string[]>)
  const [resultL, setResult] = useState<Employee | null>(null);



  const params: Params = useParams()
  const empL = params.emp
  const orgL = params.org


  async function getD(organisation: string, employee: string) {
    try {
      connect()
      console.log("expected signer", signer)
      result = await SearchForEmployeeDetails(organisation, signer, employee) as Employee;
      console.log(result)
      setResult(result)

      console.log(result)
    } catch (error) {
      console.error("error is from 2", error)
    }
  }

  useEffect(() => {
    getD(orgL, empL);
  }, [orgL, empL])


  return (
    <div className="shadow p-3 mb-5 mt-5 bg-white rounded">
      <table className="table table-hover table-responsive">
        <thead>
          <tr>
            <th>Organisation Name</th>
            <td>
              {resultL?.organisationName}
            </td>
          </tr>
          <tr>
            <th>Total Stock Options</th>
            <td>
              {resultL?.totalStockOptions}
            </td>
          </tr>
          <tr>
            <th>Stock Options</th>
            <td>
              {resultL?.checkSO}
            </td>
          </tr>
          <tr>
            <th>Vesting Schedule</th>
            <td>
              {resultL?.checkVS}
            </td>
          </tr>
          <tr>
            <th>Vesting Countdown</th>
            <td>
              {resultL?.vestingCountdown}
            </td>
          </tr>
          <tr>
            <th>Vested Options</th>
            <td>
              {resultL?.getVestedOptions}
            </td>
          </tr>
          <tr>
            <th>Excercised Options</th>
            <td>
              {resultL?.getExcercised}
            </td>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  )
}