import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


 function Edit(){
 const [ids,setId]=useState()
    const [task,setTask]=useState()
    const [taskDetails,setTaskDetails]=useState()
    const {id}=useParams()
    console.log("top pe")
    async function load(){
        const response= await axios.get(`http://localhost:8000/edit/${id}`)
        console.log(response.data)
        setId(response.data[0].id)
        setTask(response.data[0].task)
        setTaskDetails(response.data[0].task_details)
        console.log(task)
    }

    useEffect(()=>{
       load();
        
 },[])
async function submit(e){
    e.preventDefault()
    console.log(id,task,taskDetails)
    const response= await axios.post(`http://localhost:8000/edit/${id}`,{
        id,task,taskDetails
    })
    alert("success")
    window.location.href="/home"
    console.log(response.data)
}

    return (
        <form action="POST">
        <input type="task" onChange={(e) => { setTask(e.target.value) }} placeholder="Task" value={task}  />
            <input type="taskDetails" onChange={(e) => { setTaskDetails(e.target.value) }} placeholder="Task Details" value={taskDetails}  />
            <input type="submit" onClick={submit} />
        </form>
    )
  
 }

 export default Edit