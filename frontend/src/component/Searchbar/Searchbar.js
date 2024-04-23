import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiInfo } from "../../apivar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
export const Searchbar = ({ ...props }) => {
  const [currentRoomType, setCurrentRoomType] = useState("All");
  const [allRoomType, setAllRoomType] = useState([]);
  const [isRoomTypeMenuOpen, setIsRoomTypeMenuOpen] = useState(false);
  const [query, setQuery] = useState({});
  useEffect(() => {
    try {
      axios.get(`${apiInfo.mainUrl}/ReadRoomType`).then((item) => {
        console.log(item.data.recordset);
        setAllRoomType(item.data.recordset);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChangeRoomType = (roomTypeId) => {
    props.changeRoomType(roomTypeId);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "15vh",
        // marginLeft: "2vw",
        // backgroundColor: "#141414",
        display: "flex",
        paddingLeft: "1vw",
        // alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* seacrhbar */}
      <div
        style={{
          width: "20%",
          height: "5vh",
          backgroundColor: "#141414",
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          marginBottom: "2vh",
          // justifyContent: "center",
        }}
      >
        <span
          style={{
            backgroundColor: "white",
            height: "3vh",
            width: "3vh",
            cursor: "pointer",
          }}
          class="material-symbols-light--search"
          onClick={() => {}}
        ></span>
        {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
        <input
          placeholder="Search..."
          style={{
            fontSize: "20px",
            backgroundColor: "#141414",
            outline: "none",
            textDecoration: "none",
            border: "none",
            color: "white",
          }}
        ></input>
      </div>

      {/* filter container */}
      {allRoomType.length && (
        <div
          style={{
            backgroundColor: "#141414",
            width: "30%",
            paddingLeft: "1vw",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* drop down roomtype */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ color: "#B0B0B0" }}>RoomType</p>
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                // height: "100%",
                minWidth: "3vw",
                marginLeft: "1vw",
                backgroundColor: "#111111",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                position: "relative",
              }}
            >
              <p>{currentRoomType}</p>
              <FontAwesomeIcon
                style={{
                  color: "white",
                  marginLeft: "1vw",
                  fontSize: "1vw",
                  cursor: "pointer",
                }}
                icon={faCaretDown}
                onClick={() => {
                  setIsRoomTypeMenuOpen(!isRoomTypeMenuOpen);
                }}
              />
              {isRoomTypeMenuOpen && (
                <div style={{ position: "absolute", top: 40, left: -42 }}>
                  <ul style={{}}>
                    <li
                      key={-1}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          !"ALl" == currentRoomType ? "#2F2F2F" : "#353535",
                        textDecoration: "none",
                        color: "white",
                        listStyleType: "none",
                        padding: "1rem",
                        fontWeight: 700,
                        backgroundColor: "#2F2F2F",
                      }}
                      onClick={() => {
                        setCurrentRoomType("ALL");
                        handleChangeRoomType(null);
                        setIsRoomTypeMenuOpen(false);
                      }}
                    >
                      ALL
                    </li>
                    {allRoomType.map((item, index) => (
                      <li
                        key={index}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            !item.Type == currentRoomType
                              ? "#2F2F2F"
                              : "#353535",
                          textDecoration: "none",
                          color: "white",
                          listStyleType: "none",
                          padding: "1rem",
                          fontWeight: 700,
                          backgroundColor: "#2F2F2F",
                        }}
                        onClick={() => {
                          setCurrentRoomType(item.Type);
                          handleChangeRoomType(item.RoomTypeId);
                          setIsRoomTypeMenuOpen(false);
                        }}
                      >
                        {item.Type}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
