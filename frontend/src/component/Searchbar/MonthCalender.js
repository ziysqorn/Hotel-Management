import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";
import {
  getRoomInfoWithRoomId,
  getAllOrderRoomWithRoomId,
  getRoomTypeWithQuery,
} from "../apicalls";
import {
  faCalendar,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useFetcher, useNavigate } from "react-router-dom";
import { MainContext } from "../../App.js";
export const MonthCalendar = ({
  year,
  month,
  changeDate,
  mode,
  item,
  exitWindow,
  position,
  ajust,
  exitWithSave,
  chosenDate,
  edit,
}) => {
  const navigate = useNavigate();
  const [context, setContext] = useContext(MainContext);
  // mode relate
  const [totalCost, setTotalCost] = useState(0);
  const [ocupieData, setOcupieData] = useState([]);

  // Tính số ngày trong tháng
  const [data, setData] = useState([]);
  const [choseDay, setChoseDay] = useState({
    startDate: { date: 0, month: month, year: year },
    endDate: { date: 0, month: month, year: year },
  });
  const [isChoseDate, setIsChoseDate] = useState([true, false]);
  const [roomInfo, setRoomInfo] = useState();

  function tinhKhoangCachNgay(CheckInDate, ExpectedCheckOutDate) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const checkIn = new Date(CheckInDate);
    const expectedCheckOut = new Date(ExpectedCheckOutDate);

    // Tính toán số mili giây giữa hai ngày
    const khoangCachMiliGiay = Math.abs(expectedCheckOut - checkIn);

    // Chuyển đổi khoảng cách từ mili giây sang ngày
    const khoangCachNgay = khoangCachMiliGiay / (1000 * 60 * 60 * 24);

    return khoangCachNgay;
  }

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

  const getOcupie = async (item) => {
    try {
      console.log(item);
      const data = await getAllOrderRoomWithRoomId(item.RoomId);
      console.log(data.recordset);

      setOcupieData(data.recordset);
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfOcupie = (data, item) => {
    let result = false;
    console.log(item);

    let value = new Date(
      `${item.year}-${item.month < 10 ? `0${item.month}` : item.month}-${
        item.date < 10 ? `0${item.date}` : item.date
      }T00:00:00.000Z`
    ).getTime();

    data.map((data_item) => {
      if (
        new Date(data_item.CheckInDate).getTime() <= value &&
        new Date(data_item.ExpectedCHeckOutDate).getTime() >= value
      ) {
        result = true;
      }
      // return false;
    });
    return result;
  };

  const getRoomInfo = async () => {
    try {
      const data = await getRoomInfoWithRoomId(item.RoomId);
      console.log(data.recordset);
      const RoomInfo = await getRoomTypeWithQuery(data.recordset[0].RoomTypeId);
      console.log(RoomInfo);
      setRoomInfo(RoomInfo);
    } catch (e) {
      console.log(e);
    }
  };

  // highlight nhiều ô
  const checkIfChoseHighLight = (startDate, endDate, date, index) => {
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
    if (
      date.date != "" &&
      choseDay.startDate.date != 0 &&
      choseDay.endDate.date != 0
    ) {
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
    console.log(result);
    return result;
  };

  // highlight 1 ô
  const checkIfchoose = (startDate, endDate, date) => {
    // console.log(item);
    if (
      (toDate(date) === toDate(startDate) ||
        toDate(date) === toDate(endDate)) &&
      date.date != ""
    ) {
      // console.log(date.date);
      return true;
    }
    return false;
  };

  const handleCheckForOneItem = (ocupieData, item, index) => {
    let final = "transparent";
    if (
      mode == "detail" &&
      checkIfOcupie(ocupieData, item) &&
      checkIfChoseHighLight(
        choseDay.startDate,
        choseDay.endDate,
        item,
        index
      ) === ""
    ) {
      final = "red";
    } else if (checkIfchoose(choseDay.startDate, choseDay.endDate, item)) {
      final = "#00ADB5";
    }

    return final;
  };

  useEffect(() => {
    console.log(item);
    if (mode == "detail") {
      console.log("work");
      getOcupie(item);
    }
    setData(getDaysInMonthAndDayOfWeek(year, month));
  }, [year, month, choseDay]);

  useEffect(() => {
    console.log(chosenDate);
    if (chosenDate) {
      setChoseDay(chosenDate);
    }
  }, []);

  useEffect(() => {
    console.log(item);
    if (mode == "detail") {
      getOcupie(item);
    }
  }, []);

  useEffect(() => {
    getRoomInfo();
  }, [item]);

  useEffect(() => {
    console.log(choseDay);
    if (choseDay.startDate.date && choseDay.endDate.date&&mode=="detail") {
      let start = new Date(
        choseDay.startDate.year,
        choseDay.startDate.month,
        choseDay.startDate.date
      );
      let end = new Date(
        choseDay.endDate.year,
        choseDay.endDate.month,
        choseDay.endDate.date
      );
      console.log(start, end);
      console.log(tinhKhoangCachNgay(start.toString(), end.toString()));
      setTotalCost(
        tinhKhoangCachNgay(start.toString(), end.toString()) * roomInfo.Price
      );
    }
  }, [choseDay]);

  // useEffect(() => {
  //   console.log(roomInfo);
  // }, [roomInfo]);

  return (
    <div>
      {/* Background */}
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
      {/* closing sign */}

      {/* main container */}
      <div
        // className="fade-in"
        style={{
          backgroundColor: "#2F2F2F",
          color: "white",
          width: "30vw",
          minHeight: "18vw",
          // paddingBottom: "2vh",
          opacity: 1,
          position: "absolute",
          top:
            position != null ? position.top : mode == "detail" ? "62%" : "50%",
          left: "50%",
          transform: "translate(-50%,-100%)",
          borderRadius: "1vh",
          zIndex: 4,
        }}
      >
        <div
          className="fade-in"
          style={{
            backgroundColor: "#353535",
            color: "white",
            minWidth: "2vw",
            minHeight: "2vw",
            // paddingBottom: "2vh",
            opacity: 1,
            position: "absolute",
            top: mode == "detail" ? "-10%" : "-14%",
            left: "50%",
            cursor: "pointer",
            transform: "translate(-50%,0)",
            borderRadius: mode == "detail" ? "1vh" : "2vh",
            // margin:mode == "detail" ? "1vh" : "2vh",
            zIndex: 5,
            fontSize: "1vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            console.log(choseDay);
            exitWindow(choseDay);
            console.log(item);
          }}
        >
          {mode == "detail" && (
            <p>
              {item.RoomId} {roomInfo ? `-${roomInfo.Type}` : null}
            </p>
          )}
          {mode != "detail" && <FontAwesomeIcon icon={faCalendar} />}
        </div>
        {/* top part of main container */}
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
        {/* end of top part of main container */}
        {/* start of main part of main container */}
        <div
          style={{
            backgroundColor: "#353535",
            color: "white",
            width: "30vw",
            minHeight: "10vw",
            paddingBottom: "2vh",
            opacity: 1,
            position: "absolute",
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
                          width: "50%",
                          height: "3vh",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          // opacity: "1",
                          fontWeight: 600,
                          fontSize: "1.5rem",
                          background:
                            mode == "detail" && checkIfOcupie(ocupieData, item)
                              ? "red"
                              : checkIfchoose(
                                  choseDay.startDate,
                                  choseDay.endDate,
                                  item
                                )
                              ? "#00ADB5"
                              : "transparent",
                          // `${handleCheckForOneItem(ocupieData, item, index)}`,
                          borderRadius: "1rem 1rem 1rem 1rem",
                        }}
                        onClick={() => {
                          if (!edit) {
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
                          }
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
        {/* end of main part of main container */}
        {mode == "detail" && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              position: "relative",
              minHeight: "30vw",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "35vh",
                left: "55%",
                width: "10vw",
                // height: "5vh",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "1vw",
                  fontWeight: 600,
                  background: "#141414",
                  padding: "1vh",
                  borderRadius: "1vh",
                }}
              >
                Total: {totalCost}đ
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                top: "35vh",
                left: "10%",
                width: "10vw",
                // height: "5vh",
                textAlign: "center",
              }}
              onClick={() => {
                console.log(
                  `fucking order this order with roomid: ${item.RoomId}`
                );
                console.log(context);
                if (ajust) {
                  exitWithSave(choseDay);
                } else {
                  setContext({
                    ...context,
                    OrderRoomInfo: { roomInfo: item, DateInfo: choseDay },
                  });
                  navigate("/rooms/orderroom");
                }
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "1vw",
                  fontWeight: 600,
                  background: "#141414",
                  padding: "1vh",
                  borderRadius: "1vh",
                  cursor: "pointer",
                }}
              >
                {ajust ? "Save" : "Booking"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
