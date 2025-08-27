import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateStudentFormData, CreateStudentSchema } from "../../schemas";
import { getErrorMessage } from "../../utils";
import { User } from "../../interfaces";
import { ModalMode } from ".";
import { useEffect } from "react";
import { useStudentMutation } from "../../hooks";
import { toast } from "react-toastify";
import TableDetailStudent from "./TableDetailStudent";
import classNames from "classnames/bind";
import styles from "../../styles/global.module.scss";
const cx = classNames.bind(styles);

type ModalFormProps = {
  showModal: boolean;
  modalMode: ModalMode;
  user: User | undefined;
  handleOncloseModal: () => void;
};

const initialState: CreateStudentFormData = {
  name: "",
  email: "",
  phone: "",
  gender: 1,
  role: "",
  address: "",
};

const ModalCRUDStudent = ({
  showModal,
  modalMode,
  user,
  handleOncloseModal,
}: ModalFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStudentFormData>({
    resolver: zodResolver(CreateStudentSchema),
    defaultValues: initialState,
    mode: "onSubmit",
  });
  const { mutateAsync, isPending } = useStudentMutation();

  useEffect(() => {
    if (modalMode === "delete" || modalMode === "detail") return;
    if (!user) return;
    reset({
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      address: user.address,
    });
  }, [user, modalMode, reset]);

  const handleCreateStudent = async (data: CreateStudentFormData) => {
    try {
      const response = await mutateAsync({
        mode: "create",
        data,
      });
      if (response && response.code === 200 && response.success) {
        toast.success(response.message || "Create student successfully");
        handleOncloseModal();
        reset();
      } else {
        toast.error(response?.message || "Create student failed");
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    }
  };

  const handleUpdateStudent = async (data: CreateStudentFormData) => {
    if (!user) return;
    try {
      const response = await mutateAsync({
        mode: "edit",
        phone: user.phone,
        data,
      });
      if (response && response.code === 200 && response.success) {
        toast.success(response.message || "Update student successfully");
        handleOncloseModal();
        reset();
      } else {
        toast.error(response?.message || "Update student failed");
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    }
  };

  const handleDeleteStudent = async () => {
    if (!user) return;
    try {
      const response = await mutateAsync({
        mode: "delete",
        phone: user.phone,
      });

      if (response && response.code === 200 && response.success) {
        toast.success(response.message || "Delete student successfully");
        handleOncloseModal();
        reset();
      } else {
        toast.error(response?.message || "Delete student failed");
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    }
  };

  const onSubmit = async (data: CreateStudentFormData) => {
    if (modalMode === "create") {
      return await handleCreateStudent(data);
    } else if (modalMode === "edit") {
      return await handleUpdateStudent(data);
    } else {
      return;
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          handleOncloseModal();
        }}
        centered
        className={cx("customModal")}
        backdrop="static"
        size={
          modalMode === "create" ||
          modalMode === "edit" ||
          modalMode === "detail"
            ? "lg"
            : undefined
        }
      >
        <Modal.Header closeButton className={cx("modalHeader")}>
          <Modal.Title>
            {modalMode === "create" && "Create Student"}
            {modalMode === "edit" && "Edit Student"}
            {modalMode === "delete" && "Delete Student"}
            {modalMode === "detail" && "Details Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx("modalBody")}>
          {modalMode === "detail" && <TableDetailStudent user={user} />}
          {modalMode !== "detail" && modalMode !== "delete" && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row lg={1} xl={2} className="align-items-top">
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">
                      Student Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      placeholder="Please enter student name"
                      {...register("name")}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {getErrorMessage(errors.name)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">
                      Email Address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      size="lg"
                      placeholder="Please enter email address"
                      {...register("email")}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {getErrorMessage(errors.email)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      placeholder="Please enter student address"
                      {...register("address")}
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {getErrorMessage(errors.address)}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="phone">
                      Phone Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      size="lg"
                      readOnly={modalMode === "edit"}
                      placeholder="Please enter phone number"
                      {...register("phone")}
                      isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {getErrorMessage(errors.phone)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="role">Role</Form.Label>
                    <Form.Select
                      size="lg"
                      {...register("role")}
                      isInvalid={!!errors.role}
                    >
                      <option value="">Please choose role</option>
                      <option value="student">Student</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {getErrorMessage(errors.role)}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="gender">Gender</Form.Label>
                    <Form.Select
                      size="lg"
                      {...register("gender", {
                        valueAsNumber: true,
                        value: -1,
                      })}
                      isInvalid={!!errors.gender}
                    >
                      <option value={-1}>Please choose gender</option>
                      <option value={1}>Male</option>
                      <option value={0}>Female</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {getErrorMessage(errors.gender)}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <div className="float-end">
                <Button
                  variant="warning"
                  onClick={() => reset(initialState)}
                  className={cx("modalButton", "me-3")}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isPending}
                  className={cx("modalButton")}
                >
                  {isPending && <span className={cx("spinner")} />}
                  {!isPending && modalMode === "create" && "Create"}
                  {!isPending && modalMode === "edit" && "Save Changes"}
                </Button>
              </div>
            </Form>
          )}
          {modalMode === "delete" && user && (
            <>
              <div>
                <h5>Are you sure to delete this student "{user.name}"?</h5>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => handleOncloseModal()}
                    disabled={isPending}
                    className={cx("modalButton")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="danger"
                    disabled={isPending}
                    onClick={() => handleDeleteStudent()}
                    className={cx("modalButton")}
                  >
                    {isPending ? <span className={cx("spinner")} /> : "Delete"}
                  </Button>
                </Modal.Footer>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCRUDStudent;
