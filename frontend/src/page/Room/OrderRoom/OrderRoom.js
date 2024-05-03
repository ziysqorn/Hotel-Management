import {
  faChevronLeft,
  faEye,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../../App";
import { getCustomerInfoWithCustomterId } from "../../../component/apicalls";
import "./style.css";
import { MonthCalendar } from "../../../component/Searchbar/MonthCalender";
export const OrderRoom = () => {
  const navigate = useNavigate();
  const [context, setContext] = useContext(MainContext);
  const [cusInfo, setCusInfo] = useState();
  const [chosenDate, setChosenDate] = useState();
  const [chosenRoom, setChosenRoom] = useState();
  const [allOrderRoom, setAllOrderRoom] = useState([]);
  const [date, setDate] = useState();
  const [isDetailWindowOpen, setIsDetailWindowOpen] = useState(false);
  //

  const getCusInfo = async (cusId) => {
    try {
      const data = await getCustomerInfoWithCustomterId(cusId);
      console.log(data);
      setCusInfo(data[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfExitInRoomId = (list, item) => {
    let result = false;
    list.map((data) => {
      if (data.RoomId == item.RoomId) result = true;
    });
    return result;
  };

  const pushCustomerToRoom = (list, RoomId, item) => {
    console.log(list);
    return list.map((room) => {
      if (room.RoomId == RoomId) {
        // console.log(room);
        let result = false;
        room.allCusomter.map((cus) => {
          if (cus == item) result = true;
        });
        if (result === false) {
          room.allCusomter.push(item);
        }
        return room;
      } else return room;
    });
  };

  useEffect(() => {
    console.log(context);
    // if (context?) {
    // getCusInfo(context.customerInfo.customerId);
    if (context?.OrderRoomInfo !== null) {
      setChosenDate(context?.OrderRoomInfo?.DateInfo);
      setChosenRoom(context?.OrderRoomInfo?.roomInfo);
    }
    // }
    // localStorage.setItem("OrdersInfo", "[]");
    let data = JSON.parse(localStorage.getItem("OrdersInfo"));
    console.log(localStorage.getItem("OrdersInfo"));
    if (context?.OrderRoomInfo != null) {
      setDate(context?.OrderRoomInfo?.DateInfo.startDate);
      if (data.length && context.OrderRoomInfo !== null) {
        // console.log("add to data", data.length);
        // console.log("add to data", data);
        // data = pushCustomerToRoom(data, "P101", { CustomerId: 1 });

        if (!checkIfExitInRoomId(data, context?.OrderRoomInfo?.roomInfo)) {
          // nếu data chưa có room
          data.push({
            ...context?.OrderRoomInfo?.roomInfo,
            ...context?.OrderRoomInfo?.DateInfo,
            allCusomter: [],
          });
          localStorage.setItem("OrdersInfo", JSON.stringify(data));
        }
        console.log(data);
      } else {
        data.push({
          ...context?.OrderRoomInfo?.roomInfo,
          ...context?.OrderRoomInfo?.DateInfo,
          allCusomter: [],
        });

        localStorage.setItem("OrdersInfo", JSON.stringify(data));
      }
    }
    setAllOrderRoom(data);
    console.log(data);
    // data.map((item) => {});
    getCusInfo(1);
  }, []);
  return (
    <div style={OrderRoomStyles.BodyContainer}>
      {/* top nav */}
      <div
        style={{
          minHeight: "7vh",
          // border: "1px solid white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center ",
        }}
      >
        <div style={{ paddingLeft: "1vw" }}>
          <FontAwesomeIcon
            style={{
              fontSize: "0.8vw",
              fontWeight: 600,
              cursor: "pointer",
            }}
            icon={faChevronLeft}
            onClick={() => {
              navigate("/rooms");
            }}
          />
        </div>
        <div>
          <p style={{ fontSize: "1vw", fontWeight: 600 }}>Booking room</p>
        </div>
        <div></div>
      </div>
      {/* end of top nav */}
      <div
        style={{
          flex: 1,
          // border: "1px solid blue",
          background: "#2E2E2E",
          borderRadius: "1vw",
          display: "flex",
          paddingBottom: "10vh",
        }}
      >
        {/* Left */}
        <div
          style={{
            width: "30%",
            // border: "1px solid green",
            // borderRight:"1px 50% solid white",
            display: "flex",
            flexDirection: "column",
            color: "white",
            alignItems: "center",
            position: "relative",
            // justifyContent: "space",
          }}
        >
          <div
            style={{
              height: "80%",
              position: "absolute",
              right: 0,
              border: "1px solid white",
              top: "50%",
              transform: "translate(0,-50%)",
            }}
          ></div>
          <p style={{ fontSize: "1vw", fontWeight: 500 }}>Customer Info</p>
          {/* customer info */}
          {cusInfo && (
            <div
              style={{
                flex: 1,
                marginTop: "2vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: "1vw",
              }}
            >
              {/*  */}
              <div
                style={{
                  width: "70%",
                  borderBottom: "1px solid white",
                  paddingLeft: "1%",
                }}
              >
                <p style={{ marginBottom: "0.5vh" }}>{cusInfo.FullName}</p>
              </div>
              <div
                style={{
                  width: "70%",
                  borderBottom: "1px solid white",
                  paddingLeft: "1%",
                  marginTop: "9vh",
                }}
              >
                <p style={{ marginBottom: "0.5vh" }}>{cusInfo.Phone}</p>
              </div>
              <div
                style={{
                  width: "70%",
                  borderBottom: "1px solid white",
                  paddingLeft: "1%",
                  marginTop: "9vh",
                }}
              >
                <p style={{ marginBottom: "0.5vh" }}>{cusInfo.PersonalId}</p>
              </div>
              <div
                style={{
                  width: "70%",
                  borderBottom: "1px solid white",
                  paddingLeft: "1%",
                  marginTop: "9vh",
                }}
              >
                <p style={{ marginBottom: "0.5vh" }}>{cusInfo.Address}</p>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            // width: "30%",
            // border: "1px solid green",
            // background:"white",
            // borderRight:"1px 50% solid white",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            color: "white",
            alignItems: "center",
            paddingBottom: "1vw",
            position: "relative",
            // justifyContent: "space",
          }}
        >
          <p style={{ fontSize: "1vw", fontWeight: 500 }}>
            Room {chosenRoom?.RoomId}
          </p>
          {chosenRoom && chosenDate && (
            <div
              style={{
                // border: "1px solid white",
                flex: 1,
                width: "60%",
                display: "flex",
                justifyContent: "space-around",
              }}
              onClick={() => {
                console.log("handle change date of room");
                console.log(chosenRoom);
                console.log(chosenDate);
                setIsDetailWindowOpen(true);
              }}
            >
              <div
                style={{
                  width: "20%",
                  // height: "22%",
                  borderBottom: "1px solid white",
                  paddingLeft: "1%",
                  marginBottom: "auto",
                  // marginTop: "9vh",
                }}
              >
                <p style={{ marginBottom: "0.5vh", fontSize: "1.5vh" }}>
                  Start Date
                </p>
                <p style={{ marginBottom: "0.5vh", fontSize: "1.5vh" }}>
                  {`${chosenDate?.startDate.date} - ${chosenDate?.startDate.month} - ${chosenDate?.startDate.year}`}
                </p>
              </div>
              <div
                style={{
                  width: "20%",
                  // minHeight: "22%",
                  borderBottom: "1px solid white",
                  paddingLeft: "1%",
                  marginBottom: "auto",
                  // marginTop: "9vh",
                }}
              >
                <p style={{ marginBottom: "0.5vh", fontSize: "1.5vh" }}>
                  End Date
                </p>
                <p style={{ marginBottom: "0.5vh", fontSize: "1.5vh" }}>
                  {`${chosenDate?.endDate.date} - ${chosenDate?.endDate.month} - ${chosenDate?.endDate.year}`}
                </p>
              </div>
            </div>
          )}
          {/* second div */}
          <div
            style={{
              // border: "1px solid white",
              flex: 3,
              width: "80%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ fontSize: "1vw", marginBottom: "2vw" }}>
              Selected room
            </p>

            {/* list item */}
            <div
              style={{
                flex: 1,
                // background: "white",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* 1 item */}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  fontSize: "1vw",
                  fontWeight: 500,
                }}
              >
                <p style={{ flex: 1, textAlign: "center" }}>Room</p>
                <p style={{ flex: 1.5, textAlign: "center" }}>Num of Men</p>
                <p style={{ flex: 2.5, textAlign: "center" }}>Start Day</p>
                <div
                  style={{
                    display: "flex",
                    marginRight: "1vw",
                    flex: 0.5,
                    // background: "white",
                  }}
                ></div>
              </div>

              {allOrderRoom.length &&
                allOrderRoom.map((item) => {
                  console.log(item);
                  return (
                    item && (
                      <RoomNumOfPeopleDate
                        RoomId={item.RoomId}
                        numofmen={5}
                        startDate={`${item.startDate.date}/${item.startDate.month}/${item.startDate.year}`}
                        endDate={`${item.endDate.date}/${item.endDate.month}/${item.endDate.year}`}
                        handleRemoveRoomInfo={() => {
                          console.log("handle remove", item);
                          console.log("handle remove", allOrderRoom);
                          let text;
                          if (
                            window.confirm(`Xóa Room ${item.RoomId}`) == true
                          ) {
                            setAllOrderRoom((prev) => {
                              return prev.filter((room) => {
                                return room.RoomId != item.RoomId;
                              });
                            });
                          } else {
                            text = "You canceled!";
                          }
                        }}
                        handleChangeRoomInfo={() => {
                          console.log("handle change room info", item);
                          setChosenRoom(item);
                          setChosenDate({
                            startDate: item.startDate,
                            endDate: item.endDate,
                          });
                          setDate(item.startDate);
                        }}
                      />
                    )
                  );
                })}
            </div>
          </div>

          {/* thirt div */}
          <ThirdDiv
            onSaveAll={() => {
              console.log(allOrderRoom);
              localStorage.setItem("OrdersInfo", JSON.stringify(allOrderRoom));
            }}
            onClearAll={() => {
              // let work = confirm("work");
              if (window.confirm("Xóa toàn bộ ?")) {
                localStorage.setItem("OrdersInfo", "[]");
                setAllOrderRoom([]);
              }
            }}
          />
        </div>
        {/* Right */}
      </div>
      {/* calender cần các props sua , year,month,item:RoomId là dc :)),  */}
      {isDetailWindowOpen && (
        <MonthCalendar
          year={date.year}
          month={date.month}
          mode={"detail"}
          item={{ RoomId: chosenRoom.RoomId }}
          ajust={true}
          position={{ top: "82%" }}
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
            setIsDetailWindowOpen(false);
          }}
          exitWithSave={(item) => {
            console.log("handle exit and save", item, chosenRoom.RoomId);
            setAllOrderRoom((prev) => {
              return prev.map((room) => {
                if (room.RoomId == chosenRoom.RoomId) {
                  return {
                    ...room,
                    startDate: item.startDate,
                    endDate: item.endDate,
                  };
                } else return room;
              });
            });
          }}
        />
      )}
      <AddCusOrderContainer RoomId={chosenRoom?.RoomId} />
    </div>
  );
};

const RoomNumOfPeopleDate = ({ ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        fontSize: "0.8vw",
        fontWeight: 500,
        background: "#111111",
        paddingTop: "1vh",
        paddingBottom: "1vh",
        borderRadius: "1vh",
        margin: "0.1vh 0",
        cursor: "pointer",
      }}
    >
      <p
        style={{
          flex: 1,
          textAlign: "center",
          borderRight: "1px solid white",
          margin: 0,
        }}
      >
        {props.RoomId}
      </p>
      <p
        style={{
          flex: 1.5,
          textAlign: "center",
          borderRight: "1px solid white",
          margin: 0,
        }}
      >
        {props.numofmen}
      </p>
      <p
        style={{
          flex: 2.5,
          textAlign: "center",
          // borderRight: "1px solid white",
          margin: 0,
        }}
      >
        {props.startDate} To {props.endDate}
      </p>
      <div
        style={{
          display: "flex",
          marginRight: "1vw",
          flex: 0.5,
          // background: "white",
          justifyContent: "space-around",
        }}
      >
        <FontAwesomeIcon
          icon={faEye}
          onClick={() => {
            props.handleChangeRoomInfo();
          }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            props.handleRemoveRoomInfo();
          }}
        />
      </div>
    </div>
  );
};

const ThirdDiv = ({ ...props }) => {
  return (
    <div style={{ width: "80%", display: "flex" }}>
      <div
        style={{
          width: "5vw",
          padding: "0.2vw",
          border: "1px solid White",
          textAlign: "center",
          borderRadius: "1vw",
          cursor: "pointer",
          marginRight: "1vw",
        }}
        onClick={() => {
          props.onSaveAll();
        }}
      >
        <p>Save All</p>
      </div>
      <div
        style={{
          width: "5vw",
          padding: "0.2vw",
          border: "1px solid White",
          textAlign: "center",
          borderRadius: "1vw",
          cursor: "pointer",
        }}
        onClick={() => {
          props.onClearAll();
        }}
      >
        <p>Clear All</p>
      </div>
    </div>
  );
};

const AddCusOrderContainer = ({ ...props }) => {
  const [cusVal, setCusVal] = useState("");

  const handleSearchCustomter = (val) => {
    console.log(`handle search customer : ${val}`);
  };

  return (
    <div
      style={{
        // border: "1px solid white",
        background: "#2E2E2E",
        borderRadius: "1vw",
        width: "100%",
        minHeight: "20vh",
        marginTop: "1vh",
        display: "flex",
        flexDirection: "column",
        // padding:"1vw 0"
        alignItems: "center",
      }}
    >
      {/* title div */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <p style={{ fontSize: "1vw", fontWeight: 600 }}>
          Customers in Room {props.RoomId}
        </p>
      </div>
      {/* customer div */}

      <div style={{ width: "90%" }}>
        {/* search bar div */}
        <div style={{ width: "100%" }}>
          <div
            style={{
              width: "40%",
              height: "2vw",
              display: "flex",
              alignItems: "center",
              background: "#111111",
              paddingLeft: "0.5vw",
              borderRadius: "0.5vw",
            }}
          >
            <FontAwesomeIcon
              style={{
                fontWeight: 600,
                fontSize: "1vw",
                marginRight: "0.5vw",
                cursor: "pointer",
              }}
              icon={faSearch}
              onClick={() => {
                // props.onSearchCustomer(cusVal);
                handleSearchCustomter(cusVal);
              }}
            />
            <input
              value={cusVal}
              style={{
                width: "100%",
                fontSize: "0.8vw",
                backgroundColor: "#111111",
                outline: "none",
                textDecoration: "none",
                border: "none",
                color: "white",
              }}
              placeholder="Search..."
              onChange={(e) => {
                setCusVal(e.target.value);
              }}
            />
          </div>
        </div>
        {/* area for customer */}
        <div style={{ width: "100%", display: "flex", marginTop: "1vw" }}>
          {/* left */}
          <div style={{ width: "40%", minHeight: "2vh" }}>
            {/* one item */}
            <div
              style={{
                width: "100%",
                minHeight: "3vh",
                background: "#111111",
                borderRadius: "0.5vw",
                display: "flex",
              }}
            >
              <p style={{ flex: 1 }}>Nguyễn Nguyên Khang</p>
              <p style={{ flex: 1 }}>01233444555555</p>
            </div>
          </div>
          {/* right */}
          <div style={{ marginLeft: "2vw", width: "50%" }}></div>
        </div>
      </div>
    </div>
  );
};

const OrderRoomStyles = {
  BodyContainer: {
    width: "100%",
    minHeight: "100%",
    // background: "white",
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
};
