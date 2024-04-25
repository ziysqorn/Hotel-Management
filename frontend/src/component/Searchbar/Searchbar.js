import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiInfo } from "../../apivar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
export const Searchbar = ({ ...props }) => {
  const [currentRoomType, setCurrentRoomType] = useState("All");
  const [allRoomType, setAllRoomType] = useState([]);
  const [isRoomTypeMenuOpen, setIsRoomTypeMenuOpen] = useState(false);
  const [date, setDate] = useState({
    year: 2024,
    month: 4,
  });
  useEffect(() => {
    try {
      axios.get(`${apiInfo.mainUrl}/ReadRoomType`).then((item) => {
        console.log(item.data.recordset);
        setAllRoomType(item.data.recordset);
        // setAllRoomType();
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChangeRoomType = (roomTypeId) => {
    props.changeRoomType(roomTypeId);
  };
  const handleChangeRoomName = (roomName) => {
    props.changeRoomName(roomName);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "15vh",
        display: "flex",
        paddingLeft: "1vw",

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
          onClick={() => {
            props.submitSearch();
          }}
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
          onChange={(e) => {
            handleChangeRoomName(e.target.value);
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
                      <RoomTypeItem
                        key={index}
                        item={item}
                        currentRoomType={currentRoomType}
                        setCurrentRoomType={setCurrentRoomType}
                        handleChangeRoomType={handleChangeRoomType}
                        setIsRoomTypeMenuOpen={setIsRoomTypeMenuOpen}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* popup  */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "10vw",
              backgroundColor: "white",
            }}
          >
            <p style={{ color: "white", fontSize: "20px" }}>Calender</p>
            <FontAwesomeIcon
              style={{
                color: "white",
                fontSize: "1vw",
                marginLeft: "20px",
                cursor: "pointer",
              }}
              icon={faCalendar}
            />
            <div style={{ width: "100%", backgroundColor: "white" }}></div>
          </div>
        </div>
      )}
      <MonthCalendar
        year={date.year}
        month={date.month}
        changeDate={(item) => {
          console.log(item);
        }}
      />
    </div>
  );
};

const RoomTypeItem = ({
  item,
  currentRoomType,
  setCurrentRoomType,
  handleChangeRoomType,
  setIsRoomTypeMenuOpen,
}) => {
  return (
    <li
      style={{
        cursor: "pointer",
        backgroundColor: !item.Type == currentRoomType ? "#2F2F2F" : "#353535",
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
  );
};

const MonthCalendar = ({ year, month, changeDate }) => {
  // Tính số ngày trong tháng
  const [data, setData] = useState([]);

  function getDaysInMonthAndDayOfWeek(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate(); // Số ngày trong tháng
    const days = []; // Mảng chứa các ngày trong tháng và ngày trong tuần tương ứng

    // Tính ngày đầu tiên của tháng
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // Ngày trong tuần của ngày đầu tiên trong tháng

    // Thêm các ngày trống vào đầu mảng nếu ngày đầu tiên của tháng không phải là Chủ Nhật
    if (firstDayOfWeek !== 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push({
          date: "",
          dayOfWeek: i, // Thứ trong tuần bắt đầu từ 0 (Chủ Nhật) đến 6 (Thứ Bảy)
        });
      }
    }

    // Thêm các ngày trong tháng vào mảng
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i);
      const dayOfWeek = date.getDay(); // Ngày trong tuần của ngày hiện tại
      days.push({
        date: i,
        dayOfWeek: dayOfWeek,
      });
    }

    return days;
  }

  useEffect(() => {
    console.log(getDaysInMonthAndDayOfWeek(2024, 4));
    setData(getDaysInMonthAndDayOfWeek(2024, 4));
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "black",
          opacity: 0.7,
          scrollBehavio: "none",
          zIndex: 2,
        }}
      ></div>
      <div
        style={{
          backgroundColor: "#2F2F2F",
          color: "white",
          width: "30vw",
          minHeight: "20vw",
          opacity: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          borderRadius: "1vh",
          zIndex: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: "1vh",
            marginTop: "1vh",
          }}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => {
              changeDate("-");
            }}
          />
          <h2>
            {year} - {month}
          </h2>
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => {
              changeDate("+");
            }}
          />
        </div>
        <div
          style={{
            width: "30vw",
            // height: "30vw",
            display: "flex",
            flexWrap: "wrap",
            // justifyContent:"space-around"
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "0 0 14%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Mon</p>
          </div>
          <div
            style={{
              flex: "0 0 14%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Tue</p>
          </div>
          <div
            style={{
              flex: "0 0 14%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Wed</p>
          </div>
          <div
            style={{
              flex: "0 0 14%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Thu</p>
          </div>
          <div
            style={{
              flex: "0 0 14%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Fri</p>
          </div>
          <div
            style={{
              flex: "0 0 14%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Sat</p>
          </div>
          <div
            style={{
              flex: "0 0 14%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Sun</p>
          </div>
          {data &&
            data.map((item, index) => {
              return (
                <div
                  style={{
                    flex: "0 0 14%",
                    minHeight: "5vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      backgroundColor: "#00ADB5",
                      height: "3vh",
                      // opacity: "32%",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // position: "relative",
                    }}
                  >
                    <p
                      style={{
                        opacity: 1,
                        // padding: "1vh",
                        // margin: "auto",
                        width: "50%",
                        height: "3vh",

                        // textAlign:"center",
                        // height:"50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // paddingTop: "1vh",
                        // paddingBottom: "1vh",
                        backgroundColor: "red",
                      }}
                    >
                      {item.date}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
