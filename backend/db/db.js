const mongoose=require('mongoose')

const connection=mongoose.connect(process.env.URL).then(()=>{
  console.log("Connected to mongodb")
}).catch((err)=>{
  console.log(err)
})

module.exports=connection