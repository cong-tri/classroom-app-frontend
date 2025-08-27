import { Badge, Button, Col, Row, Table } from "react-bootstrap";
import { User } from "../../interfaces";
import classNames from "classnames/bind";
import styles from "../../styles/global.module.scss";
import { useViewStudentDetails } from "../../hooks";
const cx = classNames.bind(styles);

type TableDetailProps = {
  user: User | undefined;
};

const TableDetailStudent = ({ user }: TableDetailProps) => {
  const { data, isLoading, error, refetch, isRefetching, isRefetchError } =
    useViewStudentDetails(user?.phone);

  const studentDetails = data?.data;

  if (isLoading || isRefetching) {
    return <div className={cx("loading")}>Loading Data...</div>;
  }

  if (error || isRefetchError) {
    return <div className="text-danger">An error occurred</div>;
  }
  return (
    <>
      {!studentDetails ? (
        <>
          <div className={cx("emptyState")}>
            <p>Have not found student details.</p>
            <Button
              variant="primary"
              className="text-white"
              onClick={() => refetch()}
            >
              <i className="fe fe-refresh-cw" /> Reload Data
            </Button>
          </div>
        </>
      ) : (
        <>
          <Row sm={1} lg={2} className="align-items-center">
            <Col>
              <h5>Name: {studentDetails.name}</h5>
              <h5>Email: {studentDetails.email}</h5>
              <h5>Phone: {studentDetails.phone}</h5>
              <h5>Address: {studentDetails.address}</h5>
            </Col>
            <Col>
              <h5>Gender: {studentDetails.gender === 1 ? "Male" : "Female"}</h5>
              <h5>
                Status:{" "}
                {studentDetails.status === "active" && (
                  <span className="text-success">Active</span>
                )}
                {studentDetails.status === "inactive" && (
                  <span className="text-danger">Inactive</span>
                )}
              </h5>
              <h5>
                Created At:{" "}
                {new Date(studentDetails.created_at).toLocaleDateString()}
              </h5>
              <h5>
                Updated At:{" "}
                {studentDetails.updated_at !== ""
                  ? new Date(studentDetails.updated_at).toLocaleDateString()
                  : "N/A"}
              </h5>
            </Col>
          </Row>
          <h4>Assigned Lessons</h4>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assigned At</th>
              </tr>
            </thead>
            <tbody>
              {studentDetails.lessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td>{lesson.title}</td>
                  <td>{lesson.description}</td>
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
                  <td>{new Date(lesson.assigned_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default TableDetailStudent;
