import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLoginMutation } from "../slices/userApiSlice"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { userInfo } = useSelector((state) => state.auth)

  const [login, { isLoading }] = useLoginMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate("/")
    }
  }, [navigate, userInfo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      console.log("Login info: ", res)
      dispatch(setCredentials({ ...res }))
      navigate("/")
      toast.success("You have successfully logged in")
    } catch (err) {
      toast.error("Invalid Email or Password")
    }
  }

  return (
    <FormContainer>
      <h1>Log In</h1>
      <Form onSubmit={handleSubmit}>
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
        {isLoading && <Loader />}
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
