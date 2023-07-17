"use client";
import {Button, Form, Spinner } from "react-bootstrap";
import { useState, FormEvent } from "react";

export default function Employee() {
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query = formData.get("query")?.toString().trim();

        if (query) { console.log('search seen')
                        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search for Employee </Form.Label>
                    <div style={{ position: "relative" }}>
                    <Form.Control
                    name="query"
                    placeholder="0x00000..."
                    />
                
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: "100%",
                    borderRadius: 0,
                }}
                >
                    Search
                </Button>
                </div><Form.Text id="inputHelpBlock" muted>
                        Your address should be a valid Ethereum Wallet Address, domain name is not yet Supported
                    </Form.Text>
                </Form.Group>
            </Form>
            </div>
    );
}