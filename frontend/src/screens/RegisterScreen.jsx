import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"
import Loader from "../components/Loader"

const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.auth)

  const [register, { isLoading }] = useRegisterMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.log("password not match")
    } else {
      try {
        const res = await register({ name, email, password }).unwrap()
        console.log(res)
        dispatch(setCredentials({ ...res }))
        navigate("/")
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {isLoading && <Loader />}
        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Login Now</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
