import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Apitest from "./apitest.js";
import { TopNavBar } from "./component/TopNavbar/TopNavBar";
import { LeftNavBar } from "./component/LeftNavBar/LeftNavBar";
import { AnalyticsPage } from "./page/AnalyticsPage";
import { RoomsPage } from "./page/Room/RoomsPage.js";
import { CustomersPage } from "./page/CustomersPage";
import { ServicesPage } from "./page/ServicesPage";
import { EmployeesPage } from "./page/EmployeesPage";
import { myAppColor } from "./colors";
import { OrderRoom } from "./page/Room/OrderRoom/OrderRoom";
export const MainContext = React.createContext("undefined");

function App() {
  useEffect(() => {
    // console.log(this.context);
  }, []);
  return (
    <MainContext.Provider value={{ CustomerId: 1 }}>
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
