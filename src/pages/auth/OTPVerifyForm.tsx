import { Button, Form } from "react-bootstrap";

const OTPVerifyForm = () => {
  return (
    <>
      <h2>Phone verification</h2>
      <p className="text-secondary">
        Please enter your code that send <br /> to your phone
      </p>
      <Form className="my-5">
        <Form.Group className="mb-4">
          <Form.Control
            type="string"
            size="lg"
            className="border-2 border-black py-3"
            placeholder="Enter Your Code"
          />
        </Form.Group>
        <Button variant="primary" size="lg" className="w-100 py-2">
          Submit
        </Button>
        <p className="text-start pt-4">
          Code not receive? <span className="text-primary">Send again</span>
        </p>
      </Form>
    </>
  );
};

export default OTPVerifyForm;
