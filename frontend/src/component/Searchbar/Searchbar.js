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
import "./style.css";

export const Searchbar = ({ ...props }) => {
  const [currentRoomType, setCurrentRoomType] = useState("All");
  const [allRoomType, setAllRoomType] = useState([]);
  const [isRoomTypeMenuOpen, setIsRoomTypeMenuOpen] = useState(false);
  const [isOpenCalendarWindow, setIsOpenCalendarWindow] = useState(false);
  const [date, setDate] = useState({
    year: 2024,
    month: 5,
  });
  useEffect(() => {
    setDate({
      ...date,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    });

    try {
      axios.get(`${apiInfo.mainUrl}/ReadRoomType`).then((item) => {
        // console.log(item.data.recordset);
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
  const handleChangeRoomDate = (item) => {
    props.changeRoomDate(item);
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

      {/*================ filter container ============= */}
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
              marginLeft: "2vw",
              display: "flex",
              alignItems: "center",
              minWidth: "10vw",
              // backgroundColor: "white",
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
              onClick={() => setIsOpenCalendarWindow(true)}
              icon={faCalendar}
            />

            {/* <div style={{ width: "100%", backgroundColor: "white" }}></div> */}
          </div>
        </div>
      )}

      {/* =============FLOATING STUFF ======================= */}
      {isOpenCalendarWindow && (
        <MonthCalendar
          year={date.year}
          month={date.month}
          changeDate={(item) => {
            console.log(item);
            if (item === "+") {
              setDate({
                ...date,
                month: date.month + 1 >= 13 ? 1 : date.month + 1,
                year: date.month + 1 >= 13 ? date.year + 1 : date.year,
              });
            } else if (item === "-") {
              setDate({
                ...date,
                month: date.month - 1 <= 0 ? 12 : date.month - 1,
                year: date.month - 1 <= 0 ? date.year - 1 : date.year,
              });
            }
          }}
          exitWindow={(item) => {
            console.log(`handle close window`, item);
            handleChangeRoomDate(item);
            setIsOpenCalendarWindow(false);
          }}
        />
      )}
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

export const MonthCalendar = ({ year, month, changeDate, exitWindow }) => {
  // Tính số ngày trong tháng
  const [data, setData] = useState([]);
  const [choseDay, setChoseDay] = useState({
    startDate: { date: 2, month: month, year: year },
    endDate: { date: 30, month: month, year: year },
  });
  const [isChoseDate, setIsChoseDate] = useState([true, false]);

  function getDaysInMonthAndDayOfWeek(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate(); // Số ngày trong tháng
    console.log();
    const days = []; // Mảng chứa các ngày trong tháng và ngày trong tuần tương ứng

    // Tính ngày đầu tiên của tháng
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // Ngày trong tuần của ngày đầu tiên trong tháng

    // Thêm các ngày trống vào đầu mảng nếu ngày đầu tiên của tháng không phải là Chủ Nhật
    if (firstDayOfWeek !== 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        days.push({
          date: "",
          year: year,
          month: month,
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
        year: year,
        month: month,
        dayOfWeek: dayOfWeek,
      });
    }
    console.log(days);
    return days;
  }

  const toDate = (item) => {
    return new Date(item.year, item.month - 1, item.date + 1).getTime();
  };

  useEffect(() => {
    setData(getDaysInMonthAndDayOfWeek(year, month));
  }, [year, month, choseDay]);
  // highlight nhiều ô
  const checkIfChoseHighLight = (startDate, endDate, date, index) => {
    // trường hợp trùng start date
    // if (date.date == 20) {
    //   console.log(date);
    // }
    //
    const fullCover =
      toDate(date) >= toDate(startDate) && toDate(date) <= toDate(endDate);
    const rightCover =
      date.dayOfWeek == 0 ||
      toDate(date) == toDate(startDate) ||
      date.date == 1;
    const leftCover =
      date.dayOfWeek == 6 ||
      toDate(date) == toDate(endDate) ||
      index == data.length - 1;
    const normalCover =
      (date.date == 1 && date.dayOfWeek == 6) ||
      (date.date == 1 && toDate(date) == toDate(endDate)) ||
      (index == data.length - 1 && date.dayOfWeek == 0);
    let result = "";
    if (date.date != "") {
      // full cover
      if (fullCover) {
        result = "full-cover";
      }
      // right cover
      if (fullCover && rightCover) {
        // console.log("here");
        result = "cover-right";
      }
      // left cover
      if (fullCover && leftCover) {
        result = "cover-left";
      }
      if (fullCover && normalCover) {
        result = "normal-cover";
      }

      // normal cover
      // if(fullCover &&)
    } else return result;
    // console.log(result);
    return result;
  };

  // highlight 1 ô
  const checkIfchoose = (startDate, endDate, date) => {
    //     { day: 26, month: 4, year: 2024 }

    // endDate:

    // { day: null, month: null, year: null }

    // date:

    // { date: 30, year: 2024, month: 4, dayOfWeek: 2 }
    // console.log(startDate, endDate, date);
    // if (date.date == 28) {
    //   console.log(date);
    //   console.log(date.date == startDate.date || date.date == endDate.date);
    // }
    // console.log(date);
    if (
      toDate(date) === toDate(startDate) ||
      toDate(date) === toDate(endDate)
    ) {
      // console.log(date.date);
      return true;
    }
    return false;
  };

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
          backgroundColor: "#353535",
          color: "white",
          minWidth: "2vw",
          minHeight: "2vw",
          // paddingBottom: "2vh",
          opacity: 1,
          position: "absolute",
          top: "30vh",
          left: "50%",
          cursor: "pointer",
          transform: "translate(-50%,-100%)",
          borderRadius: "2vh",
          zIndex: 5,
          fontSize: "1vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          // console.log("handle exit");
          exitWindow(choseDay);
        }}
      >
        <FontAwesomeIcon icon={faCalendar} />
      </div>

      <div
        style={{
          backgroundColor: "#2F2F2F",
          color: "white",
          width: "30vw",
          minHeight: "18vw",
          // paddingBottom: "2vh",
          opacity: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-100%)",
          borderRadius: "1vh",
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: "100%",
            // background:"white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            minHeight: "2.5vw",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "30%",
              height: "1.5vw",
              cursor: "pointer",
              border: "3px solid white",
              borderRadius: "0.5rem",
              fontSize: "1vw",
              fontWeight: 600,
              opacity: isChoseDate[0] ? 1 : 0.5,
            }}
            onClick={() => {
              setIsChoseDate([true, false]);
            }}
          >
            <FontAwesomeIcon icon={faCalendar} />
            <p>{`${choseDay.startDate.date} - ${choseDay.startDate.month} - ${choseDay.startDate.year}`}</p>
          </div>
          <p style={{ fontSize: "1vw", fontWeight: 600 }}>To</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "30%",
              cursor: "pointer",
              height: "1.5vw",
              border: "3px solid white",
              borderRadius: "0.5rem",
              fontSize: "1vw",
              fontWeight: 600,
              opacity: isChoseDate[1] ? 1 : 0.5,
            }}
            onClick={() => {
              setIsChoseDate([false, true]);
            }}
          >
            <FontAwesomeIcon icon={faCalendar} />
            <p>{`${choseDay.endDate.date} - ${choseDay.endDate.month} - ${choseDay.endDate.year}`}</p>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#353535",
            color: "white",
            width: "30vw",
            minHeight: "10vw",
            paddingBottom: "2vh",
            opacity: 1,
            position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%,-50%)",
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
              style={{ cursor: "pointer" }}
              icon={faChevronLeft}
              onClick={() => {
                changeDate("-");
              }}
            />
            <h2>
              {year} - {month}
            </h2>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faChevronRight}
              onClick={() => {
                changeDate("+");
              }}
            />
          </div>
          <div
            style={{
              width: "30vw",
              minHeight: "20vh",
              marginLeft: "10px",
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
                    key={index}
                    style={{
                      flex: "0 0 14%",
                      minHeight: "4vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className={checkIfChoseHighLight(
                        choseDay.startDate,
                        choseDay.endDate,
                        item,
                        index
                      )}
                      style={{
                        width: "100%",

                        // backgroundColor: "#00ADB5",
                        height: "3vh",
                        // opacity: "32%",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // margin:"0"
                        // position: "relative",
                      }}
                    >
                      <p
                        style={{
                          // opacity: 1,
                          // padding: "1vh",
                          // margin: "auto",
                          width: "50%",
                          height: "3vh",

                          // textAlign:"center",
                          // height:"50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          // opacity: "1",
                          fontWeight: 600,
                          fontSize: "1.5rem",
                          background: checkIfchoose(
                            choseDay.startDate,
                            choseDay.endDate,
                            item
                          )
                            ? "#00ADB5"
                            : "transparent",
                          borderRadius: "1rem 1rem 1rem 1rem",

                          // background: "blue",""
                          // backgroundColor: "#00ADB5"
                        }}
                        onClick={() => {
                          if (isChoseDate[1]) {
                            setChoseDay({
                              ...choseDay,
                              endDate: {
                                date: item.date,
                                month: item.month,
                                year: item.year,
                              },
                            });
                          } else
                            setChoseDay({
                              ...choseDay,
                              startDate: {
                                date: item.date,
                                month: item.month,
                                year: item.year,
                              },
                            });
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
    </div>
  );
};
