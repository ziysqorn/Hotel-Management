import logo from "./logo.svg";
import { ReactDOM } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Apitest from "./apitest.js";
import { TopNavBar } from "./component/TopNavbar/TopNavBar";
import { LeftNavBar } from "./component/LeftNavBar/LeftNavBar";
import { AnalyticsPage } from "./page/AnalyticsPage";
import { RoomsPage } from "./page/RoomsPage";
import { CustomersPage } from "./page/CustomersPage";
import { ServicesPage } from "./page/ServicesPage";
import { EmployeesPage } from "./page/EmployeesPage";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      {/* Start of top nav  */}
      {/* END of top nav  */}
      {/* Start of left nav  */}
      {/* End of left nav  */}
      <TopNavBar />
      <LeftNavBar />

      <div
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "white",
          position: "absolute",
          top: "150px",
          left: "500px",
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
