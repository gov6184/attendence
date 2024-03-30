const exp=require("express")
let {attendenceroute}=require("./route/attendenceroute")
const bodyParser = require('body-parser');
const app=exp();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow requests from your frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    next();
  });
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