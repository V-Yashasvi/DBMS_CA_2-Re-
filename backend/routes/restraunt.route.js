const express=require('express')
const router=express.Router()
const Restraunt=require('../models/restraunt.model')

router.post('/new', async(req, res)=>{
  try {
    const {name, location, cuisine, rating, menu}=req.body
    const payload={name, location, cuisine, rating, menu}
    if(!name){
      return res.status(400).json({"error":"Validation failed: name is required"})
    }
    if(!location){
      return res.status(400).json({"error":"Validation failed: location is required"})
    }
    if(!cuisine){
      return res.status(400).json({"error":"Validation failed: cuisine is required"})
    }
    if(!rating){
      return res.status(400).json({"error":"Validation failed: rating is required"})
    }
    if(!menu){
      return res.status(400).json({"error":"Validation failed: menu is required"})
    }
    const new_restraunt=new Restraunt(payload)
    await new_restraunt.save()
    res.status(201).json({"message":"New restraunt created successfully", new_restraunt})
  } catch (error) {
    return res.status(500).json({"error":"Something went wrong"})
  }
})

router.get('/all', async(req, res)=>{
  try {
    const restraunts=await Restraunt.find().populate('menu')
    if(!restraunts){
      return res.status(404).json({"error":"Restraunts not found"})
    }
    res.status(200).json({"message":"Restraunts details fetched", restraunts})
  } catch (error) {
    res.status(500).json({"error":"Something went wrong"})
  }
})

router.get('/get/:id', async(req, res)=>{
  const {id}=req.params.id
  try {
    const restraunt=await Restraunt.findById(id)
    if(!restraunt){
      return res.status(404).json({"message":"Restraunt not found"})
    }
    res.status(200).json({"message":"Restraunt details fetched", restraunt})
  } catch (error) {
    res.status(500).json({"error":"Something went wrong"})
  }
})

router.put('/update/:id', async(req, res)=>{
  const {id}=req.params.id
  try {
    const updated_restraunt=await Restraunt.findByIdAndUpdate(id, req.body, {new:true})
    if(!updated_restraunt){
      return res.status(404).json({"message":"Restraunt not found"})
    }
    res.status(200).json({"message":"Updated restraunt ruccessfully", updated_restraunt})
  } catch (error) {
    res.status(500).json({"error":"Something went wrong"})
  }
})

router.delete('/delete/:id', async(req, res)=>{
  const {id}=req.params.id
  try {
    const deleted_restraunt=await Restraunt.findByIdAndDelete(id)
    if(!deleted_restraunt){
      return res.status(404).json({"message":"Restraunt not found"})
    }
    res.status(200).json({"message":"Deleted restraunt successfully", deleted_restraunt})
  } catch (error) {
    res.status(500).json({"error":"Something went wrong"})
  }
})

module.exports=router