import "./App.css";
import { Route, Routes } from "react-router-dom";

import Apitest from "./apitest.js";
import { TopNavBar } from "./component/TopNavbar/TopNavBar";
import { LeftNavBar } from "./component/LeftNavBar/LeftNavBar";
import { AnalyticsPage } from "./page/AnalyticsPage";
import { RoomsPage } from "./page/Room/RoomsPage.js";
import { CustomersPage } from "./page/CustomersPage";
import { ServicesPage } from "./page/ServicesPage";
import { EmployeesPage } from "./page/EmployeesPage";
import { myAppColor } from "./colors";

function App() {
  return (
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
            <Route path="/rooms/detail/:id" element={<RoomsPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
