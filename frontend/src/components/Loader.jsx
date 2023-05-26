import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <>
      <Spinner
        animation="border"
        variant="secondary"
        role="status"
        style={{ width: "50px", height: "50px", display: "block" }}
      />
    </>
  )
}

export default Loader
