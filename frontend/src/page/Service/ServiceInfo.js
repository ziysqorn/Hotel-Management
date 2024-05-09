import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export const Service_Info = () => {
  
  const [apiData,setApiData] = useState([])
  // const [deleteItem, setDeleteItem] = useState(null);

  const fetchData =async ()=>{
    try {
      const res = await axios.get(`http://localhost:4000/api/service`, {
      });
      let item = res.data
      console.log(res.data.rowsAffected[0]);
      setApiData(res.data.recordset)
    } catch (e) {
      console.log(e);
    } 
  }
  useEffect(()=>{
    fetchData()
    console.log("jsjjsjsj");
  },[])

  const handleDeleteCancel = () => {
    // Ẩn popup xác nhận xóa nếu người dùng hủy
    setShowDeleteConfirmation(false);
  };


  const handleCloseForm = () => {
    setEditFormVisible (false); // Ẩn form khi nhấn nút "Cancel"
  };

  const handleDeleteData = () => {
    // Xóa dữ liệu trên các input ở đây
    const inputs = document.querySelectorAll('.editForm input[type="text"]');
    inputs.forEach(input => {
      input.value = ''; // Xóa giá trị của input
    });
  };

  const handleDeleteConfirm =()=>{

  }
  const handleDeleteClick = ()=>{

  }
  
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editedItem, setEditedItem] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [serviceData, setServiceData] = useState({
    // id:'',
    name: '',
    description: '',
    price:'',
    //Thêm các trường dữ liệu khác ở đây nếu cần
  });
  
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State để hiển thị popup xác nhận xóa
  
  const handleEditClick = () => {
    // Set dữ liệu của item cần chỉnh sửa vào state editedItem
    setEditFormVisible(true);
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
 
  const sendEditedData = async (id,name,des) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/service/edit`,{
        item :{
              ServiceId: serviceData.id,
              Name: serviceData.name,
              Description: serviceData.description,
              Price: serviceData.price,
        }
      }
      
      )
    }catch(error){
      console.log('loi khi sưa dich vu',error)
    }
  }


  return (
    <div
      style={{
        width: "100%",
        height: "95%",
        borderRadius: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#2E2E2E",
      }}
    >
      {/* Popup xác nhận xóa */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
        <p>Bạn có chắc chắn muốn xóa không?</p>
        <button className="button1" onClick={()=>{handleDeleteConfirm()}}>
          Yes
        </button>
        <button className="button2" onClick={handleDeleteCancel}>
          No
        </button>
      </div>
      )}

      {/* Form sửa chữa */}
      {editFormVisible && (
        <div
          className="editForm"
          style={{ width: "60vw", height: "50vh", position: "absolute" }}
        >
          <div
            className="editForm"
            style={{ width: "60vw", height: "50vh", position: "relative" }}
          >
            <div
              className="content"
              style={{
                width: "43vw",
                height: "70vh",
                left: 0,
                top: 0,
                background: "#2E2E2E",
                borderRadius: 10,
              }}
            />
            <button
            onClick={()=>{sendEditedData()}}
              style={{
                width: "15vw",
                position: "absolute",
                height: "8vh",
                right: 280,
                top: 476,
                color: "white",
                background: "#00868D",
                fontSize: 30,
                borderRadius: 10,
              }}
            >
              Edit
            </button>
            <button
            onClick={()=>{handleDeleteData()}}  
              style={{
                width: "15vw",position: 'absolute', height: "8vh", left: 400, top: 476, color: 'white',background: '#2E2E2E', fontSize: 30,border: '2px #3F3F3F solid', borderRadius:10
              }}
            >
              Delete
            </button>
            {/*<input
              type="text"
              value={serviceData.id} onChange={(e)=>handleChange(e, 'id')}
              style={{
                width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: 80, top: 120, color: 'white', fontSize: 20,background: '#111111', borderRadius:10
              }}
              placeholder="ServiceID"
             
            /> */}
            <input
              type="text" 
              value={serviceData.name} onChange={(e)=>handleChange(e, 'name')}
              style={{
                width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: 80, top: 200, color: 'white', fontSize: 20,background: '#111111', borderRadius:10
              }}
              placeholder="Service name"
             
            />
            <input
              type="text"
              value={serviceData.description} onChange={(e)=>handleChange(e, 'description')}
              style={{
                width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: 80, top: 280, color: 'white', fontSize: 20,background: '#111111', borderRadius:10
              }}
              placeholder="Description"
            />
            <input
              type="text"
              value={serviceData.price} onChange={(e)=>handleChange(e, 'price')}
              style={{
                width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: 80, top: 360, color: 'white', fontSize: 20,background: '#111111', borderRadius:10
              }}
              placeholder="Price"
             
            />

            <div
              style={{
                left: 55,
                top: 59,
                position: "absolute",
                color: "white",
                fontSize: 30,
                fontFamily: "Montserrat",
                fontWeight: "500",
                wordWrap: "break-word",
              }}
            >
              Edit Service
            </div>
          </div>
          <div onClick={()=>{handleCloseForm()}} style={{ width:"0vw", height: "0vh", left: "110%", top: 90, position: 'absolute', color: 'white', fontSize: 25, cursor: 'pointer' }}>X</div>
        </div>
      )}
    
 {apiData.length>0?
 apiData.map(function(item,index) {
  return(<div
      key={index}
    className="Row1"
    style={{
      width: 1228,
      height: 76,
      background: "#111111",
      borderRadius: 5,
      marginTop: "1%",
      marginLeft: "10%",
    }}
  >
    <div
      style={{
        width: 51,
        color: "white",
        fontSize: 24,
        alignItems: "center",
        fontWeight: "400",
        padding: "1.5%",
      }}
    >
    {index+1}
    </div>
    <div
      style={{ width: 444, color: "white", fontSize: 24, padding: "1.5%" }}
    >
     {item.Name}
    </div>
    <div style={{ width: 121, color: "white", fontSize: 24 }}>{`${item.Price}`}đ</div>
    <div>
       <FontAwesomeIcon icon={faTrashAlt} className="icon"  onClick={() => handleDeleteClick(item)} />
    </div>
    <div>
      <FontAwesomeIcon icon={faEdit} className="icon"  onClick={() => handleEditClick()} />
    </div>
  </div>)
 }):null}

    </div>
  );
};
