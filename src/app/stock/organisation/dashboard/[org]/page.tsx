"use client"
import { useState, FormEvent , SyntheticEvent,useEffect} from "react";
import Dashboard from "./dash";
import { GetPieData } from "@/utils/contracts";


interface PageProps {
    params: {org :string}
}

export default function Page({ params: {org} }: PageProps) {
    return (
        <div>
           
            <Dashboard address={{org}.org} />
        </div>
    )
}