let express=require("express")
let attendenceroute=express.Router()
let {attendencemod}=require("../modal/attendencemodal")
attendenceroute.get("/attendence",async(req,res)=>{

    let val=await attendencemod.find()
    console.log(val)
    res.send(val)
})
attendenceroute.post("/attendence/add",async(req,res)=>{
    
   
       
    
    let nn=new attendencemod(req.body)
    await nn.save()
})


attendenceroute.delete("/attendence/:userid",(req,res)=>{
  
})

module.exports={
    attendenceroute
}