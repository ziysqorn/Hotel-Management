import React, { useState } from "react";
import { myAppColor } from "../../colors";
import "./style.css";
import axios from "axios";
import ServiceList from "../../component/ServiceList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Service_Info } from "./ServiceInfo";

export const ServicesPage = ({ onSearch, ...props }) => {
  // const [showAddForm, setShowAddForm] = useState(false);

  const removePword = (item) => {
    return item.slice(1);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  

  const handleDeleteData = () => {
    // Xóa dữ liệu trên các input ở đây
    const inputs = document.querySelectorAll('.showAdd input[type="text"]');
    inputs.forEach(input => {
      input.value = ''; // Xóa giá trị của input
    });
  };
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: ""
  });


  const handleCloseForm = () => {
    setShowAddForm(false);
    // Reset form data after closing
    setFormData({
      serviceName: "",
      description: "",
      price: ""
    });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // const handleAddService = () => {
  //   axios.post('http://localhost:4000/api/service/add/', formData)
  //     .then(response => {
  //       // Xử lý response từ server (nếu cần)
  //       console.log(response.data);
  //       // Đóng form sau khi thêm dữ liệu thành công
  //       handleCloseForm();
  //     })
  //     .catch(error => {
  //       // Xử lý lỗi (nếu có)
  //       console.error('Error adding service:', error.response.status, error.response.data);

  //     });
  // };


  const handleAddService = () => {
    const { serviceName, description, price } = formData;
  
    // Check if any required fields are empty
    if (!serviceName || !description || !price) {
      console.error('Please fill in all fields.');
      return;
    }
  
    // Send the form data to the backend
    axios.post('http://localhost:4000/api/service/add', formData)
      .then(response => {
        // Handle successful response from the server
        console.log(response.data);
        // Close the form after successfully adding data
        handleCloseForm();
      })
      .catch(error => {
        // Handle errors
        console.error('Error adding service:', error);
      });
  };
  

  //api
  // const handleAddService = () => {
  //   // const serviceIdInput = document.querySelector('#serviceIdInput');
  //   const serviceNameInput = document.querySelector('#serviceNameInput');
  //   const descriptionInput = document.querySelector('#descriptionInput');
  //   const priceInput = document.querySelector('#priceInput');
  
  //   // if (!serviceIdInput) {
  //   //   console.error('Service ID input element not found!');
  //   //   return;
  //   // }
  //   if (!serviceNameInput) {
  //     console.error('Service Name input element not found!');
  //     return;
  //   }
  //   if (!descriptionInput) {
  //     console.error('Description input element not found!');
  //     return;
  //   }
  //   if (!priceInput) {
  //     console.error('Price input element not found!');
  //     return;
  //   }
  
  //   const serviceData = {
  //     // serviceId: serviceIdInput.value,
  //     serviceName: serviceNameInput.value,
  //     description: descriptionInput.value,
  //     price: priceInput.value
  //   };
  
  //   axios.post('http://localhost:4000/api/service/add/', serviceData)
  //     .then(response => {
  //       // Xử lý response từ server (nếu cần)
  //       console.log(response.data);
  //       // Đóng form sau khi thêm dữ liệu thành công
  //       handleCloseForm();
  //     })
  //     .catch(error => {
  //       // Xử lý lỗi (nếu có)
  //       console.error('Error adding service:', error);
  //     });
  // };
  
  
  
  
 

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "black",
        position: "relative",
      }}
    >
      <div
        className="topbar"
        style={{
          width: "95%",
          display: "flex",
          margin: "2%",
          alignItems: "center",
          background: "black",
          padding: "1%",
          borderRadius: 10,
        }}
      >
        <div style={{ alignItems: "center" }}>
          {/* <span className="material-symbols-light--search" style={{ color: "white", marginRight: "5px" }}></span> */}
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "12vw",
              height: "6vh",
              borderRadius: 3,
              border: "1px solid #ccc",
            }}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div
          style={{ flex: 2, textAlign: "center", fontSize: 25, color: "white" }}
        >
          SERVICES
        </div>
        <div
          className="AddService"
          style={{
            color: "#00FFF5",
            fontSize: 20,
            border: "#00FFF5 solid 1px",
            borderRadius: 10,
            alignItems: "center",
            padding: "1%",
            cursor: "pointer",
          }}
          onClick={handleShowAddForm}
        >
          +Add Service
        </div>
      </div>

      {showAddForm && (
       <div className="showAdd" style={{width: "60vw", height: "60vh", position:"absolute"}}>
           <div className="showAdd" style={{width: "60vw", height: "60vh", position:"relative"}}>
       <div className="showAdd-content" style={{width: "43vw", fontFamily: 'Montserrat', fontWeight: '500', height: "70vh", left: 0, top: 0, background: '#2E2E2E', borderRadius: 10}} />
       <button onClick={handleAddService}   style={{width: "15vw",position: 'absolute', height: "8vh", right: 280, top: 476, color: 'white', background:"#00868D", fontSize: 30, borderRadius:10}}>Add</button>
       <button onClick={handleDeleteData} style={{width: "15vw",position: 'absolute', height: "8vh", left: 400, top: 476, color: 'white',background: '#2E2E2E', fontSize: 30,border: '2px #3F3F3F solid', borderRadius:10}}>Delete</button>
       {/* <input type="text" style={{width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: 80, top: 120, color: 'white', fontSize: 20,background: '#111111', borderRadius:10}} placeholder="ServiceID" /> */}
       <input type="text" style={{width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: 80, top: 200, color: 'white', fontSize: 20,background: '#111111', borderRadius:10}} placeholder="Service name" />
       <input type="text" style={{width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: 80, top: 280, color: 'white', fontSize: 20,background: '#111111', borderRadius:10}} placeholder="Description" />
       <input type="text" style={{width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: 80, top: 360, color: 'white', fontSize: 20,background: '#111111', borderRadius:10}} placeholder="Price" />
       <div onClick={handleCloseForm} style={{ width:"0vw", height: "0vh", left: "110%", top: 50, position: 'absolute', color: 'white', fontSize: 25, cursor: 'pointer' }}>X</div>
       {/* <div style={{width: 24, height: 24, right: 0, top: 0, position: 'absolute'}}>
         <div style={{width: 50, height: 50,background: 'red'}}> X </div>
       </div> */}
       <div style={{left: 55, top: 59, position: 'absolute', color: 'white', fontSize: 30, fontFamily: 'Montserrat', fontWeight: '500', wordWrap: 'break-word'}}>Add Service</div>
     </div>
       </div>
    
     

      )}

      <Service_Info />
    </div>
  );
};
