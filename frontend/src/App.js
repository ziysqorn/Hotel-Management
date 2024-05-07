import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Apitest from "./apitest.js";
import { TopNavBar } from "./component/TopNavbar/TopNavBar";
import { LeftNavBar } from "./component/LeftNavBar/LeftNavBar";
import { AnalyticsPage } from "./page/AnalyticsPage";
import { RoomsPage } from "./page/Room/RoomsPage.js";
import { CustomersPage } from "./page/CustomersPage";
import { ServicesPage } from "./page/ServicesPage";
import { EmployeesPage } from "./page/Employee/EmployeesPage.js";
import { myAppColor } from "./colors";
import { OrderRoom } from "./page/Room/OrderRoom/OrderRoom.js";
import { Bill } from "./page/Room/Bill/Bill";
export const MainContext = React.createContext("undefined");

function App() {
  const [context, setContext] = useState();
  useEffect(() => {
    // console.log(this.context);
    setContext({ customerInfo: { customerId: 1 } });
    if (!localStorage.getItem("OrdersInfo")) {
      console.log("reset for no retion");
      localStorage.setItem("OrdersInfo", "[]");
    }
  }, []);
  return (
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
        <TopNavBar />

        <div style={{ display: "flex" }}>
          <LeftNavBar />
          <div
            style={{
              // backgroundColor: "white",
              border: "1px solid red",
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
  );
}

export default App;
