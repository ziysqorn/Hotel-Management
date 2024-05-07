import React from "react";
import "./Design.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUserCircle,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/react-fontawesome";

export const EmployeesList = () => {
  let employees = [
    {
      name: "John",
      phone: "123-456-789",
      role: "manager",
      Firstday: "12/09/2016",
    },
    {
      name: "Linda",
      phone: "012-023-034",
      role: "staff",
      Firstday: "03/12/2020",
    },
    {
      name: "Phap",
      phone: "111-222-333",
      role: "staff",
      Firstday: "27/02/2019",
    },
    {
      name: "Danvinci",
      phone: "000-000-000",
      role: "staff",
      Firstday: "11/10/2021",
    },
  ];

  return (
    <div className="employees-list" style={{ height: "40vh" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {employees.map((employee) => (
          <li
            key={employee.name} // Sử dụng tên làm key, đảm bảo duy nhất
            style={{
              background: "black",
              color: "white",
              alignItems: "center",
              borderRadius: 5,
              height: "14vh",
              width: "23vw",
              margin: "5px",
              padding: "5px",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                margin: "5px",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div
                style={{
                  width: "70%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ marginLeft: "1%", marginRight: "5%" }}
                />
                {employee.name}
              </div>
              <FontAwesomeIcon
                icon={faEye}
                className="faEye"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div style={{ marginLeft: "5%", fontSize: "14px", padding: "2%" }}>
              {employee.phone}
            </div>
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  padding: "2px",
                  borderRadius: 5,
                  marginLeft: "5%",
                  fontSize: "13px",
                  width: "20%",
                  alignItems: "center",
                  border: "solid #2E2E2E 1px",
                }}
              >
                {employee.role}
              </div>
              <div
                style={{
                  display: "flex",
                  borderRadius: 5,
                  alignItems: "center",
                  marginLeft: "5%",
                  padding: "1%",
                  border: "solid #2E2E2E 1px",
                }}
              >
                <FontAwesomeIcon icon={faCalendar} />
                <div style={{ fontSize: "13px", marginLeft: "3%" }}>
                  {employee.Firstday}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
