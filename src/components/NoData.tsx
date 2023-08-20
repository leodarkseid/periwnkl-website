"use client"

import Image from "next/image";
import NoData from "@/image/noData.jpg"

export default function NoDataImg (){
    return(
        <><Image alt="No Data Image" src={NoData} /></>
        
    )
}