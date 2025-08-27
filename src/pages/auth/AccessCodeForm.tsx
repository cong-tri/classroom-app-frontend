import { Button, Form } from "react-bootstrap";

const AccessCodeForm = () => {
  return (
    <>
      <h2>Sign In</h2>
      <p className="text-secondary">Please enter your phone to sign in</p>
      <Form className="my-5">
        <Form.Group className="mb-4">
          <Form.Control
            type="tel"
            size="lg"
            className="border-2 border-black py-3"
            placeholder="Your Phone Number"
          />
        </Form.Group>
        <Button
          variant="primary"
          size="lg"
          className="w-100 py-2"
          //   onClick={() => handleNextTabs()}
        >
          Next
        </Button>
        <small>passwordless authentication methods.</small>
      </Form>
      <p className="text-start">
        Don't having account? <span className="text-primary">Sign Up</span>
      </p>
    </>
  );
};

export default AccessCodeForm;
