import {
  faChevronLeft,
  faEye,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../../App";
import {
  OrderRooms,
  getCustomerInfoWithCustomterId,
  getCustomerInfoWithQuery,
  getServiceInfoWithQuery,
} from "../../../component/apicalls";
import "./style.css";
import { MonthCalendar } from "../../../component/Searchbar/MonthCalender";
import axios from "axios";
export const OrderRoom = () => {
  const navigate = useNavigate();
  const [context, setContext] = useContext(MainContext);
  const [cusInfo, setCusInfo] = useState();
  const [chosenDate, setChosenDate] = useState();
  const [chosenRoom, setChosenRoom] = useState();
  const [allOrderRoom, setAllOrderRoom] = useState(() => []);
  const [date, setDate] = useState();
  const [isDetailWindowOpen, setIsDetailWindowOpen] = useState(false);
  const [renderDataInCus, setRenderDataInCus] = useState([]);
  const [renderDataInSer, setRenderDataInSer] = useState([]);

  // ============================Function==============================
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

  const pushCustomerToRoom = (list, roomId, item) => {
    let final = [...list];

    return final.map((room) => {
      if (room.RoomId === roomId) {
        console.log(room);
        let result = false;
        room.allCustomer.map((cus) => {
          if (cus === item) result = true;
        });
        if (result === false) {
          room.allCustomer.push(item);
        }
        return room;
      } else return room;
    });
  };

  const deleteCustomerToRoom = (list, roomId, item) => {
    return list.map((room) => {
      if (room.RoomId == roomId) {
        console.log(room);
        room.allCustomer = room.allCustomer.filter((cus) => {
          return cus !== item;
        });
        return room;
      } else return room;
    });
  };

  const deleteServiceFromRoom = (list, roomId, item) => {
    return list.map((room) => {
      if (room.RoomId == roomId) {
        console.log(room);
        room.allService = room.allService.filter((ser) => {
          return ser !== item;
        });
        return room;
      } else return room;
    });
  };

  const pushServiceToRoom = (list, roomId, item) => {
    return list.map((room) => {
      if (room.RoomId === roomId) {
        console.log(room);
        let result = false;
        room.allService.map((ser) => {
          if (ser === item) result = true;
        });
        if (result === false) {
          room.allService.push(item);
        }
        return room;
      } else return room;
    });
  };

  const handleClearAllOrderRoom = (item) => {
    if (window.confirm(`Xóa Room ${item.RoomId} ?`) == true) {
      setAllOrderRoom((prev) => {
        return prev.filter((room) => {
          return room.RoomId != item.RoomId;
        });
      });
      setRenderDataInCus(null);
    }
  };

  const handleChangeRoomInfo = (item) => {
    setChosenRoom(item);
    setRenderDataInCus({
      allCustomer: [...item.allCustomer],
    });
    setRenderDataInSer({
      allService: [...item.allService],
    });

    // setRenderDataInCus(item);
    setChosenDate({
      startDate: item.startDate,
      endDate: item.endDate,
    });
    setDate(item.startDate);
  };

  const handleChangeDate = (item) => {
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
  };

  const handleExitAndSaveOrderRoom = (item) => {
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
  };

  const handleAddCusomerIntoRoom = (item) => {
    setAllOrderRoom((prev) => {
      const updatedRoom = pushCustomerToRoom(prev, chosenRoom?.RoomId, item);
      return updatedRoom;
    });
    setRenderDataInCus((prev) => {
      let final = prev.allCustomer;
      let check = false;
      final.map((cus) => {
        if (cus == item) {
          check = true;
        }
      });
      if (check == false) {
        final.push(item);
      }
      return { ...prev, allCustomer: final };
    });
  };

  const handleDeleteCustomerFromRoom = (item) => {
    setAllOrderRoom((prev) => {
      return deleteCustomerToRoom(prev, chosenRoom.RoomId, item);
    });
    setRenderDataInCus((prev) => {
      let list = prev.allCustomer.filter((cus) => {
        return cus != item;
      });
      return { ...prev, allCustomer: [...list] };
    });
  };

  const handleAddServiceToRoom = (item) => {
    setAllOrderRoom((prev) => {
      let final = pushServiceToRoom(prev, chosenRoom.RoomId, item);
      return final;
    });
    setRenderDataInSer((prev) => {
      let final = prev.allService;
      let check = false;
      final.map((ser) => {
        if (ser == item) {
          check = true;
        }
      });
      if (!check) {
        final.push(item);
      }
      return { ...prev, allService: final };
    });
  };

  const handleDeleteServiceFromRoom = (item) => {
    setAllOrderRoom((prev) => {
      return deleteServiceFromRoom(prev, chosenRoom.RoomId, item);
    });
    setRenderDataInSer((prev) => {
      let list = prev.allService.filter((ser) => {
        return ser != item;
      });
      return { ...prev, allService: [...list] };
    });
  };

  const handleConfirmOrder = async () => {
    try {
      const data = await OrderRooms(allOrderRoom, cusInfo, 1);
      console.log(data);
      if (!data) {
        alert("hoàn thành ");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // ============================END of Function===========================

  useEffect(() => {
    if (context?.OrderRoomInfo !== null) {
      setChosenDate(context?.OrderRoomInfo?.DateInfo);
      setChosenRoom(context?.OrderRoomInfo?.roomInfo);
      setRenderDataInCus({
        allCustomer: [],
      });
      setRenderDataInSer({
        allService: [],
      });
    }
  }, [context?.OrderRoomInfo]);

  useEffect(() => {
    // ================ Lấy Data ===============
    console.log(context);
    let data = JSON.parse(localStorage.getItem("OrdersInfo"));
    // console.log(localStorage.getItem("OrdersInfo"));
    if (context?.OrderRoomInfo != null) {
      setDate(context?.OrderRoomInfo?.DateInfo.startDate);
      if (data.length && context.OrderRoomInfo !== null) {
        if (!checkIfExitInRoomId(data, context?.OrderRoomInfo?.roomInfo)) {
          data.push({
            ...context?.OrderRoomInfo?.roomInfo,
            ...context?.OrderRoomInfo?.DateInfo,
            allCustomer: [],
            allService: [],
          });
          localStorage.setItem("OrdersInfo", JSON.stringify(data));
        }
        console.log(data);
      } else {
        data.push({
          ...context?.OrderRoomInfo?.roomInfo,
          ...context?.OrderRoomInfo?.DateInfo,
          allCustomer: [],
          allService: [],
        });

        localStorage.setItem("OrdersInfo", JSON.stringify(data));
      }
    }
    setAllOrderRoom(data);
    getCusInfo(1004);
  }, []);

  return (
    <div style={OrderRoomStyles.BodyContainer}>
      {/* =======================top nav==================== */}
      <TopNav
        onClick={() => {
          navigate("/rooms");
        }}
      />
      {/*======================= end of top nav ====================*/}
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
        {/*================= Left Container ================= */}
        {cusInfo && <LeftContainer cusInfo={cusInfo} />}
        {/* ===================End Left Container ============= */}
        {/* ====================Start of Right Container================ */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            color: "white",
            alignItems: "center",
            paddingBottom: "1vw",
            position: "relative",
          }}
        >
          <p style={{ fontSize: "1vw", fontWeight: 500 }}>
            Room {chosenRoom?.RoomId}
          </p>
          {chosenRoom && chosenDate && (
            <StartDateAndEndDateContainer
              chosenDate={chosenDate}
              chosenRoom={chosenRoom}
              setIsDetailWindowOpen={setIsDetailWindowOpen}
            />
          )}
          {/* second div */}
          <div
            style={{
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
              <AllOrderRoomHeader />
              {allOrderRoom.length &&
                allOrderRoom.map((item, index) => {
                  return (
                    item && (
                      <RoomNumOfPeopleDate
                        key={index}
                        RoomId={item.RoomId}
                        numofmen={5}
                        startDate={`${item.startDate.date}/${item.startDate.month}/${item.startDate.year}`}
                        endDate={`${item.endDate.date}/${item.endDate.month}/${item.endDate.year}`}
                        handleRemoveRoomInfo={() => {
                          handleClearAllOrderRoom(item);
                        }}
                        handleChangeRoomInfo={() => {
                          handleChangeRoomInfo(item);
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
              alert("save thành công nhưng chưa xác nhận ");
            }}
            onClearAll={() => {
              // let work = confirm("work");
              if (window.confirm("Xóa toàn bộ ?")) {
                localStorage.setItem("OrdersInfo", "[]");
                setAllOrderRoom([]);
              }
            }}
            onConfirm={() => {
              console.log(`handleconfirmorder`);
              handleConfirmOrder();
            }}
          />
        </div>
        {/* ====================End of Right Container================ */}
      </div>
      {/* =====================Start of pop up window================  */}
      {isDetailWindowOpen && (
        <MonthCalendar
          year={date.year}
          month={date.month}
          mode={"detail"}
          item={{ RoomId: chosenRoom.RoomId }}
          ajust={true}
          position={{ top: "50%" }}
          changeDate={(item) => {
            handleChangeDate(item);
          }}
          exitWindow={(item) => {
            setIsDetailWindowOpen(false);
          }}
          exitWithSave={(item) => {
            handleExitAndSaveOrderRoom(item);
          }}
        />
      )}
      {/* =====================End of pop up window================  */}

      {/* =====================START OF BELOW DIV =================== */}
      {renderDataInCus && renderDataInSer && (
        <AddCusOrderContainer
          RoomId={chosenRoom?.RoomId}
          // ======Customer part====
          chosenRoom={renderDataInCus} //
          onAddCustomer={(item) => {
            handleAddCusomerIntoRoom(item);
          }}
          onDeleteCustomer={(item) => {
            handleDeleteCustomerFromRoom(item);
          }}
          // ======Service part====
          chosenService={renderDataInSer}
          onAddService={(item) => {
            handleAddServiceToRoom(item);
          }}
          onDeleteService={(item) => {
            handleDeleteServiceFromRoom(item);
          }}
        />
      )}
      {/* =====================END OF BELOw DIV =================== */}
    </div>
  );
};

// ================================COMPONENT========================
export const RoomNumOfPeopleDate = ({ ...props }) => {
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
          marginRight: "1vw",

          cursor: "pointer",
        }}
        onClick={() => {
          props.onClearAll();
        }}
      >
        <p>Clear All</p>
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
          props.onConfirm();
        }}
      >
        <p>Confirm Order</p>
      </div>
    </div>
  );
};

const AddCusOrderContainer = ({ ...props }) => {
  // ===============================END OF STATE================
  const [cusVal, setCusVal] = useState("");
  const [allCus, setAllCus] = useState([]);
  const [serVal, setSerVal] = useState("");
  const [allSer, setAllSer] = useState([]);
  // ===============================END OF STATE================
  useEffect(() => {
    console.log(props.chosenService);
  }, [props.stateB]);
  // ========================START OF FUNCTION ===========================
  const handleSearchCustomter = async (val) => {
    console.log(`handle search customer : ${val}`);
    try {
      const data = await getCustomerInfoWithQuery(val);
      setAllCus(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchService = async (val) => {
    try {
      const data = await getServiceInfoWithQuery("S");
      console.log(data.recordset);
      setAllSer(data.recordset);
    } catch (e) {
      console.log(e);
    }
    // console.log("handle search service: ", val);
  };
  // ========================END OF FUNCTION ===========================

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
        marginBottom: "20vh",
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
      {/*=============== START OF CUSTOMER DIV======================== */}
      <MainCustomerDiv
        handleSearchCustomter={(item) => handleSearchCustomter(item)}
        allCus={allCus}
        cusVal={cusVal}
        setCusVal={setCusVal}
        chosenRoom={props.chosenRoom}
        onAddCustomer={(item) => {
          props.onAddCustomer(item);
        }}
        onDeleteCustomer={(item) => {
          props.onDeleteCustomer(item);
        }}
      />

      {/*=============== END OF CUSTOMER DIV======================== */}
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "80%",
            margin: "auto",
            border: "2px solid white",
            marginBottom: "3vw",
            marginTop: "3vw",
          }}
        ></div>
      </div>
      {/* ===============START OF SERVICE DIV=============== */}
      <MainServiceDiv
        handleSearchService={(item) => handleSearchService(item)}
        allSer={allSer}
        serVal={serVal}
        setSerVal={setSerVal}
        chosenService={props.chosenService}
        onAddService={(item) => {
          props.onAddService(item);
        }}
        onDeleteService={(item) => {
          props.onDeleteService(item);
        }}
      />
      {/* ===============END OF SERVICE DIV================= */}
    </div>
  );
};

export const TopNav = ({ ...props }) => {
  return (
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
            props.onClick();
          }}
        />
      </div>
      <div>
        <p style={{ fontSize: "1vw", fontWeight: 600 }}>
          {props.content ? props.content : "Booking room"}
        </p>
      </div>
      <div></div>
    </div>
  );
};

export const LeftContainer = ({ cusInfo }) => {
  return (
    <div
      style={{
        width: "30%",

        display: "flex",
        flexDirection: "column",
        color: "white",
        alignItems: "center",
        position: "relative",
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
  );
};

export const StartDateAndEndDateContainer = ({
  setIsDetailWindowOpen,
  chosenRoom,
  chosenDate,
}) => {
  return (
    <div
      style={{
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
        <p style={{ marginBottom: "0.5vh", fontSize: "1.5vh" }}>Start Date</p>
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
        <p style={{ marginBottom: "0.5vh", fontSize: "1.5vh" }}>End Date</p>
        <p style={{ marginBottom: "0.5vh", fontSize: "1.5vh" }}>
          {`${chosenDate?.endDate.date} - ${chosenDate?.endDate.month} - ${chosenDate?.endDate.year}`}
        </p>
      </div>
    </div>
  );
};

export const AllOrderRoomHeader = () => {
  return (
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
  );
};

export const ServiceInfoWithPlusIcon = ({ item, ...props }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "3vh",
        background: "#111111",
        borderRadius: "0.5vw",
        display: "flex",
        fontSize: "0.8vw",
        alignItems: "center",
        marginBottom: "0.5vw",
      }}
    >
      <p style={{ flex: 1, marginLeft: "1vw" }}>{item.Name}</p>
      <p style={{ flex: 1 }}>{item.Price}</p>
      <FontAwesomeIcon
        icon={faPlus}
        style={{
          marginRight: "1vw",
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={() => {
          props.onAddService(item);
        }}
      />
    </div>
  );
};

export const ServiceInfoWithTrashIcon = ({ item, ...props }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "3vh",
        background: "#111111",
        borderRadius: "0.5vw",
        display: "flex",
        fontSize: "0.8vw",
        alignItems: "center",
        marginBottom: "0.5vw",

        // paddingLeft:"1vw"
      }}
    >
      <p style={{ flex: 1, marginLeft: "1vw" }}>{item.Name}</p>
      <p style={{ flex: 1 }}>{item.Price}</p>
      <FontAwesomeIcon
        icon={faTrash}
        style={{
          marginRight: "1vw",
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={() => {
          props.onDeleteService(item);
        }}
      />
    </div>
  );
};
export const CustomerInfoWithPLusIcon = ({ item, ...props }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "3vh",
        background: "#111111",
        borderRadius: "0.5vw",
        display: "flex",
        fontSize: "0.8vw",
        alignItems: "center",
        marginBottom: "0.5vw",

        // paddingLeft:"1vw"
      }}
    >
      <p style={{ flex: 1, marginLeft: "1vw" }}>{item.FullName}</p>
      <p style={{ flex: 1 }}>{item.Phone}</p>
      <FontAwesomeIcon
        icon={faPlus}
        style={{
          marginRight: "1vw",
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={() => {
          props.onAddCustomer(item);
        }}
      />
    </div>
  );
};

export const CustomerInfoWithTrashIcon = ({ item, ...props }) => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "3vh",
        background: "#111111",
        borderRadius: "0.5vw",
        display: "flex",
        fontSize: "0.8vw",
        alignItems: "center",
        marginBottom: "0.5vw",

        // paddingLeft:"1vw"
      }}
    >
      <p style={{ flex: 1, marginLeft: "1vw" }}>{item.FullName}</p>
      <p style={{ flex: 1 }}>{item.Phone}</p>
      <FontAwesomeIcon
        icon={faTrash}
        style={{
          marginRight: "1vw",
          fontWeight: 700,
          cursor: "pointer",
        }}
        onClick={() => {
          props.onDeleteCustomer(item);
        }}
      />
    </div>
  );
};

