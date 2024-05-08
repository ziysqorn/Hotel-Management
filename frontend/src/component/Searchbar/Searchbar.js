import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiInfo } from "../../apivar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { MonthCalendar } from "./MonthCalender.js";

import "./style.css";
import { getAllOrderRoomWithRoomId } from "../apicalls.js";

export const Searchbar = ({ ...props }) => {
  const [currentRoomType, setCurrentRoomType] = useState("All");
  const [allRoomType, setAllRoomType] = useState([]);
  const [isRoomTypeMenuOpen, setIsRoomTypeMenuOpen] = useState(false);
  const [isOpenCalendarWindow, setIsOpenCalendarWindow] = useState(false);
  const [chosenDate, setChoseDate] = useState();
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

  // mode relate

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
            {chosenDate && (
              <div
                style={{
                  marginLeft: "1vw",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  color: "white",
                  fontSize: "20px",
                }}
              >
                <p
                  style={{}}
                  onClick={() => {
                    setIsOpenCalendarWindow(true);
                  }}
                >
                  {chosenDate.startDate.date}-{chosenDate.startDate.month}-
                  {chosenDate.startDate.year} To {chosenDate.endDate.date}-
                  {chosenDate.endDate.month}-{chosenDate.startDate.year}
                </p>
                <FontAwesomeIcon
                  style={{ marginLeft: "2vw" }}
                  icon={faXmark}
                  onClick={() => {
                    handleChangeRoomDate(null);
                    setChoseDate();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* =============FLOATING STUFF ======================= */}
      {isOpenCalendarWindow && (
        <MonthCalendar
          year={date.year}
          month={date.month}
          // mode={"detail"}
          item={{ name: "P103" }}
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
            setChoseDate(item);
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

// export const MonthCalendar = ({
//   year,
//   month,
//   changeDate,
//   mode,
//   item,
//   exitWindow,
// }) => {
//   // mode relate
//   const [totalCost, setTotalCost] = useState(5000000);
//   const [ocupieData, setOcupieData] = useState([]);

//   // Tính số ngày trong tháng
//   const [data, setData] = useState([]);
//   const [choseDay, setChoseDay] = useState({
//     startDate: { date: 0, month: month, year: year },
//     endDate: { date: 0, month: month, year: year },
//   });
//   const [isChoseDate, setIsChoseDate] = useState([true, false]);

//   function getDaysInMonthAndDayOfWeek(year, month) {
//     const daysInMonth = new Date(year, month, 0).getDate(); // Số ngày trong tháng
//     console.log();
//     const days = []; // Mảng chứa các ngày trong tháng và ngày trong tuần tương ứng

//     // Tính ngày đầu tiên của tháng
//     const firstDayOfMonth = new Date(year, month - 1, 1);
//     const firstDayOfWeek = firstDayOfMonth.getDay(); // Ngày trong tuần của ngày đầu tiên trong tháng

//     // Thêm các ngày trống vào đầu mảng nếu ngày đầu tiên của tháng không phải là Chủ Nhật
//     if (firstDayOfWeek !== 0) {
//       for (let i = 0; i < firstDayOfWeek; i++) {
//         days.push({
//           date: "",
//           year: year,
//           month: month,
//           dayOfWeek: i, // Thứ trong tuần bắt đầu từ 0 (Chủ Nhật) đến 6 (Thứ Bảy)
//         });
//       }
//     }
//     // Thêm các ngày trong tháng vào mảng
//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(year, month - 1, i);
//       const dayOfWeek = date.getDay(); // Ngày trong tuần của ngày hiện tại
//       days.push({
//         date: i,
//         year: year,
//         month: month,
//         dayOfWeek: dayOfWeek,
//       });
//     }
//     console.log(days);
//     return days;
//   }

//   const toDate = (item) => {
//     return new Date(item.year, item.month - 1, item.date + 1).getTime();
//   };

//   const getOcupie = async (item) => {
//     try {
//       console.log(item);
//       const data = await getAllOrderRoomWithRoomId(item.RoomId);
//       console.log(data.recordset);
//       // console.log(new Date(data.recordset[0].CheckInDate).getDay());
//       // console.log(
//       //   checkIfOcupie(data.recordset, { date: 3, month: 3, year: 2024 })
//       // );
//       setOcupieData(data.recordset);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const stringToDate = (item) => {
//     const date = new Date(item);
//     // console.log(item);
//     // console.log(date);
//     return {
//       date: date.getDate(),
//       month: date.getMonth(),
//       year: date.getFullYear(),
//       item: date,
//     };
//   };

//   const checkIfOcupie = (data, item) => {
//     let result = false;
//     console.log(item);
//     if (item.date == 12) {
//       console.log(new Date(item.year, item.month - 1, item.date).getTime());
//       console.log(
//         new Date(item.year, item.month - 1, item.date + 1).getTime() >=
//           new Date("2024-04-06T00:00:00.000Z").getTime() &&
//           new Date(item.year, item.month - 1, item.date + 1).getTime() <=
//             new Date("2024-04-12T00:00:00.000Z").getTime()
//       );
//       console.log(new Date("2024-04-12T00:00:00.000Z").getTime());
//       console.log(new Date(item.year, item.month - 1, item.date).getTime());
//     }
//     data.map((data_item) => {
//       let value = new Date(item.year, item.month - 1, item.date + 1).getTime();
//       if (
//         new Date(data_item.CheckInDate).getTime() <= value &&
//         new Date(data_item.ExpectedCHeckOutDate).getTime() >= value
//       ) {
//         result = true;
//       }
//       // return false;
//     });
//     return result;
//   };

//   useEffect(() => {
//     if (mode == "detail") {
//       console.log("work");
//       getOcupie(item);

//       //  setOcupieData()
//       // console.log();
//       // console.log(
//       //   toDate({ date: 4, month: 5, year: 2024 }) >=
//       //     new Date("2024-04-01T00:00:00.000Z").getTime()
//       // );
//       // console.log(toDate({ date: 4, month: 4, year: 2024 }));
//       // console.log(new Date("2024-04-01T00:00:00.000Z").getTime());
//       // console.log(new Date("2024-04-30T00:00:00.000Z").getTime());
//       // console.log(
//       //   new Date("2024-04-01T00:00:00.000Z").getTime() >=
//       //     toDate({ date: 4, month: 5, year: 2024 }) &&
//       //     new Date("2024-04-30T00:00:00.000Z").getTime() <=
//       //       toDate({ date: 4, month: 5, year: 2024 })
//       // );
//       // console.log(checkIfOcupie(data, { date: 7, month: 4, year: 2024 }));
//       // console.log(new Date("2024-05-10T00:00:00.000Z"));
//       // console.log();
//       console.log(item);
//     }
//     setData(getDaysInMonthAndDayOfWeek(year, month));
//   }, [year, month, choseDay]);
//   // highlight nhiều ô
//   const checkIfChoseHighLight = (startDate, endDate, date, index) => {
//     // trường hợp trùng start date
//     // if (date.date == 20) {
//     //   console.log(date);
//     // }
//     //
//     const fullCover =
//       toDate(date) >= toDate(startDate) && toDate(date) <= toDate(endDate);
//     const rightCover =
//       date.dayOfWeek == 0 ||
//       toDate(date) == toDate(startDate) ||
//       date.date == 1;
//     const leftCover =
//       date.dayOfWeek == 6 ||
//       toDate(date) == toDate(endDate) ||
//       index == data.length - 1;
//     const normalCover =
//       (date.date == 1 && date.dayOfWeek == 6) ||
//       (date.date == 1 && toDate(date) == toDate(endDate)) ||
//       (index == data.length - 1 && date.dayOfWeek == 0);
//     let result = "";
//     if (
//       date.date != "" &&
//       choseDay.startDate.date != 0 &&
//       choseDay.endDate.date != 0
//     ) {
//       // full cover
//       if (fullCover) {
//         result = "full-cover";
//       }
//       // right cover
//       if (fullCover && rightCover) {
//         // console.log("here");
//         result = "cover-right";
//       }
//       // left cover
//       if (fullCover && leftCover) {
//         result = "cover-left";
//       }
//       if (fullCover && normalCover) {
//         result = "normal-cover";
//       }

//       // normal cover
//       // if(fullCover &&)
//     } else return result;
//     // console.log(result);
//     return result;
//   };

//   // highlight 1 ô
//   const checkIfchoose = (startDate, endDate, date) => {
//     // console.log(item);
//     if (
//       (toDate(date) === toDate(startDate) ||
//         toDate(date) === toDate(endDate)) &&
//       date.date != ""
//     ) {
//       // console.log(date.date);
//       return true;
//     }
//     return false;
//   };

//   return (
//     <div>
//       {/* Background */}
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           position: "absolute",
//           top: 0,
//           left: 0,
//           backgroundColor: "black",
//           opacity: 0.7,
//           scrollBehavio: "none",
//           zIndex: 2,
//         }}
//       ></div>
//       {/* closing sign */}
//       <div
//         className="fade-in"
//         style={{
//           backgroundColor: "#353535",
//           color: "white",
//           minWidth: "2vw",
//           minHeight: "2vw",
//           // paddingBottom: "2vh",
//           opacity: 1,
//           position: "absolute",
//           top: mode == "detail" ? "15vh" : "30vh",
//           left: "50%",
//           cursor: "pointer",
//           transform: "translate(-50%,-100%)",
//           borderRadius: mode == "detail" ? "1vh" : "2vh",
//           // margin:mode == "detail" ? "1vh" : "2vh",
//           zIndex: 5,
//           fontSize: "1vw",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//         onClick={() => {
//           // console.log("handle exit");
//           console.log(choseDay);
//           exitWindow(choseDay);
//         }}
//       >
//         {mode == "detail" && <p>{item.RoomId}</p>}
//         {mode != "detail" && <FontAwesomeIcon icon={faCalendar} />}
//       </div>
//       {/* main container */}
//       <div
//         // className="fade-in"
//         style={{
//           backgroundColor: "#2F2F2F",
//           color: "white",
//           width: "30vw",
//           minHeight: "18vw",
//           // paddingBottom: "2vh",
//           opacity: 1,
//           position: "absolute",
//           top: mode == "detail" ? "60%" : "50%",
//           left: "50%",
//           transform: "translate(-50%,-100%)",
//           borderRadius: "1vh",
//           zIndex: 4,
//         }}
//       >
//         {/* top part of main container */}
//         <div
//           style={{
//             width: "100%",
//             // background:"white",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-evenly",
//             minHeight: "2.5vw",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-around",
//               width: "30%",
//               height: "1.5vw",
//               cursor: "pointer",
//               border: "3px solid white",
//               borderRadius: "0.5rem",
//               fontSize: "1vw",
//               fontWeight: 600,
//               opacity: isChoseDate[0] ? 1 : 0.5,
//             }}
//             onClick={() => {
//               setIsChoseDate([true, false]);
//             }}
//           >
//             <FontAwesomeIcon icon={faCalendar} />
//             <p>{`${choseDay.startDate.date} - ${choseDay.startDate.month} - ${choseDay.startDate.year}`}</p>
//           </div>
//           <p style={{ fontSize: "1vw", fontWeight: 600 }}>To</p>
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-around",
//               width: "30%",
//               cursor: "pointer",
//               height: "1.5vw",
//               border: "3px solid white",
//               borderRadius: "0.5rem",
//               fontSize: "1vw",
//               fontWeight: 600,
//               opacity: isChoseDate[1] ? 1 : 0.5,
//             }}
//             onClick={() => {
//               setIsChoseDate([false, true]);
//             }}
//           >
//             <FontAwesomeIcon icon={faCalendar} />
//             <p>{`${choseDay.endDate.date} - ${choseDay.endDate.month} - ${choseDay.endDate.year}`}</p>
//           </div>
//         </div>
//         {/* end of top part of main container */}
//         {/* start of main part of main container */}
//         <div
//           style={{
//             backgroundColor: "#353535",
//             color: "white",
//             width: "30vw",
//             minHeight: "10vw",
//             paddingBottom: "2vh",
//             opacity: 1,
//             position: "absolute",
//             // top: "50%",
//             // left: "50%",
//             // transform: "translate(-50%,-50%)",
//             borderRadius: "1vh",
//             zIndex: 4,
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-around",
//               marginBottom: "1vh",
//               marginTop: "1vh",
//             }}
//           >
//             <FontAwesomeIcon
//               style={{ cursor: "pointer" }}
//               icon={faChevronLeft}
//               onClick={() => {
//                 changeDate("-");
//               }}
//             />
//             <h2>
//               {year} - {month}
//             </h2>
//             <FontAwesomeIcon
//               style={{ cursor: "pointer" }}
//               icon={faChevronRight}
//               onClick={() => {
//                 changeDate("+");
//               }}
//             />
//           </div>
//           <div
//             style={{
//               width: "30vw",
//               minHeight: "20vh",
//               marginLeft: "10px",
//               display: "flex",
//               flexWrap: "wrap",
//               // justifyContent:"space-around"
//               alignItems: "center",
//             }}
//           >
//             <div
//               style={{
//                 flex: "0 0 14%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <p>Mon</p>
//             </div>
//             <div
//               style={{
//                 flex: "0 0 14%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <p>Tue</p>
//             </div>
//             <div
//               style={{
//                 flex: "0 0 14%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <p>Wed</p>
//             </div>
//             <div
//               style={{
//                 flex: "0 0 14%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <p>Thu</p>
//             </div>
//             <div
//               style={{
//                 flex: "0 0 14%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <p>Fri</p>
//             </div>
//             <div
//               style={{
//                 flex: "0 0 14%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <p>Sat</p>
//             </div>
//             <div
//               style={{
//                 flex: "0 0 14%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <p>Sun</p>
//             </div>
//             {data &&
//               data.map((item, index) => {
//                 return (
//                   <div
//                     key={index}
//                     style={{
//                       flex: "0 0 14%",
//                       minHeight: "4vh",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <div
//                       className={checkIfChoseHighLight(
//                         choseDay.startDate,
//                         choseDay.endDate,
//                         item,
//                         index
//                       )}
//                       style={{
//                         width: "100%",

//                         // backgroundColor: "#00ADB5",
//                         height: "3vh",
//                         // opacity: "32%",
//                         textAlign: "center",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         // margin:"0"
//                         // position: "relative",
//                       }}
//                     >
//                       <p
//                         style={{
//                           // opacity: 1,
//                           // padding: "1vh",
//                           // margin: "auto",
//                           width: "50%",
//                           height: "3vh",

//                           // textAlign:"center",
//                           // height:"50%",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           // opacity: "1",
//                           fontWeight: 600,
//                           fontSize: "1.5rem",
//                           background:
//                             mode == "detail" && checkIfOcupie(ocupieData, item)
//                               ? "red"
//                               : checkIfchoose(
//                                   choseDay.startDate,
//                                   choseDay.endDate,
//                                   item
//                                 )
//                               ? "#00ADB5"
//                               : "transparent",
//                           borderRadius: "1rem 1rem 1rem 1rem",

//                           // background: "blue",""
//                           // backgroundColor: "#00ADB5"
//                         }}
//                         onClick={() => {
//                           if (isChoseDate[1]) {
//                             setChoseDay({
//                               ...choseDay,
//                               endDate: {
//                                 date: item.date,
//                                 month: item.month,
//                                 year: item.year,
//                               },
//                             });
//                           } else
//                             setChoseDay({
//                               ...choseDay,
//                               startDate: {
//                                 date: item.date,
//                                 month: item.month,
//                                 year: item.year,
//                               },
//                             });
//                         }}
//                       >
//                         {item.date}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//           </div>
//         </div>
//         {/* end of main part of main container */}
//         {mode == "detail" && (
//           <div
//             style={{
//               width: "100%",
//               // background:"white",
//               display: "flex",
//               // alignItems: "flex-end",
//               justifyContent: "space-around",
//               position: "relative",
//               // flexWrap:"wrap-reverse",
//               // flex: "flex-end",
//               // paddingTop:"10vh",
//               minHeight: "30vw",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "35vh",
//                 left: "55%",
//                 width: "10vw",
//                 // height: "5vh",
//                 textAlign: "center",
//               }}
//             >
//               <p
//                 style={{
//                   color: "white",
//                   fontSize: "1vw",
//                   fontWeight: 600,
//                   background: "#141414",
//                   padding: "1vh",
//                   borderRadius: "1vh",
//                 }}
//               >
//                 Total: {totalCost}đ
//               </p>
//             </div>
//             <div
//               style={{
//                 position: "absolute",
//                 top: "35vh",
//                 left: "10%",
//                 width: "10vw",
//                 // height: "5vh",
//                 textAlign: "center",
//               }}
//             >
//               <p
//                 style={{
//                   color: "white",
//                   fontSize: "1vw",
//                   fontWeight: 600,
//                   background: "#141414",
//                   padding: "1vh",
//                   borderRadius: "1vh",
//                   cursor: "pointer",
//                 }}
//               >
//                 Booking
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
