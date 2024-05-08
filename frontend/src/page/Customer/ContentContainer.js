import React from 'react'
import "./style.css"

export default function ContentContainer({containerWidth, containerHeight, children}){
  return (
    <div className='contentContainer' style={{width: containerWidth, height: containerHeight}}>
      {children}
    </div>
  )
}
