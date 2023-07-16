"use client"
import { Metadata } from 'next'
import NavBar from './Navbar';


export const metadata: Metadata = {
    title: 'Stock Manager',
    description: 'Periwnkl Stock Manager',
  }


interface Props{
    children: React.ReactNode;
}
export default function Layout({children}: Props){
    return(
        <html>
            <body>
                
            
                {/* <NavBar />       */}
                <main>
                    {children}
                </main>
            </body>
        </html>
        )
}