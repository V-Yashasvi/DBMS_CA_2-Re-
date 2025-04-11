const express=require('express')
const router=express.Router()
const Menu=require('../models/menu.model')

router.post('/new', async(req, res)=>{
  try {
    const {name, description, price}=req.body
    const payload={name, description, price}
    if(!name){
      return res.status(400).json({"error":"Validation failed: name is required"})
    }
    if(!description){
      return res.status(400).json({"error":"Validation failed: description is required"})
    }
    if(!price){
      return res.status(400).json({"error":"Validation failed: price is required"})
    }
    const new_menu=new Menu(payload)
    await new_menu.save()
    res.status(201).json({"message":"New Menu created successfully", new_menu})
  } catch (error) {
    return res.status(500).json({"error":"Something went wrong"})
  }
})

router.get('/all', async(req, res)=>{
  try {
    const menus=await Menu.find()
    if(!menus){
      return res.status(404).json({"error":"Menus not found"})
    }
    res.status(200).json({"message":"Menus details fetched", menus})
  } catch (error) {
    res.status(500).json({"error":"Something went wrong"})
  }
})

router.get('/get/:id', async(req, res)=>{
  const {id}=req.params.id
  try {
    const menu=await Menu.findById(id)
    if(!menu){
      return res.status(404).json({"message":"Menu not found"})
    }
    res.status(200).json({"message":"Menu details fetched", menu})
  } catch (error) {
    res.status(500).json({"error":"Something went wrong"})
  }
})

router.put('/update/:id', async(req, res)=>{
  const {id}=req.params.id
  try {
    const updated_Menu=await Menu.findByIdAndUpdate(id, req.body, {new:true})
    if(!updated_Menu){
      return res.status(404).json({"message":"Menu not found"})
    }
    res.status(200).json({"message":"Updated Menu ruccessfully", updated_Menu})
  } catch (error) {
    res.status(500).json({"error":"Something went wrong"})
  }
})

router.delete('/delete/:id', async(req, res)=>{
  const {id}=req.params.id
  try {
    const deleted_Menu=await Menu.findByIdAndDelete(id)
    if(!deleted_Menu){
      return res.status(404).json({"message":"Menu not found"})
    }
    res.status(200).json({"message":"Deleted Menu successfully", deleted_Menu})
  } catch (error) {
    res.status(500).json({"error":"Something went wrong"})
  }
})

module.exports=router