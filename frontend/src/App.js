import logo from "./logo.svg";
import { ReactDOM } from "react";
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
        minHeight:"100vh",

      }}
    >
      {/* Start of top nav  */}
      {/* END of top nav  */}
      {/* Start of left nav  */}
      {/* End of left nav  */}
      <TopNavBar />
      <LeftNavBar />

      <div
        style={{
          width: "80%",
          minHeight: "80%",


          // backgroundColor: "white",
          border: "1px solid red",
          position: "absolute",
          top: "150px",
          left: "400px",
        }}
      >
        <Routes>
          <Route path="/apitest" element={<Apitest />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
