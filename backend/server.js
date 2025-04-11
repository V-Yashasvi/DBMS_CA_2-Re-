const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.PORT
const connection=require('./db/db')
const restrauntRouter=require('./routes/restraunt.route')
const menuRouter=require('./routes/menu.route')

app.use(express.json())
app.use('/restraunt', restrauntRouter)
app.use('/menu', menuRouter)

app.listen(port, async()=>{
  try {
    await connection
    console.log(`Server is running on port ${port}`)
  } catch (error) {
    console.log(error)
  }
})