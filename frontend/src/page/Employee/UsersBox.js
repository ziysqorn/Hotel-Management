import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { CreateUserModal } from "./Modal/CreateUsermodal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UsersLists } from "./UsersLists";

export const UsersBox = ({ users, fetchUsers }) => {
  const [CUserOpen, setCUserOpen] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/employee/employ/userquery?userQuery=${searchUser}`
      );
      setFilteredUsers(response.data.recordset);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);
  return (
    <div
      className="Users-box"
      style={{
        width: "32vw",
        background: "#2E2E2E",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          fontSize: "1vw",
          margin: "3%",
        }}
      >
        Users
      </div>
      <div
        className="Search-bar"
        style={{
          height: "6vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          className="Search"
          style={{
            borderRadius: 5,
            background: "black",
            width: "20vw",
            paddingLeft: "3px",
            height: "6vh",
            display: "flex",
            alignItems: "center",
            marginRight: "5px",
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              color: "white",
              fontSize: "1vw",
              paddingLeft: "5px",
              width: "3vw",
            }}
          />
          <input
            type="text"
            style={{
              background: "black",
              border: "none",
              width: "100%",
              borderRadius: 5,
              fontSize: "1vw",
              outline: "none",
              color: "white",
            }}
            placeholder="Search ..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div
          className="BtnAddUser"
          style={{
            background: "#00FFF5",
            borderRadius: 10,
            padding: "3%",
            fontSize: "1vw",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => setCUserOpen(true)}
        >
          + Add
        </div>
      </div>
      <UsersLists users={filteredUsers.length > 0 ? filteredUsers : users} />
      <CreateUserModal
        isCUserOpen={CUserOpen}
        isCUserClose={() => setCUserOpen(false)}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};
