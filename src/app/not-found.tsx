"use client"
import { Metadata } from 'next';
import Image from 'next/image';
import Image404 from '@/image/404Image.svg'; 


export const metadata: Metadata = {
  title: 'ERROR 404 || Periwnkl',
  description: 'something went wrong',
}

export default function NotFound() {
    return (
        <div className='d-flex justify-content-center h-100 align-items-center'
        style={{"height":"100vh "}}
        >
          <Image alt='404' src={Image404}
          style={{
            "height":"70vh",
            "width":"70vh",
          }}
          />
        </div>
    )
}