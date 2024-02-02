const express=require('express')
const route=require('./route')
const cors=require('cors')
const path=require('path')
const app=express()

app.use(cors());
app.use(express.json())
app.use('/api',route)
app.use( express.static(path.join(__dirname, './public')));

const PORT =process.env.PORT||2000


app.listen(PORT,()=>{
    console.log("server is running  on port 2000");
});

