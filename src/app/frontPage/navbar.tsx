"use client"
import Image from "next/image";
import { Navbar, Container } from "react-bootstrap";

export default function FPNavbar() {
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            alt=""
                            src="/img/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        React Bootstrap
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}