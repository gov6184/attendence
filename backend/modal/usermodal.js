let mong=require("mongoose")
let usermod=new mong.model("Users",mong.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String
}))
module.exports={
    usermod
}
