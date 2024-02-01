const express=require('express')
const route=require('./route')
const cors=require('cors')
const app=express()

app.use(cors());
app.use(express.json())
app.use('/api',route);

app.listen(2000,()=>{
    console.log("server is running  on port 2000");
});

