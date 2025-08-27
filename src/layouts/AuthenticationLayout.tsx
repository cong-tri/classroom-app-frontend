import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import { Slide, ToastContainer } from "react-toastify";

const AuthenticationLayout = () => {
  return (
    <section>
      <Container
        className="d-flex align-items-center justify-content-between"
        style={{ height: "100vh" }}
      >
        <Outlet />
      </Container>
      <ToastContainer
        position="top-center"
        style={{ width: "100%" }}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={false}
        theme="light"
        transition={Slide}
        autoClose={2000}
      />
    </section>
  );
};

export default AuthenticationLayout;
