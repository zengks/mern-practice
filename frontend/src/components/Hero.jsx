import { Button, Card, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center w-75">
          <h1 className="mb-4">MERN Authentication Practice</h1>
          <p className="text-center mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            eius eum, magnam fugiat facilis molestiae laudantium ipsam commodi
            adipisci quas iure provident pariatur quia architecto harum fugit
            veritatis aut unde.
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button className="me-3" variant="primary">
                Log In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Sign Up</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default Hero
