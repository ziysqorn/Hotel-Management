import React from 'react'
import {
  useState,

} from 'react'
import './style.css'
import ContentContainer from './ContentContainer'
import CustomerNumber from './CustomerNumber'
import InHotel, {AllCustomers} from './CustomerInfo'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import AddCustomerIcon from './assets/AddCustomerIconCyan.png'
import RemoveCustomerIcon from './assets/RemoveCustomerIcon.png'
import FilterIcon from './assets/FilterIcon.png'
import SearchIcon from './assets/SearchIcon.png'
import LeftArrowIcon from './assets/LeftArrowIcon.png'
import RightArrowIcon from './assets/RightArrowIcon.png'
import './assets/Montserrat-VariableFont_wght.ttf'


export function CustomersPage(){
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const[showInHotelDetail, setShowInHotelDetail] = useState(false)
  const [showInHotelFilter, setShowInHotelFilter] = useState(false)
  const [showAllCustomerFilt, setShowAllCustomerFilt] = useState(false)
  const [filterItemBG, setFilterItemBG] = useState(['transparent', 'transparent', 'transparent', 'transparent'])
  function HoverOverFilterItem(event){
    var itemID = event.target.id
    const index = parseInt(itemID[itemID.length - 1])
    console.log(index)
    const newBGs = filterItemBG.map(function(item, i){
      if(index === i){
        item = '#707070'
        return item
      }
    })
    setFilterItemBG(newBGs)
  }
  function LeaveFilerItem(event){
    var itemID = event.target.id
    const index = parseInt(itemID[itemID.length - 1])
    console.log(index)
    const newBGs = filterItemBG.map(function(item, i){
      if(index === i){
        item = 'transparent'
        return item
      }
    })
    setFilterItemBG(newBGs)
  }
  function InHotelDetail(){
    setShowInHotelDetail(true)
  }
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: 'space-between'}}>
    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: "100%", height: "22%"}}>
    <ContentContainer containerWidth = {"77%"} containerHeight = {"100%"}>
      <div style={{width: "65%", height: "60%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '2%'}}>
      <CustomerNumber containerWidth={"30%"} containerHeight={"70%"} title={"Total Customer"} data={'3569'}/> 
      <CustomerNumber containerWidth={"30%"} containerHeight={"70%"} title={"In Hotel"} data={'3569'}/> 
      <CustomerNumber containerWidth={"30%"} containerHeight={"70%"} title={"Outside Hotel"} data={'3569'}/> 
      </div>
    </ContentContainer>
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'space-between', width: "22%", height: "90%"}}>
      <div className="buttonContainer" style={{borderColor: "rgb(0, 255, 245)", cursor: 'pointer'}}>
        <div className="buttonTitleContainer">
          <img src={AddCustomerIcon} className="actionIcon"></img>
          <div style={{fontSize: 24, color: "rgb(0, 255, 245)", fontFamily: 'Montserrat', width: "80%", height: "100%", display: "flex", alignItems: 'center', justifyContent: 'center'}} onClick={()=>{setShowAddModal(true)}}>
            Add Customer
          </div>
        </div>
      </div>
      <div className="buttonContainer" style={{borderColor: "red", cursor: 'pointer'}}>
        <div className="buttonTitleContainer" style={{width: "80%"}}>
          <img src={RemoveCustomerIcon} className="actionIcon"></img>
          <div style={{fontSize: 24, color: "red", fontFamily: 'Montserrat', width: "80%", height: "100%", display: "flex", alignItems: 'center', justifyContent: 'center'}} onClick={()=>{setShowDeleteModal(true)}}>
            Remove Customer
          </div>
        </div>
      </div>
    </div>
    </div>
    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: "100%", height: "75%"}}>
    <ContentContainer containerWidth = {"77%"} containerHeight = {"100%"}>
      <div style={{width: '80%', height: '10%', fontSize: 40, color: 'white', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', marginLeft: '2%'}}>
        Customers in Hotel
      </div>
      <div style={{width: '42%', height: '15%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '2%'}}>
          <div style={{backgroundColor: '#111111', width: '65%', height: '55%', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <img src={SearchIcon} style={{width: '10%', height: '50%', margin: '5%'}}></img>
            <input type='text' style={{backgroundColor: '#111111', width: '85%', height: '90%', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Search...'></input>
          </div>
          <div style={{width: '30%', height: '55%', position: 'relative', backgroundColor: '#707070', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '100%', height: '100%', backgroundColor: '#707070', fontSize: 23, color: 'white', fontFamily: 'Montserrat', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={()=>{setShowInHotelFilter(prev=>!prev); setShowAllCustomerFilt(false)}}>
            <div style={{width: '55%', height: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <img src={FilterIcon} style={{width: '30%', height: '70%'}}></img>
            <label>Filter</label>
            </div>
            </div>
            <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', backgroundColor: '#202020', width: '12vw', height: '10vh', top: 65, right: 0, visibility: (showInHotelFilter === true) ? 'visible' : 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '10px', border: '1px solid white'}}>
              <div id='inHotelFilter0' style={{backgroundColor: filterItemBG[0], width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{console.log(e)}} onMouseEnter={(e)=>HoverOverFilterItem(e)} onMouseLeave={(e)=>LeaveFilerItem(e)}>
                &nbsp;&nbsp;&nbsp;By Personal ID
              </div>
              <div id='inHotelFilter1' style={{backgroundColor: filterItemBG[1], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{console.log(e)}} onMouseEnter={(e)=>HoverOverFilterItem(e)} onMouseLeave={(e)=>LeaveFilerItem(e)}>
                &nbsp;&nbsp;&nbsp;By Phone Number
              </div>
              <div id='inHotelFilter2' style={{backgroundColor: filterItemBG[2], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{console.log(e)}} onMouseEnter={(e)=>HoverOverFilterItem(e)} onMouseLeave={(e)=>LeaveFilerItem(e)}>
                &nbsp;&nbsp;&nbsp;By Name
              </div>
              <div id='inHotelFilter3' style={{backgroundColor: filterItemBG[3], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{console.log(e)}} onMouseEnter={(e)=>HoverOverFilterItem(e)} onMouseLeave={(e)=>LeaveFilerItem(e)}>
                &nbsp;&nbsp;&nbsp;By Type
              </div>
            </div>
          </div>
      </div>
      <div style={{width: '90%', height: '65%', display: 'flex', flexDirection: 'column', marginLeft: '2%'}}>
        <InHotel containerWidth={"100%"} containerHeight={"20%"} MarginTop={"0%"} customerInfo={{CustomerName: 'Trần Duy Quân'}} showDetail={InHotelDetail}></InHotel>
        <InHotel containerWidth={"100%"} containerHeight={"20%"} MarginTop={"2%"} customerInfo={{}}></InHotel>
        <InHotel containerWidth={"100%"} containerHeight={"20%"} MarginTop={"2%"} customerInfo={{}}></InHotel>
        <InHotel containerWidth={"100%"} containerHeight={"20%"} MarginTop={"2%"} customerInfo={{}}></InHotel>
        <InHotel containerWidth={"100%"} containerHeight={"20%"} MarginTop={"2%"} customerInfo={{}}></InHotel>
        <InHotel containerWidth={"100%"} containerHeight={"20%"} MarginTop={"2%"} customerInfo={{}}></InHotel>
      </div>
      <div style={{width: '90%', height: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center',  direction: 'rtl', marginLeft: '2%'}}>
        <div style={{width: '20%', height: '70%', display: 'flex', direction: 'ltr', flexDirection: 'row'}}>
          <div style={{width: '20%', height: '100%'}}>
            <img src={LeftArrowIcon} style={{width: '100%', height: '100%'}}></img>
          </div>
          <div style={{ width: '60%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
            1 of 10
          </div>
          <div style={{width: '20%', height: '100%'}}>
          <img src={RightArrowIcon} style={{width: '100%', height: '100%'}}></img>
          </div>
        </div>
      </div>
    </ContentContainer>
    <ContentContainer containerWidth = {"22%"} containerHeight = {"100%"}>
    <div style={{width: '80%', height: '10%', fontSize: 30, color: 'white', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', marginLeft: '7%'}}>
        All Customers 
      </div>
      <div style={{width: '95%', height: '13%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '2%'}}>
          <div style={{backgroundColor: '#111111', width: '65%', height: '65%', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <img src={SearchIcon} style={{width: '15%', height: '50%', margin: '5%'}}></img>
            <input type='text' style={{backgroundColor: '#111111', width: '85%', height: '90%', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', fontSize: 20, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Search...'></input>
          </div>
          <div style={{width: '30%', height: '60%', position: 'relative', backgroundColor: '#707070', fontSize: 20, color: 'white', fontFamily: 'Montserrat', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={()=>{setShowAllCustomerFilt(prev=>!prev); setShowInHotelFilter(false)}}>
            <div style={{width: '70%', height: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <img src={FilterIcon} style={{width: '30%', height: '70%'}}></img>
            <label>Filter</label>
            </div>
            <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', backgroundColor: '#202020', width: '12vw', height: '10vh', top: 65, right: 0, visibility: (showAllCustomerFilt === true) ? 'visible' : 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '10px', border: '1px solid white'}}>
              <div id='allCustomerFilter0' style={{backgroundColor: filterItemBG[0], width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{console.log(e)}} onMouseEnter={(e)=>HoverOverFilterItem(e)} onMouseLeave={(e)=>LeaveFilerItem(e)}>
                &nbsp;&nbsp;&nbsp;By Personal ID
              </div>
              <div id='allCustomerFilter1' style={{backgroundColor: filterItemBG[1], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{console.log(e)}} onMouseEnter={(e)=>HoverOverFilterItem(e)} onMouseLeave={(e)=>LeaveFilerItem(e)}>
                &nbsp;&nbsp;&nbsp;By Phone Number
              </div>
              <div id='allCustomerFilter2' style={{backgroundColor: filterItemBG[2], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{console.log(e)}} onMouseEnter={(e)=>HoverOverFilterItem(e)} onMouseLeave={(e)=>LeaveFilerItem(e)}>
                &nbsp;&nbsp;&nbsp;By Name
              </div>
              <div id='allCustomerFilter3' style={{backgroundColor: filterItemBG[3], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{console.log(e)}} onMouseEnter={(e)=>HoverOverFilterItem(e)} onMouseLeave={(e)=>LeaveFilerItem(e)}>
                &nbsp;&nbsp;&nbsp;By Type
              </div>
            </div>
          </div>
      </div>
      <div style={{width: '90%', height: '70%', display: 'flex', flexDirection: 'column', marginLeft: '5%'}}>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"0%"} customerInfo={{CustomerName: 'Trần Duy Quân'}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
      </div>
      <div style={{width: '95%', height: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center',  direction: 'rtl'}}>
        <div style={{width: '65%', height: '70%', display: 'flex', direction: 'ltr', flexDirection: 'row'}}>
          <div style={{width: '20%', height: '100%'}}>
            <img src={LeftArrowIcon} style={{width: '100%', height: '100%'}}></img>
          </div>
          <div style={{width: '60%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
            1 of 10
          </div>
          <div style={{width: '20%', height: '100%'}}>
          <img src={RightArrowIcon} style={{width: '100%', height: '100%'}}></img>
          </div>
        </div>
      </div>
    </ContentContainer>
    </div>
    <Modal show={showAddModal} centered onHide={()=>{setShowAddModal(false)}} data-bs-theme='dark' size='lg'>
      <Modal.Header className='border-0' closeButton closeVariant='white' style={{backgroundColor: '#2E2E2E', fontSize: 30, fontFamily: 'Montserrat', color: 'white'}}>Add Customer</Modal.Header>
      <Modal.Body style={{backgroundColor: '#2E2E2E', display: 'flex', justifyContent: 'center'}}>
        <div style={{height: '25vh', width: '95%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <div style={{height: '30%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{backgroundColor: '#111111', width: '60%', height: '80%', border: '0px', borderRadius: '10px', direction: 'rtl'}}>
            <input type='text' style={{width: '92%', height: '100%', direction: 'ltr', border: '0px', borderRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Name of Customer'></input>
            </div>
            <div style={{backgroundColor: '#111111', width: '38%', height: '80%', border: '0px', borderRadius: '10px', direction: 'rtl'}}>
            <input type='text' style={{backgroundColor: '#111111', width: '92%', height: '100%', direction: 'ltr', border: '0px', borderRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Personal ID'></input>
            </div>
          </div>
          <div style={{height: '30%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{backgroundColor: '#3E3E3E', height: '80%', width: '25%', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white'}}>
              +84
            </div>
            <div style={{backgroundColor: '#111111', width: '73%', height: '80%', border: '0px', borderRadius: '10px', direction: 'rtl'}}>
            <input type='text' style={{backgroundColor: '#111111', width: '92%', height: '100%', direction: 'ltr', border: '0px', borderRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Contact Number'></input>
            </div>
          </div>
          <div style={{height: '30%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{backgroundColor: '#111111', width: '100%', height: '80%', border: '0px', borderRadius: '10px', direction: 'rtl'}}>
            <input type='text' style={{backgroundColor: '#111111', width: '95%', height: '100%', direction: 'ltr', border: '0px', borderRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Address'></input>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0' style={{backgroundColor: '#2E2E2E'}}>
        <div style={{height: '7vh', width: '100%', display: 'flex', justifyContent: 'center'}}>
          <div style={{height: '100%', width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{backgroundColor: '#00868D', height: '80%', width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px'}}>
              Proceed
            </div>
            <div style={{backgroundColor: 'transparent', height: '80%', width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white', border: '2px solid white', borderRadius: '10px', cursor: 'pointer'}} onClick={()=>{setShowAddModal(false)}}>
              Cancel
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
    <Modal show={showDeleteModal} centered onHide={()=>{setShowDeleteModal(false)}} data-bs-theme='dark' size='md'>
      <Modal.Header className='border-0' closeButton closeVariant='white' style={{backgroundColor: '#2E2E2E', fontSize: 30, fontFamily: 'Montserrat', color: 'white'}}>Remove Customer</Modal.Header>
      <Modal.Body style={{backgroundColor: '#2E2E2E'}}>
        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
          Do you wish to remove this customer from the system ?
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0' style={{backgroundColor: '#2E2E2E'}}>
        <div style={{height: '5vh', width: '100%', display: 'flex', justifyContent: 'center'}}>
          <div style={{height: '100%', width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style={{backgroundColor: '#00868D', height: '100%', width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px'}}>
              Confirm
            </div>
            <div style={{backgroundColor: 'transparent', height: '100%', width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white', border: '2px solid white', borderRadius: '10px'}}>
              Cancel
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
    <Modal show={showInHotelDetail} centered onHide={()=>{setShowInHotelDetail(false)}} dialogClassName='detailModal'>
      <Modal.Header className='border-0' closeButton closeVariant='white' style={{backgroundColor: '#2E2E2E', fontSize: 30, fontFamily: 'Montserrat', color: 'white'}}>Customer Detail</Modal.Header>
      <Modal.Body style={{backgroundColor: '#2E2E2E'}}>
        <div style={{backgroundColor: 'pink', height: '55vh', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div style={{backgroundColor: 'skyblue', height: '100%', width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid white'}}>
            <div style={{backgroundColor: 'skyblue', height: '95%', width: '90%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
              <div style={{backgroundColor: 'pink', height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{backgroundColor: 'blue', height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Customer Name
                </div>
                <div style={{backgroundColor: '#111111', height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: '#111111', width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={'Trần Duy Quân'}>
                  </input>
                </div>
              </div>
              <div style={{backgroundColor: 'pink', height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{backgroundColor: 'blue', height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Customer Type
                </div>
                <div style={{backgroundColor: '#111111', height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: '#111111', width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={'VIP'}>

                  </input>
                </div>
              </div>
              <div style={{backgroundColor: 'pink', height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{backgroundColor: 'blue', height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Personal ID
                </div>
                <div style={{backgroundColor: '#111111', height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: '#111111', width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={'079203025908'}>

                  </input>
                </div>
              </div>
              <div style={{backgroundColor: 'pink', height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{backgroundColor: 'blue', height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Phone number
                </div>
                <div style={{backgroundColor: '#111111', height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: '#111111', width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={'0814371165'}>

                  </input>
                </div>
              </div>
              <div style={{backgroundColor: 'pink', height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{backgroundColor: 'blue', height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Address
                </div>
                <div style={{backgroundColor: '#111111', height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: '#111111', width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={'HAHAHAHAAHA'}>

                  </input>
                </div>
              </div>
              <div style={{backgroundColor: 'pink', height: '10%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{backgroundColor: '#0564ff', height: '100%', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px'}}>
                  Edit
                </div>
                <div style={{backgroundColor: '#00d60b', height: '100%', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px'}}>
                  Save
                </div>
              </div>
            </div>
          </div>
          <div style={{backgroundColor: 'red', height: '100%', width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{backgroundColor: 'skyblue', height: '95%', width: '90%', display: 'flex', flexDirection: 'column'}}>
              <div style={{backgroundColor: 'pink', height: '10%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 30, fontFamily: 'Montserrat', color: 'white'}}>
                Residence History
              </div>
              <div style={{backgroundColor: '#06b000', height: '70%', width: '100%'}}>

              </div>
              <div style={{backgroundColor: '#bf8d02', height: '10%', width: '100%'}}>
                
              </div>
              <div style={{backgroundColor: '#a6b500', height: '10%', width: '100%'}}>
                
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0' style={{backgroundColor: '#2E2E2E'}}>
        <div style={{height: '0.5vh', width: '100%', display: 'flex', justifyContent: 'center'}}>
        </div>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
