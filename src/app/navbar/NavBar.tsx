"use client";

import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Logo from "@/image/logoBlue.png";
import LogoText from "@/image/logoText.png";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NavbarWalletButton from "./navbarWalletButton";
import LogoWhite from "@/image/logoWhite.svg";

export default function NavBar() {
    const pathname = usePathname();

    const isStockPage = pathname.startsWith("/stock");
    const isWagePage = pathname.startsWith("/wagepay");
    const isFrontPage = pathname.startsWith("/");
    const is404 = pathname.startsWith("/");

    // Render null if it's the landing page to omit the navbar
    if (isStockPage) {
        return (
            <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
                <Container>
                    < Navbar.Brand as={Link} href="/">
                        <Image alt="Logo" src={LogoWhite} width={35}/>
                    </Navbar.Brand>
                    < Navbar.Brand as={Link} href="/stock">
                        Stock Manager
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse className="justify-content-end" id="main-navbar">
                        <Nav className="justify-content-end" activeKey="/stock">
                            <Nav.Link as={Link} href="/stock/employee" active={pathname === "/stock/employee"}>Employee</Nav.Link>

                            <NavDropdown title="Organisation" id="topics-dropdown" active={pathname.startsWith("/stock/organisation")}>
                                <NavDropdown.Item as={Link} href="/stock/organisation/create" active={pathname === "/stock/organisation/create"}>Create</NavDropdown.Item>
                                <NavDropdown.Item as={Link} href="/stock/organisation/dashboard" active={pathname.startsWith("/stock/organisation/dashboard")}>Dashboard</NavDropdown.Item>
                            </NavDropdown>
                            < NavbarWalletButton />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
    else if (isWagePage) {
        return (
            <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
                <Container>
                    < Navbar.Brand as={Link} href="/">
                        <Image alt="Logo" src={LogoWhite} width={35} />
                    </Navbar.Brand>
                    < Navbar.Brand as={Link} href="/wagepay">
                        Wage Pay
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-navbar" />
                    <Navbar.Collapse className="justify-content-end" id="main-navbar">
                        <Nav className="justify-content-end" activeKey="/wagepay">
                            <Nav.Link as={Link} href="/wagepay/employee" active={pathname === "/wagepay/employee"}>Employee</Nav.Link>
                            <Nav.Link as={Link} href="/wagepay/organisation" active={pathname === "/wagepay/organisation"}>Organisation</Nav.Link>
                            < NavbarWalletButton />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

    else{
        return (
            <Navbar color="primary" className="shadow-sm bg-body-tertiary ">
                <Container>
                    <Navbar.Brand href="/">
                        {/* <Image
                            alt="Logo"
                            src={Logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '} */}
                        <Image
                            alt="LogoText"
                            src={LogoText}
                        />
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end text-primary" id="main-navbar">
                        <Nav className="justify-content-end text-primary" >
                            <Nav.Link className="text-primary" as={Link} href="/stock" >Stock Options</Nav.Link>
                            <Nav.Link className="text-primary" as={Link} href="/wagepay" >Wage Pay</Nav.Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

    return null
}