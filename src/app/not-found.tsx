"use client"
import { Metadata } from 'next';
import Image from 'next/image';
import Image404 from '@/image/404Image.svg'; 
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';


export const metadata: Metadata = {
  title: 'ERROR 404 || Periwnkl',
  description: 'something went wrong',
}

export default function NotFound() {
    const router = useRouter()

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'
        style={{"height":"100vh"}}>
            <Button className='bg-primary-gradient w-25 text-white' onClick={() => router.back() }>Let&apos;s Take You Back</Button>
          <Image alt='404' src={Image404}
          style={{
            "height":"70vh",
            "width":"70vw",
          }}
          />
        </div>
    )
}