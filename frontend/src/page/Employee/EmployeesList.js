import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Design.css";
import { EditEmployModal } from "./Modal/EditEmployModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCalendar,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export const EmployeesList = ({ employees }) => {
  const [EditWindow, setEditWindow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Thêm state để lưu thông tin của nhân viên được chọn
  
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee); // Lưu thông tin của nhân viên được chọn
    setEditWindow(true); // Mở modal chỉnh sửa
  };

  return (
    <div
      className="employees-list"
      style={{ height: "45vh", marginTop: "10px" }}
    >
      {employees.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0, width: "100%" }}>
          {employees.map((employee, index) => (
            <li
              key={index} // Sử dụng index làm key, đảm bảo duy nhất
              style={{
                background: "black",
                color: "white",
                borderRadius: 5,
                height: "50%",
                width: "95%",
                margin: "5px",
                padding: "5px",
              }}
            >
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  margin: "5px",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div
                  style={{
                    width: "75%",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5vw"
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{ marginLeft: "1%", marginRight: "5%",  }}
                  />
                  {employee.FullName}
                </div>
                <FontAwesomeIcon
                  icon={faEye}
                  className="faEye"
                  style={{ cursor: "pointer", fontSize: "1.5vw" }}
                  onClick={() => handleEdit(employee)}
                />
              </div>
              <div
                style={{ marginLeft: 0, fontSize: "1.2vw", padding: "2%" }}
              >
                {employee.Phone}
              </div>
              <div style={{ display: "flex", width: "80%" }}>
                <div
                  style={{
                    padding: "0.2vw",
                    borderRadius: 5,
                    marginLeft: "5%",
                    fontSize: "1vw",
                    width: "4.5vw",
                    alignItems: "center",
                    border: "solid #2E2E2E 1px",
                  }}
                >
                  {employee.position}
                </div>
                <div
                  style={{
                    display: "flex",
                    borderRadius: 5,
                    alignItems: "center",
                    marginLeft: "5%",
                    fontSize: "1vw",
                    padding: "1%",
                    border: "solid #2E2E2E 1px",
                  }}
                >
                  <FontAwesomeIcon icon={faCalendar} />
                  <div style={{marginLeft: "3%" }}>
                    {formatDate(employee.FirstDay)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <EditEmployModal
        EditEmployIsOpen={EditWindow}
        EditEmployOnClose={() => setEditWindow(false)}
        employeeInfo={selectedEmployee}
      />
    </div>
  );
};
