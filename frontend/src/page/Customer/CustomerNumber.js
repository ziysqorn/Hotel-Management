import React from 'react'
import "./style.css"
import VectorSquare from './assets/VectorSquare.png'

export default function CustomerNumber({title, data, containerWidth, containerHeight}){
    return(
        <div className="customerNumberContainer" style = {{width: containerWidth, height: containerHeight}}>
            <div className="customerNumberTitle">
                <label>{title}</label>
                <img src={VectorSquare} style={{width: '12%', height: '60%', marginLeft: '5%'}}></img>
            </div>
            <div className="customerNumberData">
                {data}
            </div>
        </div>
    )
}