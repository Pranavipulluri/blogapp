const exp=require('express')
const app=exp();
require('dotenv').config()
const mongoose=require("mongoose")
const userApp=require("./APIs/userApi")
const authorApp=require("./APIs/authorApi")
const adminApp=require("./APIs/adminApi")
const cors=require('cors')
app.use(cors())

const port=process.env.port || 4000

mongoose.connect('mongodb://localhost:27017/blog-app')
  .then(() => {console.log('MongoDB connected successfully')
    app.listen(port,()=>console.log(`server listening on port ${port}..`))
  })
  .catch(err => console.error('MongoDB connection error:', err));
//body parser middleware
app.use(exp.json())
//connect API routes
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

//error handler
app.use((err,req,res,next)=>{
    console.log("error object in express error handler:",err);
    res.send({message:err.message});
})
