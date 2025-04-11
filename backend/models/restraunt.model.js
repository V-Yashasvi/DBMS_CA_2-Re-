const mongoose=require('mongoose')

const restrauntSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  location:{
    type:String,
    required:true
  },
  cuisine:{
    type:String,
    required:true
  },
  rating:{
    type:Number
  },
  menu:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'menu'
  }]
})


const restrauntModel=mongoose.model('restraunt', restrauntSchema)
module.exports=restrauntModel