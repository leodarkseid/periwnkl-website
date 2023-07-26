"use client"
import { useState, FormEvent , SyntheticEvent,useEffect} from "react";
import Dashboard from "./dash";


interface PageProps {
    params: {org :string}
}

export default function Page({ params: {org} }: PageProps) {
   


    return (
        <div>
            
            <Dashboard />
        </div>
    )
}