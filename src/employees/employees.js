import React, { useState, useEffect } from "react";
import NavBar from "../navigation/NavBar";
import { FaEdit, FaCheck } from "react-icons/fa";
import Axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    debugger;
    const { data } = await Axios.get("http://localhost:5199/getemployeeslist/");
    const employees = Array.from(data.$values);
    setEmployees(employees);
    console.log(employees);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <React.Fragment>
      {renderNavbar()}
      <div class="container mt-4">
        <label>Employés</label>
        <div class="row"></div>
        <div class="col-sm-12">
          <div className="Dashboard-panel rounded mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nom</th>
                  <th scope="col">Prénom</th>
                  <th scope="col">Profil</th>
                  <th scope="col">Manager</th>
                  <th scope="col">Date Entrée</th>
                  <th>Détails</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr>
                    <td>{employee.lastName}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.profile}</td>
                    <td>{employee.manager}</td>
                    <td>{employee.entryDate}</td>
                    <td>
                      <button onClick={handleEdit}>
                        <FaEdit></FaEdit>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function handleEdit() {
  alert("affichage details");
}

function renderNavbar() {
  const authenticated = true;
  if (authenticated) {
    return <NavBar />;
  }
  return <div></div>;
}
