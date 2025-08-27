import { Button, Form, Modal } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "../../styles/global.module.scss";
import { useAssignLessonMutation } from "../../hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssignLessonFormData, AssignLessonSchema } from "../../schemas";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils";
import { useEffect } from "react";
const cx = classNames.bind(styles);

type ModalProps = {
  selectedStudents: string[] | [];
  handleOncloseModalAssignLesson: () => void;
  showModalAssignLesson: boolean;
};

const initialState: AssignLessonFormData = {
  studentPhones: [],
  title: "",
  description: "",
};

const ModalAssignLesson = ({
  selectedStudents,
  handleOncloseModalAssignLesson,
  showModalAssignLesson,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AssignLessonFormData>({
    resolver: zodResolver(AssignLessonSchema),
    defaultValues: initialState,
    mode: "onSubmit",
  });

  const { mutateAsync, isPending } = useAssignLessonMutation();

  useEffect(() => {
    if (selectedStudents.length > 0) {
      setValue("studentPhones", selectedStudents);
    } else {
      return;
    }
  }, [selectedStudents, setValue]);

  const onSubmit = async (data: AssignLessonFormData) => {
    // if (selectedStudents.length === 0) return;
    try {
      // setValue("studentPhones", selectedStudents);

      const response = await mutateAsync({
        data,
      });

      if (response && response.code === 200 && response.success) {
        toast.success(response.message || "Assign lesson successfully");
        handleOncloseModalAssignLesson();
        reset();
      } else {
        toast.error(response?.message || "Assign lesson failed");
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
    }
  };

  return (
    <>
      <Modal
        show={showModalAssignLesson}
        onHide={() => {
          handleOncloseModalAssignLesson();
          reset(initialState);
        }}
        centered
        backdrop="static"
        className={cx("customModal")}
      >
        <Modal.Header closeButton className={cx("modalHeader")}>
          <Modal.Title>Assign Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx("modalBody")}>
          <p>
            Are you sure you want to assign lessons to the selected students?
          </p>
          <ul>
            {selectedStudents.map((phone, index) => (
              <li key={index}>{phone}</li>
            ))}
          </ul>
          <h5>Lesson Details</h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="title">
                Lesson Title <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                size="lg"
                placeholder="Please enter lesson title"
                {...register("title")}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {getErrorMessage(errors.title)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">
                Lesson Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                size="lg"
                as="textarea"
                rows={4}
                placeholder="Please enter lesson description"
                {...register("description")}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {getErrorMessage(errors.description)}
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => reset(initialState)}
                disabled={isPending}
                className={cx("modalButton")}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isPending}
                className={cx("modalButton")}
              >
                {isPending ? <span className={cx("spinner")} /> : "Submit"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAssignLesson;
