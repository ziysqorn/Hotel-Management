import React, { useContext, useEffect, useState } from "react";
import {
  CustomerInfoWithPLusIcon,
  CustomerInfoWithTrashIcon,
  LeftContainer,
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
import { faCalendar, faSearch } from "@fortawesome/free-solid-svg-icons";
import { MonthCalendar } from "../../../component/Searchbar/MonthCalender";

export const Bill = () => {
  const navigate = useNavigate();
  const [context, setContext] = useContext(MainContext);
  // ============START VARIABLE===============
  const [cusInfo, setCusInfo] = useState();
  const [allOrderRoom, setAllOrderRoom] = useState([]);
  const [isHaveCustomer, setIsHaveCustomer] = useState(false);
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
      const data = await getOrderRoomWithCustomerIdStartDateEndDate(1002);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  //   ================END OF FUNCTION============
  // ============START USEEFFECT===============
  useEffect(() => {
    console.log(context);

    getCusInfo(1004);
    // handleGetAllOrderRoomWithStartAndEndDate(1002,startdate,enddate)
  }, []);
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
      {/*================= Left Container ================= */}
      <div
        style={{
          flex: 1,
          background: "#2E2E2E",
          borderRadius: "1vw",
          display: "flex",
          paddingBottom: "10vh",
        }}
      >
        {cusInfo && <LeftContainer cusInfo={cusInfo} />}
      </div>
      {/* ===================End Left Container ============= */}
      {/* ==============END OF CUSTOMER AND ROOM CONTAINER========== */}
    </div>
  ) : (
    <AllCustomerDiv />
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
      </div>
      {/* =========END OF SEARCH BAR====  */}

      {/* ========START OF MAIN DIV======= */}
      {/* =======START OF CHOSEN ITEM======== */}
      {chosenCus ? (
        <div
          style={{
            width: "60%",
            maxHeight: "30vh",
            // overflowY: "scroll",
            // minHeight: "10vh",
            // marginBottom: "1vw",
            margin: "2vh auto ",
          }}
        >
          <CustomerInfoWithTrashIcon
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
              console.log(item);
              return (
                <CustomerInfoWithPLusIcon
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
