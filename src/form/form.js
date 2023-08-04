import React, { useState } from 'react';
import './form.css';
import { Outlet, Link } from "react-router-dom";

function View(req,res){
  let [dataFetched, setData] = useState(false)
  let [dataRes, setDataRes] = useState();
  function veiwData(){
   fetch('http://localhost:8080/view').then((res)=>{
    return res.json();
   }).then((data)=>{
    setData(true) ;
    setDataRes(data)
    
   })
  }
  let headingArr = ['Name', 'Phone no']
  return(
    <>
      <div className='ViewData' style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <button type='button' className="styled-button" onClick={veiwData}>Veiw Data</button>
      <Link to='/add' >ADD Data</Link>
      <br/>
      {dataFetched && 
        <div className='Table'> 
          <table>
            <thead>
              <tr>
            {
              headingArr.map((data,index)=>{
                return(     
                    <th key={index}>
                      {data}
                    </th>
                )
              })
            }
              </tr>
            </thead>
            <tbody>
              {
            dataRes.map((data)=>{
              return(
               <tr>
                <td>{data.name}</td>
                <td>{data.phone}</td>
               </tr>
              )
            })
              }
            </tbody>
          </table>
        </div>
      }
      </div>
    </>
  )
}





function Add(req,res){
  let formFields=[['Name','text'],["PhoneNo",'Number'], ['Address','text'], ['State','text']]
  const [obj,setValue] = useState({
    name: '',
    phoneNo: 0,
    address:'',
    state:''
  })

  return (
        <div className='form'>
          <Link to='/view' >View Data</Link>
          {
            formFields.map((data)=>{
              return(
                <>
                
                <div className='fields'>
                  
                <label htmlFor={data[0]}>{data[0]}:</label>
                <input type={data[1]} id={data[0]} onChange={(e)=>{ 
                  formInput(e.target.value,data[0])
                }} />
                </div>
                </>
              )
            })
          }
          <button type='submit' className="styled-button" onClick={submit}>Submit Form</button>
        </div>
  )
    
  function submit(){
    console.log(obj,'yashu');
    fetch('http://localhost:8080/add',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then((res)=>{
      res.json();
    }).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  
  function formInput(value,field){
    if(field=='Name'){
      setValue({
        ...obj,
        name: value
      })
    }
    else if(field=='PhoneNo'){
      setValue({
        ...obj,
        phoneNo: value
      })
    }
    else if(field=='Address'){
      setValue({
        ...obj,
        address: value
      })
    }
    else if(field=='State'){
      setValue({
        ...obj,
        state: value
      })
    }
  }
}



export {View, Add};
