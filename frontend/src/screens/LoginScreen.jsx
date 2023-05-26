import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { Link } from "react-router-dom"
import { useState } from "react"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <FormContainer>
      <h1>Log In</h1>
      <Form>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Sign In
        </Button>
        <Row className="py-3">
          <Col>
            New Customer? <Link to="/register">Register Now</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen
