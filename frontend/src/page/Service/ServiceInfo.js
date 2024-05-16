import React, { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export const Service_Info = ({...props}) => {
  
  // const [apiData,setApiData] = useState([])
  // // const [deleteItem, setDeleteItem] = useState(null);


  // const fetchData =async ()=>{
  //   try {
  //     const res = await axios.get(`http://localhost:4000/api/service`, {
  //     });
  //     let item = res.data
  //     console.log(res.data.rowsAffected[0]);
  //     setApiData(res.data.recordset)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  // useEffect(()=>{
  //   fetchData()
  //   console.log("jsjjsjsj");
  // },[])

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
  
  const [editFormVisible, setEditFormVisible] = useState();

  const [editedItem, setEditedItem] = useState({
    id:"",
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    if (fieldName === 'price' && isNaN(value)) {
      return;
    }
    setEditedItem((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleEditClick = (id) => {
    const itemToEdit = props.apiData.find(item => item.id === id);
    if (itemToEdit) {
      setEditedItem(itemToEdit);
      setEditFormVisible(true);
    } else {
      console.log("Không tìm thấy dịch vụ cần sửa");
    }
  };
  const handleDeleteClick = (id) => {
    // Hiện popup xác nhận xóa
    setShowDeleteConfirmation(true);
  };
  
  const handleEditService = async () => {
    console.log({
      ServiceId: editedItem.id,
      Name: editedItem.name,
      Description: editedItem.description,
      Price: editedItem.price,
    });
    try {
      const res = await axios.post(`http://localhost:4000/api/service/edit`, {
        // Dữ liệu cần chỉnh sửa
        item: {
          ServiceId: editedItem.id,
          Name: editedItem.name,
          Description: editedItem.description,
          Price: editedItem.price,
        }
      });
      console.log('Kết quả sau khi chỉnh sửa:', res.data);
      // Cập nhật lại state hoặc thực hiện các hành động khác sau khi chỉnh sửa thành công
      handleCloseForm();
    } catch (error) {
      console.log('Lỗi khi chỉnh sửa dịch vụ:', error);
    }
  };
  
  const [deleteId, setDeleteId] = useState();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State để hiển thị popup xác nhận xóa

  const handleDeleteConfirm = async () => {
    console.log(deleteId);
    try {
      const res = await axios.get(`http://localhost:4000/api/service/delete`,{params:{ServiceId:deleteId}} )
      console.log('Kết quả sau khi xóa:', res.data);
      // Cập nhật lại state hoặc thực hiện các hành động khác sau khi xóa thành công
      fetchData(); // Cập nhật lại dữ liệu sau khi xóa
      setShowDeleteConfirmation(false); // Ẩn popup xác nhận xóa
    } catch (error) {
      console.log('Lỗi khi xóa dịch vụ:', error);
    }
  };

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
        <div className="delete-confirmation" style={{textAlign:"center", fontSize: 30,}}>
                  <p>Bạn có chắc chắn muốn xóa không?</p>
        <button className="button1" style={{
                width: "7vw",
                height: "7vh",
                left: "80%",
                top: "5%",
                background: "green",
                borderRadius: 10,
                fontSize: 20,
              }}onClick={()=>{handleDeleteConfirm()}}>
          Yes
        </button>
        <button className="button2" style={{
                width: "7vw",
                height: "7vh",
                right: "9vh",
                background: "red",
                borderRadius: 10,
                fontSize: 20
              }}
        onClick={()=>{handleDeleteCancel()}}>
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
            onClick={()=>{ handleEditService()}}  
              style={{
                width: "15vw",
                position: "absolute",
                height: "8vh",
                right: "35vh",
                top: "58vh",
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
                width: "15vw",position: 'absolute', height: "8vh", left: "55vh", top: "58vh", color: 'white',background: '#2E2E2E', fontSize: 30,border: '2px #3F3F3F solid', borderRadius:10
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
              value={editedItem.name} onChange={(e)=>handleChange(e, 'name')}
              style={{
                width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: "10vh", top: "18vh", color: 'white', fontSize: 20,background: '#111111', borderRadius:10
              }}
              placeholder="Service name"
             
            />
            <input
              type="text"
              value={editedItem.description} onChange={(e)=>handleChange(e, 'description')}
              style={{
                width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: "10vh", top: "30vh", color: 'white', fontSize: 20,background: '#111111', borderRadius:10
              }}
              placeholder="Description"
            />
            <input
              type="text"
              value={editedItem.price} onChange={(e)=>handleChange(e, 'price')}
              style={{
                width: "36vw", height: "8vh",fontFamily: 'Montserrat', fontWeight: '500',position: 'absolute', left: "10vh", top: "42vh", color: 'white', fontSize: 20,background: '#111111', borderRadius:10
              }}
              placeholder="Price"
             
            />

            <div
              style={{
                left: "8vh",
                top: "7vh",
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
          <div onClick={()=>{handleCloseForm()}} style={{ width:"0vw", height: "0vh", left: "110%", top: "12vh", position: 'absolute', color: 'white', fontSize: 25, cursor: 'pointer' }}>X</div>
        </div>
      )}
    
 {props.apiData.length>0?
 props.apiData.map(function(item,index) {
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
       <FontAwesomeIcon icon={faTrashAlt} className="icon"  onClick={() => {handleDeleteClick(); setDeleteId(item.ServiceId)}} />
    </div>
    <div>
      <FontAwesomeIcon icon={faEdit} className="icon"  onClick={() => {handleEditClick(); setEditedItem({id:item.ServiceId,name:item.Name, description:item.Description, price:item.Price}); }} />
    </div>
  </div>)
 }):null}

    </div>
  );
};
