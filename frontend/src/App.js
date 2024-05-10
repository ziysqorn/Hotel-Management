import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Apitest from "./apitest.js";
import { TopNavBar } from "./component/TopNavbar/TopNavBar";
import { LeftNavBar } from "./component/LeftNavBar/LeftNavBar";
import { AnalyticsPage } from "./page/AnalyticsPage";
import { RoomsPage } from "./page/Room/RoomsPage.js";
import { CustomersPage } from "./page/Customer/CustomersPage.js";
import { ServicesPage } from "./page/Service/ServicesPage.js";
import { EmployeesPage } from "./page/Employee/EmployeesPage.js";
import { myAppColor } from "./colors";
import { OrderRoom } from "./page/Room/OrderRoom/OrderRoom.js";
import { Bill } from "./page/Room/Bill/Bill";
import { LoginPage } from "./page/LoginPage";
import { login } from "./component/apicalls";
export const MainContext = React.createContext("undefined");

function App() {
  const [context, setContext] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = async (item) => {
    try {
      // 123-456-789 ,password1
      const data = await login(item.username, item.password);
      console.log(data);
      if (data.rowsAffected > 0) {
        setIsLogin(true);
        localStorage.setItem("UserInfo", JSON.stringify(data.recordset[0]));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // console.log(this.context);
    setContext({ customerInfo: { customerId: 1 } });
    if (!localStorage.getItem("OrdersInfo")) {
      console.log("reset for no retion");
      localStorage.setItem("OrdersInfo", "[]");
    }
    if (localStorage.getItem("UserInfo")) {
      console.log("user is here");
      setIsLogin(true);
    }
  }, []);
  return isLogin ? (
    <MainContext.Provider value={[context, setContext]}>
      <div
        className="App"
        style={{
          position: "relative",
          backgroundColor: myAppColor.Black.WindowBackground,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopNavBar
          handleLogout={() => {
            setIsLogin(false);
            localStorage.setItem("UserInfo", "");
          }}
        />

        <div style={{ display: "flex" }}>
          <LeftNavBar />
          <div
            style={{
              // backgroundColor: "white",
              // border: "1px solid red",
              margin: "20px",
              flex: 1,
            }}
          >
            <Routes>
              <Route path="/apitest" element={<Apitest />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/rooms/orderroom" element={<OrderRoom />} />
              <Route path="/rooms/orderroom/bill" element={<Bill />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </MainContext.Provider>
  ) : (
    <LoginPage
      handleLogin={(item) => {
        console.log(item);
        handleLogin(item);
      }}
    />
  );
}

export default App;
