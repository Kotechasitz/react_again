import Axios from "axios";
import { useState, useEffect } from "react";
import BoostrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";

const App = () => {
  const [employeeList, setEmployeeList] = useState([
    {
      name: "eiei",
      age: 10,
      country: "test",
      position: "tester",
      wage: 100,
    },
    {
      name: "eiei",
      age: 10,
      country: "test",
      position: "tester",
      wage: 100,
    },
  ]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const column = [
    { dataField: "name", text: "Name", sort: true },
    { dataField: "age", text: "Age", sort: true },
    { dataField: "country", text: "Country", sort: true },
    { dataField: "position", text: "Position", sort: true },
    { dataField: "wage", text: "Wage", sort: true },
    { dataField: "option", text: "Option" },
  ];

  const getEmployees = async () => {
    try {
      await Axios.get("http://localhost:3001/employee").then((res) => {
        setEmployeeList(res.data);
      });
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const addEmployee = async () => {
    try {
      await Axios.post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      }).then(() => {
        setEmployeeList(...employeeList, {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        });
      });
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const updateWage = async (id) => {
    try {
      await Axios.put("http://localhost:3001/update", {
        wage: newWage,
        id: id,
      }).then((res) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      });
    } catch (error) {
      console.log("error: " + error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/delete/${id}`).then((res) => {
        setEmployeeList(
          employeeList.filter((val) => {
            return val.id != id;
          })
        );
      });
    } catch (error) {
      console.log("error: " + error);
    }
  };

  // useEffect(() => {
  //   getEmployees();
  // }, []);

  return (
    <div className="App container">
      <h1>Employee Infomation</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Country"
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Position"
              onChange={(event) => {
                setPosition(event.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wage" className="form-label">
              Wage:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Wage"
              onChange={(event) => {
                setWage(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-success" onClick={addEmployee}>
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age}</p>
                <p className="card-text">Country: {val.country}</p>
                <p className="card-text">Position: {val.position}</p>
                <p className="card-text">Wage: {val.wage}</p>
                <div className="d-flex">
                  <input
                    className="form-control"
                    style={{ width: "300px" }}
                    type="number"
                    placeholder="500..."
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      updateWage(val.id);
                    }}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteEmployee(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <hr />
      <br />
      <BoostrapTable
        keyField="name"
        data={employeeList}
        columns={column}
        pagination={paginationFactory()}
      />
    </div>
  );
};

export default App;
