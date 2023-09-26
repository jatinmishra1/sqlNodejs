import React, { useEffect, useState } from "react"
import {Route, useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import { Navigate } from "react-router-dom";
import {Container , Dropdown} from 'react-bootstrap';  
import Edit from "./Edit";
function Home (){
    const [data,setData]=useState([])
    const [task,setTask]=useState();
    const [task_details,setTaskDetails]=useState()
    const [status,setStatus]=useState()
    const [id,setId]=useState()
    const [log,setLog]=useState(false)
    const location=useLocation()
    async function load(){
        const user_id=localStorage.getItem('user-id')
            console.log("jjjj:",user_id)
            setId(user_id)
        const response=await axios.get(`http://localhost:8000/data/${id}`)
        const datas=response.data.result;
        setData(datas)
        console.log(response.data.result)
    }
    useEffect(()=>{
        const user_id=localStorage.getItem('user-id')
        setId(user_id)
        load()
        chekauth()
    },[status,log,id])
    function chekauth(){
        const userToken = localStorage.getItem('user-token');
        if(!userToken || userToken=="undefined"){
            setLog(false)
setTimeout(() => {
            window.location.href="/"
        }, 500);

        }else{
            setLog(true)
           
        }
    }
 async function save(e,id){
    console.log("here")
    console.log(status)
console.log(id)
    e.preventDefault();
    const response = await axios.put(`http://localhost:8000/data/${id}`, {
      status,id
    })
  

 }
async  function deleteHandel(e,id){
    e.preventDefault()
    try{

        const response= await axios.post(`http://localhost:8000/delete/${id}`
         )
         if(response.data.status==="error"){
             alert("error")
         }else{
             window.location.href="/home"
             
         }
     }
     catch(e){
         console.log(e);

     }
}
 async function Edithandel(e,id,task,task_details,state){
    e.preventDefault()
    window.location.href=`/edit/${id}`
 }
    async function submit(e){
        e.preventDefault();
        
       
       
        // console.log(user_id)
        try{
            console.log("in submit method ")
            const user_id=localStorage.getItem('user-id')
            console.log(user_id)
            setId(user_id)
            const response= await axios.post("http://localhost:8000/data",{
               id,task,task_details,status
             })
             if(response.data.status==="error"){
                 alert("error")
             }else{
                 window.location.href="/home"
                 
             }
         }
         catch(e){
             console.log(e);
 
         }
    }
    return (
        {log} &&
        <div className="homepage">
            <form action="POST">
            <input type="task" onChange={(e) => { setTask(e.target.value) }} placeholder="Task"  />
                <input type="taskDetails" onChange={(e) => { setTaskDetails(e.target.value) }} placeholder="Task Details"  />
                
                <input type="submit" onClick={submit} />

            </form>
            <h1>Hello  and welcome to the home</h1>
            {
             data.map((data)=>{
                return (
                    <form action="POST" >
                    <div className="display-flex">
                        <h2>{data.id}</h2>
                        <h2>{data.task}</h2>
                        <h4>{data.task_details}</h4>
                        <h4 className="">{data.state}</h4>
                        <div>
                            <button onClick={(e)=>Edithandel(e,data.id,task,data.task_details,data.state)}>Edit</button>
                            <button onClick={(e)=>deleteHandel(e,data.id)}>delete</button>
                        </div>
                       
                        <select className="form-control" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                            <option  value="pending">pending</option>
                            <option value="done">Done</option>
                            <option value="in-progress">In-progress</option>
                            <option value="completed">Completed</option>
                            </select> 
                            <input type="submit" onClick={(e)=>save(e,data.id)} />
                            
                    </div>
                     </form>
                )
             })   
            }

        </div>
    )
}

export default Home