const express=require('express')
const route=express.Router()
const catCon=require('./category/con')
const reg=require('./user/con')


route.get('/category',catCon.getCategory)
route.post('/register',reg.register)
console.log('Registering /api/subcategory route');
route.post('/login',reg.login)
route.get('/subcategory/:id',catCon.getSubCategory)
route.post('/checkout',reg.doCheckout)



module.exports=route

