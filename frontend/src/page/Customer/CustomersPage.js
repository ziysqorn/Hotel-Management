import React from 'react'
import {
  useState,
  useEffect,
  useRef
} from 'react'
import './style.css'
import ContentContainer from './ContentContainer'
import CustomerNumber from './CustomerNumber'
import InHotel, {AllCustomers, ResidenceHistory} from './CustomerInfo'
import Modal from 'react-bootstrap/Modal'
import AddCustomerIcon from './assets/AddCustomerIconCyan.png'
import RemoveCustomerIcon from './assets/RemoveCustomerIcon.png'
import FilterIcon from './assets/FilterIcon.png'
import SearchIcon from './assets/SearchIcon.png'
import LeftArrowIcon from './assets/LeftArrowIcon.png'
import RightArrowIcon from './assets/RightArrowIcon.png'
import './assets/Montserrat-VariableFont_wght.ttf'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';

const apiURL = 'http://localhost:4000/api'


export function CustomersPage(){
  // use context 
  


  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const[showInHotelDetail, setShowInHotelDetail] = useState(false)
  const [showInHotelFilter, setShowInHotelFilter] = useState(false)
  const [showAllCustomerFilt, setShowAllCustomerFilt] = useState(false)
  const [showAlert, setshowAlert] = useState({show: false, message: ''})
  const [disableEdit, setDisableEdit] = useState(true)
  const [filterItemBG, setFilterItemBG] = useState(['transparent', 'transparent', 'transparent', 'transparent'])
  const [allCustomerFilterBG, setAllCustomerFilterBG] = useState(['transparent', 'transparent', 'transparent', 'transparent'])
  const [inputEnableBG, setInputEnableBG] = useState('#5c5c5c')
  const [selectedCustomer, setSelectedCustomer] = useState(-1)
  const [numberOfCustomer, setNumberOfCustomer] = useState('') 
  const [numberInHotel, setNumberInHotel] = useState('')
  const [numberOutsideHotel, setNumberOutsideHotel] = useState('')
  const [customerInHotel, setCustomerInHotel] = useState([])
  const [customerToAdd, setCustomerToAdd] = useState({FullName: '', PersonalId: '', Phone: '', Address: '', Type: 3})
  const [inHotelToSearch, setInHotelToSearch] = useState('')
  const [allCustomerToSearch, setAllCustomerToSearch] = useState('')
  const [allCustomers, setAllCustomers] = useState([])
  const [customerDetail, setCustomerDetail] = useState({CustomerId: 0, FullName: '', PersonalId: '', Phone: '', Address: '', Type: ''})
  const [residenceHistory, setResidenceHistory] = useState([])
  const [inHotelPage, setInHotelPage] = useState(1)
  const [allCustomerPage, setAllCustomerPage] = useState(1)
  const [residenceHistoryPage, setResidenceHistoryPage] = useState(1)
  const [totalSpent, setTotalSpent] = useState('')
  const [reloadPage, setReloadPage] = useState(false)
  const [inHotelFilter, setInHotelFilter] = useState(-1)
  const [allCustomerFilter, setAllCustomerFilter] = useState(-1)
  var customerType = ''
  const allCustomerPrevButton = useRef('visible')
  const allCustomerNextButton = useRef('visible')
  const inHotelPrevButton = useRef('visible')
  const inHotelNextButton = useRef('visible')
  const residenceHistoryPrevButton = useRef('visible')
  const residenceHistoryNextButton = useRef('visible')
  var inHotelMaxPage = (Math.ceil(customerInHotel.length / 6) === 0) ? 1 : Math.ceil(customerInHotel.length / 6)
  var allCustomerMaxPage = (Math.ceil(allCustomers.length / 7) === 0) ? 1 : Math.ceil(allCustomers.length / 7)
  var residenceHistoryMaxPage = (Math.ceil(residenceHistory.length / 7) === 0) ? 1 : Math.ceil(residenceHistory.length / 7)
  allCustomerPrevButton.current = 'visible'
  allCustomerNextButton.current = 'visible'
  inHotelPrevButton.current = 'visible'
  inHotelNextButton.current = 'visible'
  residenceHistoryPrevButton.current = 'visible'
    residenceHistoryNextButton.current = 'visible'
  if(allCustomerPage === 1) allCustomerPrevButton.current = 'hidden'
  if(allCustomerPage === allCustomerMaxPage) allCustomerNextButton.current = 'hidden'
  if(allCustomerPage !== 1 && allCustomerPage !== allCustomerMaxPage){
    allCustomerPrevButton.current = 'visible'
    allCustomerNextButton.current = 'visible'
  }
  if(inHotelPage === 1) inHotelPrevButton.current = 'hidden'
  if(inHotelPage === inHotelMaxPage) inHotelNextButton.current = 'hidden'
  if(inHotelPage !== 1 && inHotelPage !== inHotelMaxPage){
    inHotelPrevButton.current = 'visible'
    inHotelNextButton.current = 'visible'
  }
  if(residenceHistoryPage === 1) residenceHistoryPrevButton.current = 'hidden'
  if(residenceHistoryPage === residenceHistoryMaxPage) residenceHistoryNextButton.current = 'hidden'
  if(residenceHistoryPage !== 1 && residenceHistoryPage !== residenceHistoryMaxPage){
    residenceHistoryPrevButton.current = 'visible'
    residenceHistoryNextButton.current = 'visible'
  }

  function nextAllCustomerClick(){
    sessionStorage.setItem('allCustomerPage', allCustomerPage + 1)
    setAllCustomerPage(prev=>prev+1)
  }
  function prevAllCustomerClick(){
    sessionStorage.setItem('allCustomerPage', allCustomerPage - 1)
    setAllCustomerPage(prev=>prev-1)
  }
  function inHotelPrevClick(){
    sessionStorage.setItem('inHotelPage', inHotelPage - 1)
    setInHotelPage(prev=>prev-1)
  }
  function inHotelNextClick(){
    sessionStorage.setItem('inHotelPage', inHotelPage + 1)
    setInHotelPage(prev=>prev+1)
  }
  function residenceHistoryPrevClick(){
    setResidenceHistoryPage(prev=>prev-1)
  }
  function residenceHistoryNextClick(){
    setResidenceHistoryPage(prev=>prev+1)
  }
  function CustomerClick(CustomerId){
    setSelectedCustomer(prev=>prev===CustomerId ? -1 : CustomerId)
    console.log("handleChooseCustomer")
  }
  function RemoveClick(){
    if(selectedCustomer === -1){
      setshowAlert({show: true, message: 'Bạn chưa chọn khách hàng để xóa !'})
      return
    }
    setShowDeleteModal(true)
  }
  function InHotelFilterClick(event){
    var filterId = event.target.id
    const newFilterBG = filterItemBG.map((item, index)=>{
      if(index === parseInt(filterId[filterId.length - 1])){
        if(index === inHotelFilter){
          item = 'transparent'
          setInHotelFilter(-1)
          sessionStorage.setItem('inHotelFilter', -1)
          return item
        }
        item = '#5c5c5c'
        setInHotelFilter(parseInt(filterId[filterId.length - 1]))
        sessionStorage.setItem('inHotelFilter', filterId[filterId.length - 1])
        return item
      }
    })
    setFilterItemBG(newFilterBG)
  }
  function AllCustomerFilterClick(event){
    var filterId = event.target.id
    const newFilterBG = allCustomerFilterBG.map((item, index)=>{
      if(index === parseInt(filterId[filterId.length - 1])){
        if(index === allCustomerFilter){
          item = 'transparent'
          setAllCustomerFilter(-1)
          sessionStorage.setItem('allCustomerFilter', -1)
          return item
        }
        item = '#5c5c5c'
        setAllCustomerFilter(parseInt(filterId[filterId.length - 1]))
        sessionStorage.setItem('allCustomerFilter', filterId[filterId.length - 1])
        return item
      }
    })
    setAllCustomerFilterBG(newFilterBG)
  }
  function InHotelDetail(CustomerId){
    axios.get(apiURL + '/customer/get/byId', {params: {customerId: CustomerId}})
    .then(function(res){
      var customer = res.data[0]
      switch(customer.Type){
        case 1:
          customerType = 'VIP'
          break
        case 2:
          customerType = 'Premium'
          break
        case 3:
          customerType = 'Normal'
          break
      }
      setCustomerDetail({...customer, Type: customerType})
      //FullName: customer.FullName, Type: customerType, PersonalId: customer.PersonalId, Phone: customer.Phone, Address: customer.Address
      setShowInHotelDetail(true)
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response.data})
    })

    axios.get(apiURL + '/customer/get/residenceHistory', {params: {customerId: CustomerId}})
    .then(function(res){
      setResidenceHistory(res.data)
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response.data})
    })

    axios.get(apiURL + '/customer/get/totalSpent', {params: {customerId: CustomerId}})
    .then(function(res){
      var vnd = new Intl.NumberFormat('en-DE')
      setTotalSpent(vnd.format(res.data.TotalSpent))
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response.data})
    })
  }

  function AddCustomer(){
    axios.post(apiURL + '/customer/create', customerToAdd)
    .then(function(res){
      setshowAlert({show: true, message: res.data.message})
      setShowAddModal(false)
      setReloadPage(prev=>!prev)
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response.data})})
  }

  function UpdateCustomer(){
    if(disableEdit === true){
      setshowAlert({show: true, message: 'Hãy nhấn vào nút Edit và chỉnh sửa thông tin trước khi thực hiện thao tác này!'})
      return
    }

    axios.post(apiURL + '/customer/update', customerDetail, {params: {customerId: customerDetail.CustomerId}})
    .then(function(res){
      setshowAlert({show: true, message: res.data.message})
      setShowInHotelDetail(false)
      setReloadPage(prev=>!prev)
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response.data})
    })
  }

  function RemoveCustomer(){
    axios.post(apiURL + '/customer/delete', null, {params: {customerId: selectedCustomer}})
    .then(function(res){
      setshowAlert({show: true, message: res.data.message})
      setShowDeleteModal(false)
      setReloadPage(prev=>!prev)
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response.data})
    })
  }

  function inHotelSearch(){
    switch(inHotelFilter){
      case 0:
        axios.get(apiURL + '/customer/get/currentInHotel/byPersonalId', {params: {personalId: inHotelToSearch}})
        .then(function(res){
          setCustomerInHotel(res.data)
          sessionStorage.setItem('inHotelPage', 1)
          setInHotelPage(parseInt(sessionStorage.getItem('inHotelPage')))
        })
        .catch(function(err){
          setshowAlert({show: true, message: err.response.data})
        })
        break
      case 1:
        axios.get(apiURL + '/customer/get/currentInHotel/byPhoneNumber', {params: {phoneNumber: inHotelToSearch}})
        .then(function(res){
          setCustomerInHotel(res.data)
          sessionStorage.setItem('inHotelPage', 1)
          setInHotelPage(parseInt(sessionStorage.getItem('inHotelPage')))
        })
        .catch(function(err){
          setshowAlert({show: true, message: err.response.data})
        })
        break
      case 2:
        axios.get(apiURL + '/customer/get/currentInHotel/byName', {params: {customerName: inHotelToSearch}})
        .then(function(res){
          setCustomerInHotel(res.data)
          sessionStorage.setItem('inHotelPage', 1)
          setInHotelPage(parseInt(sessionStorage.getItem('inHotelPage')))
        })
        .catch(function(err){
          setshowAlert({show: true, message: err.response.data})
        })
        break
      case 3:
        axios.get(apiURL + '/customer/get/currentInHotel/byType', {params: {customerType: inHotelToSearch}})
        .then(function(res){
          setCustomerInHotel(res.data)
          sessionStorage.setItem('inHotelPage', 1)
          setInHotelPage(parseInt(sessionStorage.getItem('inHotelPage')))
        })
        .catch(function(err){
          setshowAlert({show: true, message: err.response.data})
        })
        break
      default:
        axios.get(apiURL + '/customer/get/currentInHotel')
        .then(function(res){
          setCustomerInHotel(res.data)
          sessionStorage.setItem('inHotelPage', 1)
          setInHotelPage(parseInt(sessionStorage.getItem('inHotelPage')))
        })
        .catch(function(err){
        setshowAlert({show: true, message: err.response.data})
        })
        break
    }
  }

  function allCustomerSearch(){
    switch(allCustomerFilter){
      case 0:
        axios.get(apiURL + '/customer/get/byPersonalId', {params: {personalId: allCustomerToSearch}})
        .then(function(res){
          setAllCustomers(res.data)
          sessionStorage.setItem('allCustomerPage', 1)
          setAllCustomerPage(parseInt(sessionStorage.getItem('allCustomerPage')))
        })
        .catch(function(err){
          setshowAlert({show: true, message: err.response.data})
        })
        break
      case 1:
        axios.get(apiURL + '/customer/get/byPhoneNumber', {params: {phoneNumber: allCustomerToSearch}})
        .then(function(res){
          setAllCustomers(res.data)
          sessionStorage.setItem('allCustomerPage', 1)
          setAllCustomerPage(parseInt(sessionStorage.getItem('allCustomerPage')))
        })
        .catch(function(err){
          setshowAlert({show: true, message: err.response.data})
        })
        break
      case 2:
        axios.get(apiURL + '/customer/get/byName', {params: {customerName: allCustomerToSearch}})
        .then(function(res){
          setAllCustomers(res.data)
          sessionStorage.setItem('allCustomerPage', 1)
          setAllCustomerPage(parseInt(sessionStorage.getItem('allCustomerPage')))
        })
        .catch(function(err){
          setshowAlert({show: true, message: err.response.data})
        })
        break
      case 3:
        axios.get(apiURL + '/customer/get/byType', {params: {customerType: allCustomerToSearch}})
        .then(function(res){
          setAllCustomers(res.data)
          sessionStorage.setItem('allCustomerPage', 1)
          setAllCustomerPage(parseInt(sessionStorage.getItem('allCustomerPage')))
        })
        .catch(function(err){
          setshowAlert({show: true, message: err.response.data})
        })
        break
      default:
        axios.get(apiURL + '/customer/get/all')
        .then(function(res){
          setAllCustomers(res.data)
          sessionStorage.setItem('allCustomerPage', 1)
          setAllCustomerPage(parseInt(sessionStorage.getItem('allCustomerPage')))
        })
        .catch(function(err){
        setshowAlert({show: true, message: err.response.data})
        })
        break
    }
  }
  useEffect(()=>{
    axios.get(apiURL + '/customer/get/number')
    .then(function(res){
    setNumberOfCustomer(res.data[0].result)
    }) 
    .catch(function(err){
      setshowAlert({show: true, message: err.response?.data})
    })

    axios.get(apiURL + '/customer/get/number/inHotel')
    .then(function(res){
    setNumberInHotel(res.data[0].result)
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response?.data})
      console.log(err);
    })

    axios.get(apiURL + '/customer/get/number/outsideHotel')
    .then(function(res){
    setNumberOutsideHotel(res.data[0].result)
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response?.data})
      console.log(err);
    })

    axios.get(apiURL + '/customer/get/currentInHotel')
    .then(function(res){
      
      setCustomerInHotel(res.data)
    })
    .catch(function(err){
      console.log(err);
      setshowAlert({show: true, message: err.response?.data})
    })
    axios.get(apiURL + '/customer/get/all')
    .then(function(res){
      setAllCustomers(res.data)
    })
    .catch(function(err){
      setshowAlert({show: true, message: err.response?.data})
    })

    if(sessionStorage.getItem('allCustomerPage')){
      setAllCustomerPage(parseInt(sessionStorage.getItem('allCustomerPage')))
    }
    else{
      sessionStorage.setItem('allCustomerPage', 1)
      setAllCustomerPage(parseInt(sessionStorage.getItem('allCustomerPage')))
    }

    if(sessionStorage.getItem('inHotelPage')){
      setInHotelPage(parseInt(sessionStorage.getItem('inHotelPage')))
    }
    else{
      sessionStorage.setItem('inHotelPage', 1)
      setInHotelPage(parseInt(sessionStorage.getItem('inHotelPage')))
    }

    if(sessionStorage.getItem('inHotelFilter')){
      var filter = parseInt(sessionStorage.getItem('inHotelFilter'))
      const newFilterBG = filterItemBG.map((item, index)=>{
        if(index === filter){
          item = '#5c5c5c'
          return item
        }
      })
      setFilterItemBG(newFilterBG)
      setInHotelFilter(filter)
    }
    else{
      sessionStorage.setItem('inHotelFilter', -1)
      setInHotelFilter(parseInt(sessionStorage.getItem('inHotelFilter')))
    }

    if(sessionStorage.getItem('allCustomerFilter')){
      var filter = parseInt(sessionStorage.getItem('allCustomerFilter'))
      const newFilterBG = allCustomerFilterBG.map((item, index)=>{
        if(index === filter){
          item = '#5c5c5c'
          return item
        }
      })
      setAllCustomerFilterBG(newFilterBG)
      setAllCustomerFilter(filter)
    }
    else{
      sessionStorage.setItem('allCustomerFilter', -1)
      setAllCustomerFilter(parseInt(sessionStorage.getItem('allCustomerFilter')))
    }

  }, [reloadPage])
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: 'space-between'}}>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: 'space-between', width: "100%", height: "22%"}}>
    <ContentContainer containerWidth = {"77%"} containerHeight = {"100%"}>
      <div style={{width: "65%", height: "60%", display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: '2%'}}>
      <CustomerNumber containerWidth={"30%"} containerHeight={"70%"} title={"Total Customer"} data={numberOfCustomer}/> 
      <CustomerNumber containerWidth={"30%"} containerHeight={"70%"} title={"In Hotel"} data={numberInHotel}/> 
      <CustomerNumber containerWidth={"30%"} containerHeight={"70%"} title={"Outside Hotel"} data={numberOutsideHotel}/> 
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
          <div style={{fontSize: 24, color: "red", fontFamily: 'Montserrat', width: "80%", height: "100%", display: "flex", alignItems: 'center', justifyContent: 'center'}} onClick={RemoveClick}>
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
            <div style={{width: '15%', height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={inHotelSearch}>
              <img src={SearchIcon} style={{width: '60%', height: '70%'}}></img>
            </div>
            <input type='text' style={{backgroundColor: '#111111', width: '85%', height: '90%', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Search...' value={inHotelToSearch} onChange={(e)=>setInHotelToSearch(e.target.value)}></input>
          </div>
          <div style={{width: '30%', height: '55%', position: 'relative', backgroundColor: '#707070', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '100%', height: '100%', backgroundColor: '#707070', fontSize: 23, color: 'white', fontFamily: 'Montserrat', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={()=>{setShowInHotelFilter(prev=>!prev); setShowAllCustomerFilt(false)}}>
            <div style={{width: '55%', height: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <img src={FilterIcon} style={{width: '30%', height: '70%'}}></img>
            <label>Filter</label>
            </div>
            </div>
            <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', backgroundColor: '#202020', width: '12vw', height: '10vh', top: 65, right: 0, visibility: (showInHotelFilter === true) ? 'visible' : 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '10px', border: '1px solid white'}}>
              <div id='inHotelFilter0' style={{backgroundColor: filterItemBG[0], width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{InHotelFilterClick(e)}}>
                &nbsp;&nbsp;&nbsp;By Personal ID
              </div>
              <div id='inHotelFilter1' style={{backgroundColor: filterItemBG[1], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{InHotelFilterClick(e)}}>
                &nbsp;&nbsp;&nbsp;By Phone Number
              </div>
              <div id='inHotelFilter2' style={{backgroundColor: filterItemBG[2], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{InHotelFilterClick(e)}}>
                &nbsp;&nbsp;&nbsp;By Name
              </div>
              <div id='inHotelFilter3' style={{backgroundColor: filterItemBG[3], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>{InHotelFilterClick(e)}}>
                &nbsp;&nbsp;&nbsp;By Type
              </div>
            </div>
          </div>
      </div>
      <div style={{width: '90%', height: '65%', display: 'flex', flexDirection: 'column', marginLeft: '2%'}}>
        {customerInHotel.length>0?customerInHotel.map((customer, index)=>{
          if(index >= (inHotelPage - 1) * 6 && index < inHotelPage*6){
            var BackgroundColor = ''
            if(parseInt(customer.CustomerId) === selectedCustomer) BackgroundColor = '#5c5c5c'
            else BackgroundColor = 'black'
            if(index === ((inHotelPage - 1) * 6)){
              return <InHotel key={index} containerWidth={"100%"} containerHeight={"15%"} BGColor={BackgroundColor} MarginTop={"0%"} data={customer} showDetail={InHotelDetail} selectCustomer={CustomerClick}></InHotel>
            } 
            return <InHotel key={index} containerWidth={"100%"} containerHeight={"15%"} BGColor={BackgroundColor} MarginTop={"1%"} data={customer} showDetail={InHotelDetail} selectCustomer={CustomerClick}></InHotel>
          }
        }):null}
      </div>
      <div style={{width: '90%', height: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center',  direction: 'rtl', marginLeft: '2%'}}>
        <div style={{width: '20%', height: '70%', display: 'flex', direction: 'ltr', flexDirection: 'row'}}>
          <div style={{width: '20%', height: '100%', cursor: 'pointer', visibility: inHotelPrevButton.current}} onClick={inHotelPrevClick}>
            <img src={LeftArrowIcon} style={{width: '100%', height: '100%'}}></img>
          </div>
          <div style={{ width: '60%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
          {inHotelPage} of {inHotelMaxPage}
          </div>
          <div style={{width: '20%', height: '100%', cursor: 'pointer', visibility: inHotelNextButton.current}} onClick={inHotelNextClick}>
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
            <div style={{width: '25%', height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={allCustomerSearch}>
              <img src={SearchIcon} style={{width: '60%', height: '70%'}}></img>
            </div>
            <input type='text' style={{backgroundColor: '#111111', width: '75%', height: '90%', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', fontSize: 20, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Search...' value={allCustomerToSearch} onChange={(e)=>setAllCustomerToSearch(e.target.value)}></input>
          </div>
          <div style={{width: '30%', height: '60%', position: 'relative', backgroundColor: '#707070', fontSize: 20, color: 'white', fontFamily: 'Montserrat', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '70%', height: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} onClick={()=>{setShowAllCustomerFilt(prev=>!prev); setShowInHotelFilter(false)}}>
            <img src={FilterIcon} style={{width: '30%', height: '70%'}}></img>
            <label>Filter</label>
            </div>
            <div style={{position: 'absolute', display: 'flex', justifyContent: 'center', backgroundColor: '#202020', width: '12vw', height: '10vh', top: 65, right: 0, visibility: (showAllCustomerFilt === true) ? 'visible' : 'hidden', display: 'flex', flexDirection: 'column', borderRadius: '10px', border: '1px solid white'}}>
              <div id='allCustomerFilter0' style={{backgroundColor: allCustomerFilterBG[0], width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>AllCustomerFilterClick(e)}>
                &nbsp;&nbsp;&nbsp;By Personal ID
              </div>
              <div id='allCustomerFilter1' style={{backgroundColor: allCustomerFilterBG[1], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>AllCustomerFilterClick(e)}>
                &nbsp;&nbsp;&nbsp;By Phone Number
              </div>
              <div id='allCustomerFilter2' style={{backgroundColor: allCustomerFilterBG[2], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>AllCustomerFilterClick(e)}>
                &nbsp;&nbsp;&nbsp;By Name
              </div>
              <div id='allCustomerFilter3' style={{backgroundColor: allCustomerFilterBG[3], fontSize: 23, fontFamily: 'Montserrat', color: 'white', cursor: 'pointer'}} onClick={(e)=>AllCustomerFilterClick(e)}>
                &nbsp;&nbsp;&nbsp;By Type
              </div>
            </div>
          </div>
      </div>
      <div style={{width: '90%', height: '70%', display: 'flex', flexDirection: 'column', marginLeft: '5%'}}>
        {allCustomers.length>0 ?allCustomers.map((customer, index)=>{
          if(index >= (allCustomerPage - 1) * 7 && index < allCustomerPage*7){
            var BackgroundColor = ''
            if(parseInt(customer.CustomerId) === selectedCustomer) BackgroundColor = '#5c5c5c'
            else BackgroundColor = 'black'
            if(index === ((allCustomerPage - 1) * 7)){
              return <AllCustomers key={index} containerWidth={"100%"} containerHeight={"12%"} BGColor={BackgroundColor} MarginTop={"0%"} data={customer} showDetail={InHotelDetail} selectCustomer={CustomerClick}></AllCustomers>
            }
            return <AllCustomers key={index} containerWidth={"100%"} containerHeight={"12%"} BGColor={BackgroundColor} MarginTop={"3%"} data={customer} showDetail={InHotelDetail} selectCustomer={CustomerClick}></AllCustomers>
          }
        }):null}
      </div>
      <div style={{width: '95%', height: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center',  direction: 'rtl'}}>
        <div style={{width: '65%', height: '70%', display: 'flex', direction: 'ltr', flexDirection: 'row'}}>
          <div style={{width: '20%', height: '100%', cursor: 'pointer', visibility: allCustomerPrevButton.current}} onClick={prevAllCustomerClick}>
            <img src={LeftArrowIcon} style={{width: '100%', height: '100%'}}></img>
          </div>
          <div style={{width: '60%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
            {allCustomerPage} of {allCustomerMaxPage}
          </div>
          <div style={{width: '20%', height: '100%', cursor: 'pointer', visibility: allCustomerNextButton.current}} onClick={nextAllCustomerClick}>
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
            <input type='text' style={{width: '92%', height: '100%', direction: 'ltr', border: '0px', borderRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Name of Customer' value={customerToAdd.FullName} onChange={(e)=>{setCustomerToAdd(prev=>({...prev, FullName: e.target.value}))}}></input>
            </div>
            <div style={{backgroundColor: '#111111', width: '38%', height: '80%', border: '0px', borderRadius: '10px', direction: 'rtl'}}>
            <input type='text' style={{backgroundColor: '#111111', width: '92%', height: '100%', direction: 'ltr', border: '0px', borderRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Personal ID' value={customerToAdd.PersonalId} onChange={(e)=>{setCustomerToAdd(prev=>({...prev, PersonalId: e.target.value}))}}></input>
            </div>
          </div>
          <div style={{height: '30%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{backgroundColor: '#3E3E3E', height: '80%', width: '25%', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white'}}>
              +84
            </div>
            <div style={{backgroundColor: '#111111', width: '73%', height: '80%', border: '0px', borderRadius: '10px', direction: 'rtl'}}>
            <input type='text' style={{backgroundColor: '#111111', width: '92%', height: '100%', direction: 'ltr', border: '0px', borderRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Contact Number' value={customerToAdd.Phone} onChange={(e)=>{setCustomerToAdd(prev=>({...prev, Phone: e.target.value}))}}></input>
            </div>
          </div>
          <div style={{height: '30%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{backgroundColor: '#111111', width: '100%', height: '80%', border: '0px', borderRadius: '10px', direction: 'rtl'}}>
            <input type='text' style={{backgroundColor: '#111111', width: '95%', height: '100%', direction: 'ltr', border: '0px', borderRadius: '10px', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none'}} placeholder='Address' value={customerToAdd.Address} onChange={(e)=>{setCustomerToAdd(prev=>({...prev, Address: e.target.value}))}}></input>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0' style={{backgroundColor: '#2E2E2E'}}>
        <div style={{height: '7vh', width: '100%', display: 'flex', justifyContent: 'center'}}>
          <div style={{height: '100%', width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{backgroundColor: '#00868D', height: '80%', width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px', cursor: 'pointer'}} onClick={AddCustomer}>
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
          Bạn có chắc muốn xóa khách hàng này khỏi hệ thống ?
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0' style={{backgroundColor: '#2E2E2E'}}>
        <div style={{height: '5vh', width: '100%', display: 'flex', justifyContent: 'center'}}>
          <div style={{height: '100%', width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style={{backgroundColor: '#00868D', height: '100%', width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px', cursor: 'pointer'}} onClick={RemoveCustomer}>
              Confirm
            </div>
            <div style={{backgroundColor: 'transparent', height: '100%', width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white', border: '2px solid white', borderRadius: '10px', cursor: 'pointer'}} onClick={()=>setShowDeleteModal(false)}>
              Cancel
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
    <Modal onShow={()=>{setDisableEdit(true); setInputEnableBG('#5c5c5c')}} show={showInHotelDetail} centered onHide={()=>{setShowInHotelDetail(false)}} dialogClassName='detailModal'>
      <Modal.Header className='border-0' closeButton closeVariant='white' style={{backgroundColor: '#2E2E2E', fontSize: 30, fontFamily: 'Montserrat', color: 'white'}}>Customer Detail</Modal.Header>
      <Modal.Body style={{backgroundColor: '#2E2E2E'}}>
        <div style={{height: '55vh', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <div style={{height: '100%', width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid white'}}>
            <div style={{height: '95%', width: '90%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
              <div style={{height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Customer Name
                </div>
                <div style={{backgroundColor: inputEnableBG, height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: inputEnableBG, width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={customerDetail.FullName} onChange={(e)=>{setCustomerDetail(prev=>({...prev, FullName: e.target.value}))}} disabled={disableEdit}>
                  </input>
                </div>
              </div>
              <div style={{height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Customer Type
                </div>
                <div style={{backgroundColor: inputEnableBG, height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: inputEnableBG, width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={customerDetail.Type} onChange={(e)=>{setCustomerDetail(prev=>({...prev, Type: e.target.value}))}} disabled={disableEdit}>

                  </input>
                </div>
              </div>
              <div style={{height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Personal ID
                </div>
                <div style={{backgroundColor: inputEnableBG, height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: inputEnableBG, width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={customerDetail.PersonalId} onChange={(e)=>{setCustomerDetail(prev=>({...prev, PersonalId: e.target.value}))}} disabled={disableEdit}>

                  </input>
                </div>
              </div>
              <div style={{height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Phone number
                </div>
                <div style={{backgroundColor: inputEnableBG, height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: inputEnableBG, width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={customerDetail.Phone} onChange={(e)=>{setCustomerDetail(prev=>({...prev, Phone: e.target.value}))}}  disabled={disableEdit}>

                  </input>
                </div>
              </div>
              <div style={{height: '15%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{height: '45%', width: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', display: 'flex', alignItems: 'center'}}>
                  Address
                </div>
                <div style={{backgroundColor: inputEnableBG, height: '55%', width: '100%', direction: 'rtl', borderRadius: '10px'}}>
                  <input style={{backgroundColor: inputEnableBG, width: '95%', height: '100%', fontSize: 23, fontFamily: 'Montserrat', color: 'white', outline: 'none', direction: 'ltr', border: '0px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} value={customerDetail.Address} onChange={(e)=>{setCustomerDetail(prev=>({...prev, Address: e.target.value}))}} disabled={disableEdit}>

                  </input>
                </div>
              </div>
              <div style={{height: '10%', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{backgroundColor: '#0564ff', height: '100%', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px', cursor: 'pointer'}} onClick={()=>{setDisableEdit(prev=>!prev); setInputEnableBG(prev=>(prev==='black') ? '#5c5c5c' : 'black')}}>
                  Edit
                </div>
                <div style={{backgroundColor: '#00d60b', height: '100%', width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px', cursor: 'pointer'}} onClick={UpdateCustomer}>
                  Save
                </div>
              </div>
            </div>
          </div>
          <div style={{height: '100%', width: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{height: '95%', width: '95%', display: 'flex', flexDirection: 'column'}}>
              <div style={{height: '10%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 30, fontFamily: 'Montserrat', color: 'white'}}>
                Residence History
              </div>
              <div style={{height: '70%', width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{height: '12%', width: '100%', display: 'flex', flexDirection: 'row'}}>
                  <div style={{height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                    Pay Customer
                  </div>
                  <div style={{height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                    Check in date
                  </div>
                  <div style={{heigth: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                    Check out date
                  </div>
                  <div style={{height: '100%', width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                    Room
                  </div>
                  <div style={{heigth: '100%', width: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                    Members
                  </div>
                </div>
                <div style={{height: '88%', width: '100%', display: 'flex', flexDirection: 'column'}}>
                  {residenceHistory.length>0?residenceHistory.map((item, index)=>{
                    if(index >= (residenceHistoryPage - 1) * 7 && index < residenceHistoryPage*7){
                      if(index === ((residenceHistoryPage - 1) * 7)){
                        return <ResidenceHistory key={index} containerWidth={'100%'} containerHeight={'12%'} MarginTop={'0%'} data={item}></ResidenceHistory>
                      }
                      return <ResidenceHistory key={index} containerWidth={'100%'} containerHeight={'12%'} MarginTop={'1%'} data={item}></ResidenceHistory>
                    }
                  }):null}
                </div>
              </div>
              <div style={{height: '10%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <div style={{backgroundColor: 'black', height: '80%', width: '32%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                <div style={{backgroundColor: 'transparent', height: '80%', width: '90%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                  <div>Total:</div>
                  <div>{totalSpent} VND</div>
                </div>
                </div>
              </div>
              <div style={{height: '10%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{height: '80%', width: '25%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <div style={{width: '20%', height: '100%', cursor: 'pointer', visibility: residenceHistoryPrevButton.current}} onClick={residenceHistoryPrevClick}>
                    <img src={LeftArrowIcon} style={{width: '100%', height: '100%'}}></img>
                  </div>
                  <div style={{width: '60%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
                  {residenceHistoryPage} of {residenceHistoryMaxPage}
                  </div>
                  <div style={{width: '20%', height: '100%', cursor: 'pointer', visibility: residenceHistoryNextButton.current}} onClick={residenceHistoryNextClick}>
                  <img src={RightArrowIcon} style={{width: '100%', height: '100%'}}></img>
                  </div>
                </div>
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
    <Modal show={showAlert.show} centered onHide={()=>{setshowAlert({show: false, message: ''})}} data-bs-theme='dark' size='md'>
      <Modal.Header className='border-0' closeButton closeVariant='white' style={{backgroundColor: '#2E2E2E', fontSize: 30, fontFamily: 'Montserrat', color: 'white'}}>Alert</Modal.Header>
      <Modal.Body style={{backgroundColor: '#2E2E2E'}}>
        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, fontFamily: 'Montserrat', color: 'white'}}>
          {showAlert.message}
        </div>
      </Modal.Body>
      <Modal.Footer className='border-0' style={{backgroundColor: '#2E2E2E'}}>
        <div style={{height: '5vh', width: '100%', display: 'flex', justifyContent: 'center'}}>
          <div style={{height: '100%', width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <div style={{backgroundColor: '#00868D', height: '100%', width: '45%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 25, fontFamily: 'Montserrat', color: 'white', borderRadius: '10px', cursor: 'pointer'}} onClick={()=>{setshowAlert({show: false, message: ''})}}>
              Ok
            </div>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
