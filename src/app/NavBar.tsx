"use client";

import {Button, Navbar, Container, Nav, NavDropdown} from "react-bootstrap";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams} from "next/navigation"
import NavbarWalletButton from "./stock/components/navbarWalletButton"

export default function NavBar() {
    const pathname = usePathname();

    const isStockPage = pathname === "/stock";

    // Render null if it's the landing page to omit the navbar
    if (isStockPage) {
      return (
        <Navbar bg="primary" variant="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
               < Navbar.Brand as={Link}href="/stock">
                    Stock Manager
                </Navbar.Brand>
               <Navbar.Toggle aria-controls="main-navbar" />
               <Navbar.Collapse className="justify-content-end" id="main-navbar">
                    <Nav className="justify-content-end" activeKey="/stock">
                        <Nav.Link as={Link} href="/home" active={pathname === "/hello" }>My Stocks</Nav.Link>
                        <Nav.Link as={Link} href="/static" active={pathname === "/static" }>Create</Nav.Link>
                        < NavbarWalletButton/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      );
    }

    return null
}