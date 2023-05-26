import { Container, Row, Col } from "react-bootstrap"

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col xs={12} md={6} className="card p-5">
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
