let mong=require("mongoose")
let attendencemod=new mong.model("attendence",mong.Schema({
   image:String,
   location:String,
   name:String,
   date:String
}))
module.exports={
    attendencemod
}

