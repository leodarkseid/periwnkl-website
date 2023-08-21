"use client"
import { Metadata } from 'next';
import Image from 'next/image';
import ImageNotValid from '@/image/notValid.jpg';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io"


export default function NotFound() {
    const router = useRouter()

    return (
        <div className='d-flex flex-column justify-content-center align-items-center'
            style={{ "height": "83vh" }}>
            <Button variant='success' className='bg-primary-gradient text-white' onClick={() => router.back()}><IoMdArrowRoundBack /> Let&apos;s Take You Back</Button>
            <div className='text-white bg-danger my-4 py-2 px-3 rounded-pill d-flex text-center'>Uhmmm ? Either You Don&apos;t Have Access To This Or You Inputed Invalid Data !</div>
            <Image alt='404' src={ImageNotValid}
                style={{
                    "height": "40vh",
                    "width": "25vw",
                }}
            />
        </div>
    )
}