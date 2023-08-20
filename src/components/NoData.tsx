"use client"

import Image from "next/image";
import NoData from "@/image/noData.jpg"

export default function NoDataImg (){
    return(
        <><Image alt="No Data Image" style={{"justifySelf":"center", "alignSelf":"center", "display":"relative","height":"65vh", "width":"65vh"}} src={NoData} /></>
        
    )
}