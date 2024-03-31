const exp=require("express")
let {attendenceroute}=require("./route/attendenceroute")
const bodyParser = require('body-parser');
const cors = require("cors");
const app=exp();
app.use(cors())
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(exp.json());

app.use(attendenceroute)
let {connect}=require("./mong")
app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.listen(8080,async()=>{
    try {
        await connect
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running")
})
