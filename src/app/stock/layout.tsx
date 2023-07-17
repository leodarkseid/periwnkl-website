"use client"
import { Metadata } from 'next'

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
                <main>
                    {children}
                </main>
            </body>
        </html>
        )
}