import React from "react";
import { useState } from "react";
import { DeleteConfirm } from "./Modal/DeleteConfirm";
import { EditRolesModal } from "./Modal/EditRolesModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const Roles_List = () => {
  let roleItems = ["Staff", "Manager", "CEO"];
  const [isEditRolesOpen, setEditRolesOpen] = useState(false);
  const [deleteWindow, setdeleteWindow] = useState(false);
  return (
    <div className="role-list" style={{ height: "45vh", marginTop: "10px" }}>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {roleItems.map((item, index) => (
          <li
            style={{
              display: "flex",
              background: "black",
              color: "white",
              alignItems: "center",
              borderRadius: 5,
              height: "7vh",
              width: "17vw",
              margin: "5px",
            }}
          >
            <div style={{ width: "11vw", marginLeft: "5%" }}>{item}</div>
            <div className="user-actions" style={{ display: "flex" }}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="faPenToSquare"
                style={{ paddingRight: "50%", cursor: "pointer" }}
                onClick={() => setEditRolesOpen(true)}
              />
              <FontAwesomeIcon
                mode="delete-roles"
                icon={faTrashCan}
                className="faTrashCan"
                style={{ cursor: "pointer" }}
                onClick={() => setdeleteWindow(true)}
              />
            </div>
          </li>
        ))}
      </ul>
      <EditRolesModal
        isEditOpen={isEditRolesOpen}
        onEditClose={() => setEditRolesOpen(false)}
      />
      <DeleteConfirm
        isDelWindowOpen={deleteWindow}
        onDelWindowClose={() => setdeleteWindow(false)}
      />
    </div>
  );
};
