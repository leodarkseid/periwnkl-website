import { useState, FormEvent , SyntheticEvent,useEffect} from "react";


interface PageProps {
    params: {org :string}
}

export default function Page({ params: {org} }: PageProps) {
   


    return (
        <div>
            {org}
        </div>
    )
}