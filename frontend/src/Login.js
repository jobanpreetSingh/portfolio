import React, { Component } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import './login.css'

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

  }

  handleEmail = (event) => {
    this.setState({ email: event.target.value });
    console.log(this.state.email)
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value })
    console.log(this.state.password)
  }

  handleform = (e) => {
    const { email, password } = this.state
    this.callApi(email, password);
  }
  callApi = async (username, password) => {
    await fetch('http://localhost:7000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            return console.log("error occured", data.error);
          }
          console.log(data);
        });
      }
    );
  }

  render() {
    return (
      <div className='topMargin'>
        <div className="container my-3 mt-3" align="center">
          <Card border="info" style={{ width: "30rem" }}>
            <Card.Header>
              <b>Login</b>
            </Card.Header>
            <Card.Body>
              <Card.Title>Portfolio</Card.Title>
              <Form onSubmit={this.handleform}>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={3}>
                    Email
                </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      // value={this.state.email}
                      onChange={this.handleEmail}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={3}>
                    Password
                </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      // value={this.state.password}
                      onChange={this.handlePassword}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm={{ span: 8, offset: 2 }}>
                    <Button variant="outline-info" type="submit">Sign in</Button>
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
