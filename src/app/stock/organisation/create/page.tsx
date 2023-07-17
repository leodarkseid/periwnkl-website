"use client"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Create(){

    return(
        <>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Organisation Name</Form.Label>
        <Form.Control type="name" placeholder="Enter Organisation Name" />
        <Form.Text className="text-muted">
          You can always change the name later
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Total amount of stock Options</Form.Label>
        <Form.Control type="number" placeholder="0" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
    )
}