"use client";
import {Button, Form, Col, Row } from "react-bootstrap";
import { useState, FormEvent } from "react";


export default function Organisation() {
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
                    <Form>
            <Row className="align-items-center">
                <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    Username
                </Form.Label>
                <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder="Username"
                />
                </Col>
                <Col xs="auto">
                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    Password
                </Form.Label>
                <Form.Control
                    type="password"
                    className="mb-2"
                    id="inlineFormInputGroup"
                    placeholder="Password"
                />
                </Col>
            </Row>
            </Form>
            </div>
    );
}