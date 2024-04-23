import React from 'react'
import './style.css'
import ContentContainer from './ContentContainer'
import CustomerNumber from './CustomerNumber'
import InHotel, {AllCustomers} from './CustomerInfo'
import AddCustomerIcon from './assets/AddCustomerIconCyan.png'
import RemoveCustomerIcon from './assets/RemoveCustomerIcon.png'
import FilterIcon from './assets/FilterIcon.png'
import SearchIcon from './assets/SearchIcon.png'
import LeftArrowIcon from './assets/LeftArrowIcon.png'
import RightArrowIcon from './assets/RightArrowIcon.png'
import './assets/Montserrat-VariableFont_wght.ttf'

export function CustomersPage(){
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
          <div style={{fontSize: 24, color: "rgb(0, 255, 245)", fontFamily: 'Montserrat', width: "80%", height: "100%", display: "flex", alignItems: 'center', justifyContent: 'center'}}>
            Add Customer
          </div>
        </div>
      </div>
      <div className="buttonContainer" style={{borderColor: "red", cursor: 'pointer'}}>
        <div className="buttonTitleContainer" style={{width: "80%"}}>
          <img src={RemoveCustomerIcon} className="actionIcon"></img>
          <div style={{fontSize: 24, color: "red", fontFamily: 'Montserrat', width: "80%", height: "100%", display: "flex", alignItems: 'center', justifyContent: 'center'}}>
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
            <input type='text' style={{backgroundColor: '#111111', width: '85%', height: '90%', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}} placeholder='Search...'></input>
          </div>
          <div style={{width: '30%', height: '55%', backgroundColor: '#707070', fontSize: 23, color: 'white', fontFamily: 'Montserrat', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '55%', height: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <img src={FilterIcon} style={{width: '30%', height: '70%'}}></img>
            <label>Filter</label>
            </div>
          </div>
      </div>
      <div style={{width: '90%', height: '65%', display: 'flex', flexDirection: 'column', marginLeft: '2%'}}>
        <InHotel containerWidth={"100%"} containerHeight={"20%"} MarginTop={"0%"} customerInfo={{CustomerName: 'Trần Duy Quân'}}></InHotel>
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
    <div style={{width: '80%', height: '10%', fontSize: 30, color: 'white', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', marginLeft: '2%'}}>
        All Customers 
      </div>
      <div style={{width: '95%', height: '13%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '2%'}}>
          <div style={{backgroundColor: '#111111', width: '65%', height: '65%', borderRadius: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <img src={SearchIcon} style={{width: '15%', height: '50%', margin: '5%'}}></img>
            <input type='text' style={{backgroundColor: '#111111', width: '85%', height: '90%', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', fontSize: 20, fontFamily: 'Montserrat', color: 'white'}} placeholder='Search...'></input>
          </div>
          <div style={{width: '30%', height: '60%', backgroundColor: '#707070', fontSize: 20, color: 'white', fontFamily: 'Montserrat', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '70%', height: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <img src={FilterIcon} style={{width: '30%', height: '70%'}}></img>
            <label>Filter</label>
            </div>
          </div>
      </div>
      <div style={{width: '90%', height: '70%', display: 'flex', flexDirection: 'column', marginLeft: '2%'}}>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"0%"} customerInfo={{CustomerName: 'Trần Duy Quân'}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
        <AllCustomers containerWidth={"100%"} containerHeight={"12%"} MarginTop={"4%"} customerInfo={{}}></AllCustomers>
      </div>
      <div style={{width: '90%', height: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center',  direction: 'rtl', marginLeft: '2%'}}>
        <div style={{width: '70%', height: '70%', display: 'flex', direction: 'ltr', flexDirection: 'row'}}>
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
    </div>
  )
}
