const express = require("express")
// const collection = require("./mongo")
const db=require("./mongo")
const cors = require("cors")
const app = express()
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
dotenv.config()


app.get("/",cors(),(req,res)=>{

})

app.put("/data/:id",(req,res)=>{
    console.log("in put method")
    console.log(req.body)
    const {id,status}=req.body
    db.query('select task,task_details,state from data_table where id=?',[id],(err,result)=>{
        if(err)throw err
        const que = 'UPDATE `data_table` '+
                  'SET state = ? '+ 
                  'WHERE id = ?';
    const values = [status, id];
        db.query(que,values,(err,result)=>{
            if(err)throw err
            console.log("updated")
        })
        console.log(result)
        result.state=status
    })
})

app.get("/edit/:id",(req,res)=>{
    const id=req.params.id
    console.log(id)
    db.query('select id ,task,task_details,state from data_table where id=?',[id],(err,result)=>{
        if(err)throw err
       
            if(err)throw err
            console.log(result)
            return res.status(200).json(result)
        
        console.log(result)
        result.state=status
    })
})

app.post("/edit/:id",(req,res)=>{
    const id=req.params.id
    const{task,taskDetails}=req.body
    // console.log(id)
    db.query('select id ,task,task_details,state from data_table where id=?',[id],(err,result)=>{
        if(err)throw err
        console.log("hum")
        console.log(result)
            const que = 'UPDATE `data_table` '+
            'SET task = ? , task_details=? '+ 
            'WHERE id = ?';
const values = [task,taskDetails, id];
  db.query(que,values,(err,result)=>{
      if(err)throw err
      console.log("updated")
      return res.status(200).json("updated ")
  })
  
    })
})




app.post("/delete/:id",(req,res)=>{
    const id=req.params.id
    
    // console.log(id)
    db.query('delete from data_table where id=?',[id],(err,result)=>{
        if(err)throw err
       return res.status(200).json("deleted")
  
    })
})

app.post("/",async(req,res)=>{
    console.log(req.body)
    const{email,password}=req.body
    db.query('select id, email,password from user_table where email=?',[email],async(err,result)=>{
       
        if(err)throw err
        else if(password===result[0].password){
            console.log("login success")
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
   
  
    const token = jwt.sign(password, "fidgyufguyvbhifbihff");
    console.log(token,result[0].id)
  const data={
    token,
    resp:result[0].id
  }
    return res.send(data);
            // res.json("exist")
        }else{
            throw err("details are wrong")
            res.json("notexist")
           
        }
    } )

})




app.post("/data",async(req,res)=>{
   const{id,task,task_details}=req.body
   console.log(id)
console.log(req.body)
db.query('insert into data_table set ?',{id:id,task:task,task_details:task_details},(err,result)=>{
    if(err) throw err
    return res.json({status:"success",success:"inserted"})
})
    // db.query('select * from data_table',async(err,result)=>{
       

    //     if(err)throw err
    //     else  {
    //     return res.json({status:"success",result})
    //     }
    // } )

})


app.get("/data/:id",async(req,res)=>{
    const id=req.params.id
    console.log(id)
    db.query('select * from data_table join user_table on data_table.id=user_table.id where data_table.id=?',[id],async(err,result)=>{
       
        if(err)throw err
        else  {
        return res.json({status:"success",result})
        }
    } )

})









app.post("/signup",async(req,res)=>{
   console.log(req.body)
    const{name,email,password}=req.body

    if(!name || !email || !password){
        // console.log("hellolo here")
return res.json({status:"error",error:"please enter the field"})
    }else{
        db.query('select email from user_table where email=?',[email],async(err,result)=>{
            if(err)return res.json({status:"error",error:"server error"})
            else if(result[0])return res.json({status:"error",error:"Email already exists"})
            else{
        db.query('insert into user_table set ?',{Full_Name:name,Email:email,Password:password},(err,result)=>{
            if(err)return res.json({status:"error",error:"server error 2"})
            else return res.json({status:"success",success:"success"})
        })
        }
        })
    }

    

})

app.listen(8000,()=>{
    console.log("port connected");
})

