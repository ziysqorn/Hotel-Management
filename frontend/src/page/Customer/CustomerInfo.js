import React from 'react'
import CustomerIcon from './assets/CustomerIcon.png'
import EyeIcon from './assets/EyeIcon.png'
import FloorIcon from './assets/FloorIcon.png'
import RoomIcon from './assets/RoomIcon.png'
import "./style.css"

export default function InHotel({containerWidth, containerHeight, MarginTop, customerInfo}){
  return (
    <div className='infoContainer' style={{width: containerWidth, height: containerHeight, marginTop: MarginTop}}>
        <div style={{width: '5%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={CustomerIcon} style={{width: '50%', height: '50%'}}></img>
        </div>
        <div style={{width: '30%', height: '100%', fontSize: 20, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
            {customerInfo.CustomerName}
        </div>
        <div style={{width: '30%', height: '100%', fontSize: 20, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
            <img src={FloorIcon} style={{width: '10%', height: '45%'}}></img>
            <label style={{marginLeft: '2%'}}>F{customerInfo.CustomerName}</label>
        </div>
        <div style={{width: '40%', height: '100%', fontSize: 20, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
            <img src={RoomIcon} style={{width: '8%', height: '50%'}}></img>
            <label style={{marginLeft: '2%'}}>Room {customerInfo.CustomerName}</label>
        </div>
        <div style={{width: '5%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={EyeIcon} style={{width: '50%', height: '50%'}}></img>
        </div>
    </div>
  )
}


export function AllCustomers({containerWidth, containerHeight, MarginTop, customerInfo}){
    return(
    <div className='infoContainer' style={{width: containerWidth, height: containerHeight, marginTop: MarginTop}}>
        <div style={{width: '15%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={CustomerIcon} style={{width: '50%', height: '50%'}}></img>
        </div>
        <div style={{width: '70%', height: '100%', fontSize: 20, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
            {customerInfo.CustomerName}
        </div>
        <div style={{width: '15%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src={EyeIcon} style={{width: '50%', height: '50%'}}></img>
        </div>
    </div>
    )
}