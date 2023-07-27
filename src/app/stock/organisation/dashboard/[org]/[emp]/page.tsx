"use client"
import { useState, FormEvent , SyntheticEvent,useEffect} from "react";

import { GetPieData } from "@/utils/contracts";
import { EmpDashBoard } from "./orgEmpDash";


interface PageProps {
    params: {emp :string}
}

export default function Page({ params: {emp} }: PageProps) {


    return (
        <div>
           
            <EmpDashBoard address={{emp}.emp}/>
        </div>
    )
}