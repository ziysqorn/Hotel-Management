import React, { useContext, useEffect, useState } from "react";
import {
  AllOrderRoomHeader,
  CustomerInfoWithPLusIcon,
  CustomerInfoWithTrashIcon,
  LeftContainer,
  RoomNumOfPeopleDate,
  StartDateAndEndDateContainer,
  TopNav,
} from "../OrderRoom/OrderRoom";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../../App";
import {
  getCustomerInfoWithCustomterId,
  getOrderRoomWithCustomerIdStartDateEndDate,
  getAllCusomterWithPhoneNum,
} from "../../../component/apicalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { MonthCalendar } from "../../../component/Searchbar/MonthCalender";

export const Bill = () => {
  const navigate = useNavigate();
  const [context, setContext] = useContext(MainContext);
  // ============START VARIABLE===============
  const [cusInfo, setCusInfo] = useState();
  const [allOrderRoom, setAllOrderRoom] = useState([]);
  const [allOrderRoomAfter, setAllOrderRoomAfter] = useState([]);
  const [isHaveCustomer, setIsHaveCustomer] = useState(false);
  const [chosenRoom, setChosenRoom] = useState();
  const [chosenDate, setChosenDate] = useState();
  const [date, setDate] = useState();
  const [isDetailWindowOpen, setIsDetailWindowOpen] = useState(false);
  // ============END OF VARIABLE===============

  //   ================START OF FUNCTION============
  const getCusInfo = async (cusId) => {
    try {
      const data = await getCustomerInfoWithCustomterId(cusId);
      console.log(data);
      setCusInfo(data[0]);
    } catch (e) {
      console.log(e);
    }
  };
  const handleGetAllOrderRoomWithStartAndEndDate = async (
    cusId,
    startDate,
    endDate
  ) => {
    try {
      const data = await getOrderRoomWithCustomerIdStartDateEndDate(
        cusId,
        startDate,
        endDate
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleFindBill = async (item) => {
    let startDate = `${item.chosenDate.startDate.year}-${item.chosenDate.startDate.month}-${item.chosenDate.startDate.date}`;
    let endDate = `${item.chosenDate.endDate.year}-${item.chosenDate.endDate.month}-${item.chosenDate.endDate.date}`;

    try {
      const result = await handleGetAllOrderRoomWithStartAndEndDate(
        item.chosenCus.CustomerId,
        startDate,
        endDate
      );
      console.log(result);
      if (result.rowsAffected[0] > 0) {
        setCusInfo(item.chosenCus);
        setAllOrderRoom(result.recordset);
        setIsHaveCustomer(true);
      } else {
        alert("Không tìm thấy bill");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleConvertToAllOrderRoomAfter = (list) => {
    console.log(list);
    let finalList = [];
    list.forEach((item) => {
      console.log(item);
      let checkRoomExit = false;
      finalList.forEach((room) => {
        if (room?.RoomId == item.RoomId) {
          checkRoomExit = true;
        }
      });

      if (!checkRoomExit) {
        finalList.push({ ...item, allCusomter: [] });
      }
      finalList.forEach((room) => {
        if (room.RoomId == item.RoomId) {
          let checIfCusExit = false;
          room.allCusomter.forEach((cus) => {
            if (cus.CustomerId == item.StayCustomerId) {
              checIfCusExit = true;
            }
          });
          if (!checIfCusExit) {
            room.allCusomter.push({ CustomerId: item.StayCustomerId });
          }
        }
      });
    });
    console.log(finalList);
    return finalList;
  };

  const stringToDate = (item) => {
    console.log(item);
    let final = new Date(item);
    return {
      date: final.getDate(),
      month: final.getMonth() + 1,
      year: final.getFullYear(),
    };
  };

  const handleChangeRoomInfo = (item) => {
    console.log(item);
    console.log(item.RoomId);
    console.log(stringToDate(item.CheckInDate));
    console.log(stringToDate(item.ExpectedCHeckOutDate));
    console.log({
      chosenDate: {
        startDate: stringToDate(item.CheckInDate),
        endDate: stringToDate(item.ExpectedCHeckOutDate),
      },
    });
    setChosenDate({
      startDate: stringToDate(item.CheckInDate),
      endDate: stringToDate(item.ExpectedCHeckOutDate),
    });
    setChosenRoom({ RoomId: item.RoomId });
  };
  //   ================END OF FUNCTION============
  // ============START USEEFFECT===============
  useEffect(() => {
    getCusInfo(1004);
    console.log(stringToDate("2024-05-10T00:00:00.000Z"));
    // handleGetAllOrderRoomWithStartAndEndDate(1002,startdate,enddate)
  }, []);

  useEffect(() => {
    console.log(allOrderRoom);
    setAllOrderRoomAfter(handleConvertToAllOrderRoomAfter(allOrderRoom));
  }, [allOrderRoom]);
  // ============END OF USEEFFECT===============
  return isHaveCustomer ? (
    <div style={OrderRoomStyles.BodyContainer}>
      {/* ================TOP NAV============== */}
      <TopNav
        content={"Bill"}
        onClick={() => {
          navigate("/rooms");
        }}
      />
      {/* ================END OF TOP NAV============== */}
      {/* ==============START OF CUSTOMER AND ROOM CONTAINER========== */}
      <div
        style={{
          flex: 1,
          background: "#2E2E2E",
          borderRadius: "1vw",
          display: "flex",
          paddingBottom: "10vh",
        }}
      >
        {/*================= Left Container ================= */}
        {cusInfo && <LeftContainer cusInfo={cusInfo} />}
        {/* ===================End Left Container ============= */}
        {/* ====================START OF ROOM CONTAINER=========== */}
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
          {chosenRoom && chosenDate && (
            <p style={{ fontSize: "1vw", fontWeight: 500 }}>
              Room {chosenRoom?.RoomId}
            </p>
          )}
          {chosenRoom && chosenDate && (
            <StartDateAndEndDateContainer
              chosenDate={chosenDate}
              chosenRoom={chosenRoom}
              setIsDetailWindowOpen={setIsDetailWindowOpen}
            />
          )}
          <div
            style={{
              flex: 3,
              width: "80%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ fontSize: "1vw", marginBottom: "2vw" }}>All room</p>
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <AllOrderRoomHeader />
              {allOrderRoomAfter.length > 0 &&
                allOrderRoomAfter.map((item, index) => {
                  const startDate = stringToDate(item.CheckInDate);
                  const endDate = stringToDate(item.ExpectedCHeckOutDate);
                  return (
                    item && (
                      <RoomNumOfPeopleDate
                        key={index}
                        RoomId={item.RoomId}
                        numofmen={item.allCusomter.length}
                        startDate={`${startDate.date}/${startDate.month}/${startDate.year}`}
                        endDate={`${endDate.date}/${endDate.month}/${endDate.year}`}
                        // handleRemoveRoomInfo={() => {
                        //   handleClearAllOrderRoom(item);
                        //   console.log(item);
                        // }}
                        handleChangeRoomInfo={() => {
                          handleChangeRoomInfo(item);
                          console.log(item);
                        }}
                      />
                    )
                  );
                })}
            </div>
          </div>
        </div>
        {/* ====================END OF ROOM CONTAINER=========== */}
      </div>

      {/* ==============END OF CUSTOMER AND ROOM CONTAINER========== */}
      {/* ==========START POP UP windows========= */}
      {isDetailWindowOpen && (
        <MonthCalendar
          year={chosenDate.startDate.year}
          month={chosenDate.startDate.month}
          chosenDate={chosenDate}
          mode={"detail"}
          edit={true} //ko dc edit
          item={{ RoomId: chosenRoom.RoomId }}
          ajust={true}
          position={{ top: "70%" }}
          changeDate={(item) => {
            // handleChangeDate(item);
          }}
          exitWindow={(item) => {
            setIsDetailWindowOpen(false);
          }}
          exitWithSave={(item) => {
            // handleExitAndSaveOrderRoom(item);
          }}
        />
      )}
      {/* ==========END OF POP UP windows========= */}
    </div>
  ) : (
    <AllCustomerDiv
      onFindBill={(item) => {
        console.log(item);
        handleFindBill(item);
      }}
    />
  );
};

// ============START COMPONENT ==========
const AllCustomerDiv = ({ ...props }) => {
  const navigate = useNavigate();
  // =======START VARIABLE==========
  const [allCus, setAllCus] = useState([]);
  const [cusVal, setCusVal] = useState();
  const [isDetailWindowOpen, setIsDetailWindowOpen] = useState(false);
  const [date, setDate] = useState();
  const [chosenDate, setChosenDate] = useState();
  const [chosenCus, setChosenCus] = useState();
  // =======END VARIABLE=========

  // ===========START FUNCTIONS========
  const currentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const date = now.getDate();

    return { year, month, date };
  };
  const getAllCustomerInfoWithPhoneNum = async (item) => {
    try {
      const data = await getAllCusomterWithPhoneNum(item);
      console.log(data);
      setAllCus(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChoseDate = () => {
    console.log("handle open calender");
    setIsDetailWindowOpen(true);
  };
  // ===========END FUNCTIONS=========
  // ===========START USEEFFECT+======
  useEffect(() => {
    setDate(currentDate());
  }, []);

  // ===========END USEEFFECT+======

  return (
    <div
      style={{
        height: "100%",
        // alignItems: "center"
        // justifyContent: "center",
        // display:"flex",

        ...OrderRoomStyles.BodyContainer,
      }}
    >
      {/* =========START TOPNAV======= */}
      <TopNav
        content={"Choose your Customer"}
        onClick={() => {
          navigate("/rooms");
        }}
      />
      {/* =========END OF TOPNAV========== */}

      {/* =========START OF SEARCH BAR====  */}
      <div
        style={{
          width: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
              getAllCustomerInfoWithPhoneNum(cusVal);
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
        <FontAwesomeIcon
          style={{ fontSize: "1vw", cursor: "pointer" }}
          icon={faCalendar}
          onClick={() => {
            handleChoseDate();
          }}
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
                setIsDetailWindowOpen(true);
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
                setChosenDate();
              }}
            />
          </div>
        )}
      </div>
      {/* =========END OF SEARCH BAR====  */}

      {/* ========START OF MAIN DIV======= */}
      {/* =======START OF CHOSEN ITEM======== */}
      {chosenCus ? (
        <div
          style={{
            width: "60%",
            maxHeight: "30vh",
            margin: "2vh auto ",
          }}
        >
          <CustomerInfoWithTrashIcon
            key={-1}
            item={chosenCus}
            onDeleteCustomer={() => {
              // console.log(`handle dele`, item);
              setChosenCus(null);
            }}
          />
        </div>
      ) : null}

      {/* =======END OF CHOSEN ITEM======== */}
      {/* =======START OF ARRAY======== */}
      <div
        style={{
          width: "60%",
          maxHeight: "30vh",
          overflowY: "scroll",
          margin: "2vh auto ",
        }}
      >
        {allCus.length > 0
          ? allCus.map((item, index) => {
              return (
                <CustomerInfoWithPLusIcon
                  key={index}
                  item={item}
                  onAddCustomer={() => {
                    console.log(`handle set userinfo`, chosenCus);
                    setChosenCus(item);
                  }}
                />
              );
            })
          : null}
      </div>

      {/* =======END OF ARRAY======== */}
      {/* ========END OF MAIN DIV======= */}
      <div
        style={{
          width: "5vw",
          padding: "0.2vw",
          border: "1px solid White",
          textAlign: "center",
          borderRadius: "1vw",
          // marginRight: "1vw",
          margin: "0 auto",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log(`handle search`);
          props.onFindBill({ chosenDate, chosenCus });
        }}
      >
        <p style={{ fontSize: "0.5vw", fontWeight: 500 }}>Find Bill</p>
      </div>
      {/* =======START OF CALENDER======= */}
      {isDetailWindowOpen && (
        <MonthCalendar
          year={date.year}
          month={date.month}
          changeDate={(item) => {
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
            setChosenDate(item);
            setIsDetailWindowOpen(false);
          }}
        />
      )}
      {/* =======END OF CALENDER======= */}
    </div>
  );
};

// ============END COMPONENT ===========

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
