'use client';

import { redirect } from 'next/navigation';
import{useRouter} from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { Spinner } from 'react-bootstrap';

interface Props{
    children: React.ReactNode;
}


export default function RequireAuth({children}: Props){
    const router = useRouter();
    const {isLoading,isAuthenticated} = useAppSelector(state => state.auth);
    console.log("This should give insights", isAuthenticated)

    if (isLoading) {
		
		return (
				
			<div className="d-flex justify-content-center align-items-center vh-100">
			<Spinner animation="border" className="spinner-border-lg" />
		  </div>
			
		);

		
	}
   
    
    if (!isAuthenticated) {
		redirect('/');
	}
    return <>{children}</>
}