// import { useState } from "react";
import { useFetchLessons } from "../../hooks";
import { Badge, Button, Container, Dropdown, Table } from "react-bootstrap";
// import ModalCRUDStudent from "./ModalCRUDStudent";
import { Lesson } from "../../interfaces";
import classNames from "classnames/bind";
import styles from "../../styles/global.module.scss";
const cx = classNames.bind(styles);

export type ModalMode = "create" | "edit" | "detail" | "delete";

const ManagementLessonsPage = () => {
  //   const [showModal, setShowModal] = useState<boolean>(false);
  //   const [modalMode, setModalMode] = useState<ModalMode>("create");
  //   const [user, setUser] = useState<User | undefined>();
  const { data, isLoading, error, refetch, isRefetching, isRefetchError } =
    useFetchLessons();

  //   const handleOncloseModal = () => {
  //     setShowModal((prev) => !prev);
  //   };

  const renderRows = (lessons: Lesson[]) => {
    return (
      <>
        {lessons.map((lesson, index) => {
          return (
            <>
              <tr key={index}>
                <td>{lesson.title}</td>
                <td>{lesson.description}</td>
                <td>{lesson.assigned_to}</td>
                <td>{new Date(lesson.assigned_at).toLocaleDateString()}</td>
                <td>
                  {lesson.status === "in progress" && (
                    <Badge bg="primary" className="py-2 fs-5">
                      In Progress
                    </Badge>
                  )}
                  {lesson.status === "pending" && (
                    <Badge bg="warning" className="py-2 fs-5">
                      Pending
                    </Badge>
                  )}
                  {lesson.status === "done" && (
                    <Badge bg="success" className="py-2 fs-5">
                      Done
                    </Badge>
                  )}
                </td>
                <td>{new Date(lesson.created_at).toLocaleDateString()}</td>
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
                        // onClick={() => {
                        //   setModalMode("detail");
                        //   handleOncloseModal();
                        //   setUser(lesson);
                        // }}
                      >
                        <i className="bi bi-eye me-2" /> View Detail
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-primary"
                        // onClick={() => {
                        //   setModalMode("edit");
                        //   handleOncloseModal();
                        //   setUser(lesson);
                        // }}
                      >
                        <i className="bi bi-pencil-square me-2" /> Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-danger"
                        // onClick={() => {
                        //   setModalMode("delete");
                        //   handleOncloseModal();
                        //   setUser(lesson);
                        // }}
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
              Manage Lessons: <span>{data?.data.length} lessons</span>
            </h3>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary me-3"
              onClick={() => {
                // setModalMode("create");
                // handleOncloseModal();
              }}
            >
              <i className="bi bi-plus-lg fs-4"></i> Assign Lesson
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <i className="bi bi-search fs-4"></i> Filter
            </button>
          </div>
        </div>
        {!data || !Array.isArray(data.data) || data.data.length === 0 ? (
          <div className={cx("emptyState")}>
            <p>Have not any lessons yet.</p>
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
                  <th>Lesson Title</th>
                  <th>Description</th>
                  <th>Assigned To</th>
                  <th>Assigned At</th>
                  <th>Status</th>
                  <th style={{ width: "10%" }}>Created At</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>{renderRows(data.data)}</tbody>
            </Table>
          </>
        )}

        {/* <ModalCRUDStudent
          modalMode={modalMode}
          showModal={showModal}
          user={user}
          handleOncloseModal={handleOncloseModal}
        /> */}
      </Container>
    </>
  );
};

export default ManagementLessonsPage;
