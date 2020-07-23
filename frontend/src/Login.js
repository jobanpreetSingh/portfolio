import React, { Component } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import './login.css'

export default class login extends Component {
  render() {
    return (
        <div className='topMargin'>
      <div class="container my-3 mt-3" align="center">
        <Card border="info" style={{ width: "30rem" }}>
          <Card.Header>
            <b>Login</b>
          </Card.Header>
          <Card.Body>
            <Card.Title>Portfolio</Card.Title>
            <Form>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="email" placeholder="Email" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={3}>
                  Password
                </Form.Label>
                <Col sm={6}>
                  <Form.Control type="password" placeholder="Password" />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 8, offset: 2 }}>
                  <Button  variant="outline-info" type="submit">Sign in</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">Portfolio</Card.Footer>
        </Card>
      </div>
      </div>
    );
  }
}
