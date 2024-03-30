const mong=require("mongoose")
const connect=mong.connect("mongodb+srv://Govind:Govind151122@cluster0.rlybofq.mongodb.net/justanother?retryWrites=true&w=majority")
module.exports={
    connect
}