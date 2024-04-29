import React from 'react'
import {
    useState
} from 'react'
import CustomerIcon from './assets/CustomerIcon.png'
import EyeIcon from './assets/EyeIcon.png'
import FloorIcon from './assets/FloorIcon.png'
import RoomIcon from './assets/RoomIcon.png'
import "./style.css"

export default function InHotel({containerWidth, containerHeight, BGColor, MarginTop, data, showDetail, selectCustomer}){
  return (
    <div className='infoContainer' style={{backgroundColor: BGColor, width: containerWidth, height: containerHeight, marginTop: MarginTop}} onClick={()=>selectCustomer(data.CustomerId[0])}>
        <div style={{width: '5%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={CustomerIcon} style={{width: '50%', height: '50%'}}></img>
        </div>
        <div style={{width: '30%', height: '100%', fontSize: 20, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
            {data.FullName}
        </div>
        <div style={{width: '30%', height: '100%', fontSize: 20, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
            <img src={FloorIcon} style={{width: '10%', height: '45%'}}></img>
            <label style={{marginLeft: '2%'}}>F{data.RoomId[1]}</label>
        </div>
        <div style={{width: '40%', height: '100%', fontSize: 20, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
            <img src={RoomIcon} style={{width: '8%', height: '50%'}}></img>
            <label style={{marginLeft: '2%'}}>Room {data.RoomId}</label>
        </div>
        <div style={{width: '5%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}} onClick={()=>showDetail(data.CustomerId[0])}>
            <img src={EyeIcon} style={{width: '50%', height: '42%'}}></img>
        </div>
    </div>
  )
}


export function AllCustomers({containerWidth, containerHeight, BGColor, MarginTop, data, showDetail, selectCustomer}){
    return(
    <div className='infoContainer' style={{backgroundColor: BGColor, width: containerWidth, height: containerHeight, marginTop: MarginTop}} onClick={()=>selectCustomer(data.CustomerId)}>
        <div style={{width: '15%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={CustomerIcon} style={{width: '50%', height: '50%'}}></img>
        </div>
        <div style={{width: '70%', height: '100%', fontSize: 20, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
            {data.FullName}
        </div>
        <div style={{width: '15%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}} onClick={()=>showDetail(data.CustomerId)}>
            <img src={EyeIcon} style={{width: '50%', height: '50%'}}></img>
        </div>
    </div>
    )
}


export function ResidenceHistory({containerWidth, containerHeight, MarginTop, data}){
    var checkindate = new Date(data.CheckInDate)
    var checkoutdate = new Date(data.ExpectedCHeckOutDate)
    return(
        <div className='infoContainer' style={{width: containerWidth, height: containerHeight, marginTop: MarginTop}}>
            <div style={{backgroundColor: 'transparent', heigth: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                {data.PayCustomer}
            </div>
            <div style={{backgroundColor: 'transparent', heigth: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                {checkindate.toLocaleString()}
            </div>
            <div style={{backgroundColor: 'transparent', heigth: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                {checkoutdate.toLocaleString()}
            </div>
            <div style={{backgroundColor: 'transparent', heigth: '100%', width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                {data.RoomId}
            </div>
            <div style={{backgroundColor: 'transparent', heigth: '100%', width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                {data.Members}
            </div>
        </div>
    )
}