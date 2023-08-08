"use client";

import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import NavbarWalletButton from "./navbarWalletButton"

export default function NavBar() {
    const pathname = usePathname();

    const isStockPage = pathname.startsWith("/stock");
    const isWagePage = pathname.startsWith("/wagepay");
    const isFrontPage = pathname.startsWith("/");

    // Render null if it's the landing page to omit the navbar
    if (isStockPage) {
        return (
            <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
                <Container>
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

    else if (isFrontPage){
        return (
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image
                            alt=""
                            src="../image/logoBlue.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Periwnkl
                    </Navbar.Brand>
                </Container>
            </Navbar>
        );
    }

    return null
}