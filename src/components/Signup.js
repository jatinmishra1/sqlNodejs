import React, { startTransition, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"


function Login() {
    const history=useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

           const response= await axios.post("http://localhost:8000/signup",{
               name, email,password
            })
            if(response.data.status==="error"){
                alert("error")
            }else{
                window.location.href="/"
                console.log("registered")
            }
            
            
            

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div className="signup">

            <h1>Signup</h1>

            <form action="POST">
            <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Name"  />
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                <input type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}

export default Login