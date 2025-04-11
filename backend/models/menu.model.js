const mongoose=require('mongoose')

const menuSchema=({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  price:{
    type:Number,
    required:true
  }
})

const menuModel=mongoose.model('menu', menuSchema)
module.exports=menuModel