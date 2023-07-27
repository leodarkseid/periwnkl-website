"use client"
import { useState, FormEvent , SyntheticEvent,useEffect} from "react";

import { GetPieData } from "@/utils/contracts";


interface PageProps {
    params: {org :string}
}

export default function Page({ params: {org} }: PageProps) {

    console.log({org}.org);
    GetPieData({org}.org);

    return (
        <div>
           
            {}
        </div>
    )
}