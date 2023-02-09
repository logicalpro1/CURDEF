import React, { useEffect, useState } from "react";
import { Button, Modal, ModalTitle } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Employee = () => {
  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);
  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    SetViewShow(false);
  };
  //FOr Edit Model
  const [ViewEdit, SetEditShow] = useState(false);
  const handleEditShow = () => {
    SetEditShow(true);
  };
  const hanldeEditClose = () => {
    SetEditShow(false);
  };
  //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false);
  const handleDeleteShow = () => {
    SetDeleteShow(true);
  };
  const hanldeDeleteClose = () => {
    SetDeleteShow(false);
  };
  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    SetPostShow(true);
  };
  const hanldePostClose = () => {
    SetPostShow(false);
  };

  //Define here local state that store the form Data

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [department, setdepartment] = useState("");
  const [DoB, setDoB] = useState("");
  //const [startDate, setStartDate] = useState("");

  const handleChange = (event) => {
    if (searchTerm.length > event.target.value.length) {
      GetEmployeeData();
    }
    setSearchTerm(event.target.value);
    const newData = Data.filter((employee) => {
      return employee?.name.includes(event.target.value)||employee?.department.includes(event.target.value)||employee?.email.includes(event.target.value);
    });
    setData(newData);
  };

  const base = "https://demooo.azurewebsites.net/";

  const [Delete, setDelete] = useState(false);
  //Id for update record and Delete
  const [id, setId] = useState("");
  const GetEmployeeData = () => {
    //here we will get all employee data

    const url = base + "api/Employee/GetEmployees";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.data);
        const result = response.data;
        const { statusCode, message, data } = result;
        if (statusCode != 200) {
          alert(message, statusCode);
        } else {
          setData(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmite = () => {
    const url = base + "api/Employee/AddEmployee";
    const Credentials = { name, email, department, DoB };
    axios
      .post(url, Credentials)
      .then((response) => {
        const result = response.data;
        const { statusCode, message, data } = result;
        if (statusCode != 200) {
          alert(data, statusCode);
        } else {
          alert(message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEdit = () => {
    const url = base + `api/Employee/EditEmployee`;
    const Credentials = { id, name, email, DoB, department };
    axios
      .put(url, Credentials)
      .then((response) => {
        const result = response.data;
        const { statusCode, message, data } = result;
        if (statusCode != 200) {
          alert(data, statusCode);
        } else {
          alert(message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //handle Delete Function
  const handleDelete = () => {
    const url = base + `api/Employee/DeleteEmployee`;
    console.log("id = " + id);
    const Credentials = { id };
    console.log(Credentials);
    axios
      .delete(`${url}/${id}`)
      .then((response) => {
        const result = response.data;
        const { statusCode, message, data } = result;
        if (statusCode != 200) {
          alert(message, statusCode);
        } else {
          alert(message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle search
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm === "") {
      GetEmployeeData();
    } else {
      const newData = Data.filter((employee) => {
        return employee?.name.includes(searchTerm)||employee?.department.includes(searchTerm)||employee?.email.includes(searchTerm);
      });

      setData(newData);
    }
  };

  //call this function in useEffect
  console.log(ViewShow, RowData);
  useEffect(() => {
    GetEmployeeData();
  }, []);

  return (
    <div>
      <div
        className="row"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-sm-10">
          <form className="d-flex my-4 my-lg-0">
            <input
              type="text"
              className="form-control mr-sm-2"
              placeholder="Search by Name or email or Department"
              value={searchTerm}
              onChange={handleChange}
              style={{ width: "30%" }}
            />
            <button
              style={{ marginLeft: 10 }}
              className="btn btn-primary my-2 my-sm-0"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
        <div className="col">
          <div className="mt-5 mb-4">
            <Button
              variant="primary"
              onClick={() => {
                handlePostShow();
              }}
            >
              <i className="fa fa-plu"></i>
              Add New Employee
            </Button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.department}</td>
                  <td>{new Date(item.doB).toLocaleDateString()}</td>
                  <td style={{ minWidth: 190 }}>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        handleViewShow(SetRowData(item));
                      }}
                    >
                      View
                    </Button>
                    |
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        handleEditShow(
                          SetRowData(item),
                          setId(item.id),
                          setname(item.name),
                          setDoB(item.doB),
                          setemail(item.email),
                          setdepartment(item.department)
                        );
                      }}
                    >
                      Edit
                    </Button>
                    |
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        handleViewShow(
                          SetRowData(item),
                          setId(item.id),
                          setname(item.name),
                          setDoB(item.doB),
                          setemail(item.email),
                          setdepartment(item.department),
                          setDelete(true)
                        );
                      }}
                    >
                      Delete
                    </Button>
                    |
                  </td>
                </tr>
              ))}
              ,
            </tbody>
          </table>
        </div>
      </div>
      {/* View Modal */}
      <div className="model-box-view">
        <Modal
          show={ViewShow}
          onHide={hanldeViewClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>View Employee Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.name}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  value={RowData.email}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={RowData.department}
                  readOnly
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  value={new Date(RowData.doB).toLocaleDateString()}
                  readOnly
                />
              </div>
              {Delete && (
                <Button
                  type="submit"
                  className="btn btn-danger mt-4"
                  onClick={handleDelete}
                >
                  Delete Employee
                </Button>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldeViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Modal for submit data to database */}
      <div className="model-box-view">
        <Modal
          show={ViewPost}
          onHide={hanldePostClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add new Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Please enter Name"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Please enter email"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setdepartment(e.target.value)}
                  placeholder="Please enter department"
                />
              </div>
              <div className="form-group mt-3">
                <DatePicker
                  selected={DoB}
                  onChange={(date) => setDoB(date)}
                  className="form-control"
                  placeholderText="Please enter DoB"
                />
              </div>
              <Button
                type="submit"
                className="btn btn-success mt-4"
                onClick={handleSubmite}
              >
                Add Employee
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldePostClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Modal for Edit employee record */}
      <div className="model-box-view">
        <Modal
          show={ViewEdit}
          onHide={hanldeEditClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Please enter Name"
                  defaultValue={RowData.name}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Please enter email"
                  defaultValue={RowData.email}
                />
              </div>
              <div className="form-group mt-3">
                <label>department</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setdepartment(e.target.value)}
                  placeholder="Please enter department"
                  defaultValue={RowData.department}
                />
              </div>
              <div className="form-group mt-3">
                <DatePicker
                  selected={new Date(DoB)}
                  onChange={(date) => setDoB(date)}
                  className="form-control"
                  placeholderText="Please enter DoB"
                />
              </div>
              <Button
                type="submit"
                className="btn btn-warning mt-4"
                onClick={handleEdit}
              >
                Edit Employee
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hanldeEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Employee;