export const MainCustomerDiv = ({
  handleSearchCustomter,
  allCus,
  cusVal,
  setCusVal,
  ...props
}) => {
  return (
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
        <div
          style={{
            width: "40%",
            maxHeight: "30vh",
            display: "block",
            // overflow: "scroll",
            overflowY: "scroll",
            // marginBottom: "1vw",
          }}
        >
          {/* one item */}
          {allCus.length > 0 &&
            allCus.map((item, index) => {
              return (
                <CustomerInfoWithPLusIcon
                  key={index}
                  item={item}
                  onAddCustomer={(item) => props.onAddCustomer(item)}
                />
              );
            })}
        </div>
        {/* right */}
        <div style={{ marginLeft: "2vw", width: "50%" }}>
          {props.chosenRoom?.allCustomer?.length > 0
            ? props.chosenRoom?.allCustomer?.map((item, index) => {
                return (
                  <CustomerInfoWithTrashIcon
                    key={index}
                    item={item}
                    onDeleteCustomer={(item) => {
                      props.onDeleteCustomer(item);
                    }}
                  />
                );
              })
            : null}
        </div>
      </div>
      {/* area for service  */}
    </div>
  );
};

export const MainServiceDiv = ({
  allSer,
  handleSearchService,
  serVal,
  setSerVal,
  ...props
}) => {
  return (
    <div style={{ width: "90%" }}>
      {/* =====================START OF SEARCH BAR=============== */}
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
              handleSearchService(serVal);
            }}
          />
          <input
            value={serVal}
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
              setSerVal(e.target.value);
            }}
          />
        </div>
      </div>
      {/* =====================END OF SEARCH BAR=============== */}

      {/* ====================START OF SERVICE AREA DIV============= */}
      <div style={{ width: "100%", display: "flex", marginTop: "1vw" }}>
        {/* ============= START OF LEFT SIDE======= */}
        <div
          style={{
            width: "40%",
            maxHeight: "30vh",
            overflowY: "scroll",
            marginBottom: "1vw",
          }}
        >
          {allSer.length > 0 &&
            allSer.map((item, index) => {
              return (
                <ServiceInfoWithPlusIcon
                  item={item}
                  key={index}
                  onAddService={() => props.onAddService(item)}
                />
              );
            })}
        </div>
        {/* ============= END OF LEFT SIDE======= */}
        {/* ============= START OF RIGHT SIDE======= */}
        <div style={{ marginLeft: "2vw", width: "50%" }}>
          {props.chosenService?.allService?.length > 0
            ? props.chosenService?.allService.map((item, index) => {
                return (
                  <ServiceInfoWithTrashIcon
                    item={item}
                    key={index}
                    onDeleteService={() => {
                      props.onDeleteService(item);
                    }}
                  />
                );
              })
            : null}
        </div>
        {/* ============= END OF RIGHT SIDE======= */}
      </div>
      {/* ====================END OF SERVICE AREA DIV============= */}
    </div>
  );
};
// ================================END OF COMPONENT========================

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
