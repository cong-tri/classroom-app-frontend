import { useState } from "react";
import { useFetchStudents } from "../../hooks";
import { Badge, Button, Container, Dropdown, Table } from "react-bootstrap";
import ModalCRUDStudent from "./ModalCRUDStudent";
import { User } from "../../interfaces";
import classNames from "classnames/bind";
import styles from "../../styles/global.module.scss";
import ModalAssignLesson from "./ModalAssignLesson";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

export type ModalMode = "create" | "edit" | "detail" | "delete";

const ManagementStudentsPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalAssignLesson, setShowModalAssignLesson] =
    useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [user, setUser] = useState<User | undefined>();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const { data, isLoading, error, refetch, isRefetching, isRefetchError } =
    useFetchStudents();

  const handleOncloseModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleOncloseModalAssignLesson = () => {
    setShowModalAssignLesson((prev) => !prev);
  };

  const handleSelectStudent = (phone: string) => {
    setSelectedStudents((prev) =>
      prev.includes(phone) ? prev.filter((p) => p !== phone) : [...prev, phone]
    );
  };

  const handleSelectAll = (checked: boolean, users: User[]) => {
    if (checked) {
      setSelectedStudents(users.map((s) => s.phone));
    } else {
      setSelectedStudents([]);
    }
  };

  const renderRows = (users: User[]) => {
    return (
      <>
        {users.map((student, index) => {
          return (
            <>
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.phone)}
                    onChange={() => handleSelectStudent(student.phone)}
                  />
                </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.gender === 0 ? "Female" : "Male"}</td>
                <td>{student.address}</td>
                <td>
                  {student.status === "active" && (
                    <Badge bg="success" className="py-2 fs-5">
                      Active
                    </Badge>
                  )}
                  {student.status === "inactive" && (
                    <Badge bg="danger" className="py-2 fs-5">
                      Inactive
                    </Badge>
                  )}
                </td>
                <td>{new Date(student.created_at).toLocaleDateString()}</td>
                <td>
                  <Dropdown align="start" drop="start">
                    <Dropdown.Toggle
                      variant="light"
                      size="sm"
                      className={cx("btn-icon-only")}
                      id="dropdown-basic"
                    >
                      <i className="bi bi-gear fs-3" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        className="text-success"
                        onClick={() => {
                          setModalMode("detail");
                          handleOncloseModal();
                          setUser(student);
                        }}
                      >
                        <i className="bi bi-eye me-2" /> View Detail
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-primary"
                        onClick={() => {
                          setModalMode("edit");
                          handleOncloseModal();
                          setUser(student);
                        }}
                      >
                        <i className="bi bi-pencil-square me-2" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-danger"
                        onClick={() => {
                          setModalMode("delete");
                          handleOncloseModal();
                          setUser(student);
                        }}
                      >
                        <i className="bi bi-trash me-2" /> Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            </>
          );
        })}
      </>
    );
  };

  if (isLoading || isRefetching) {
    return <div className={cx("loading")}>Loading Data...</div>;
  }

  if (error || isRefetchError) {
    return <div className="text-danger">An error occurred</div>;
  }

  return (
    <>
      <Container fluid className={cx("menuManagementPage")}>
        <div
          className={cx(
            "header",
            "d-flex justify-content-between align-items-center"
          )}
        >
          <div>
            <h3>
              Manage Students: <span>{data?.data.length} students</span>
            </h3>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-success me-3"
              onClick={() => {
                if (selectedStudents.length === 0) {
                  toast.error(
                    "Please select at least one student to assign lesson"
                  );
                  return;
                }
                handleOncloseModalAssignLesson();
              }}
            >
              <i className="bi bi-book fs-4"></i> Assign Lesson
            </button>
            <button
              type="button"
              className="btn btn-outline-primary me-3"
              onClick={() => {
                setModalMode("create");
                handleOncloseModal();
              }}
            >
              <i className="bi bi-plus-lg fs-4"></i> Add Student
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <i className="bi bi-search fs-4"></i> Filter
            </button>
          </div>
        </div>
        {!data || !Array.isArray(data.data) || data.data.length === 0 ? (
          <div className={cx("emptyState")}>
            <p>Have not any students yet.</p>
            <Button
              variant="primary"
              className="text-white"
              onClick={() => refetch()}
            >
              <i className="fe fe-refresh-cw" /> Reload Data
            </Button>
          </div>
        ) : (
          <>
            <Table bordered hover responsive className={cx("menuTable")}>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>
                    <input
                      type="checkbox"
                      checked={
                        data?.data.length > 0 &&
                        selectedStudents.length === data?.data.length
                      }
                      onChange={(e) =>
                        handleSelectAll(e.target.checked, data?.data)
                      }
                    />
                  </th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th style={{ width: "8%" }}>Gender</th>
                  <th>Address</th>
                  <th style={{ width: "10%" }}>Status</th>
                  <th style={{ width: "10%" }}>Created At</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>{renderRows(data.data)}</tbody>
            </Table>
          </>
        )}

        <ModalAssignLesson
          selectedStudents={selectedStudents}
          handleOncloseModalAssignLesson={handleOncloseModalAssignLesson}
          showModalAssignLesson={showModalAssignLesson}
        />

        <ModalCRUDStudent
          modalMode={modalMode}
          showModal={showModal}
          user={user}
          handleOncloseModal={handleOncloseModal}
        />
      </Container>
    </>
  );
};

export default ManagementStudentsPage;
