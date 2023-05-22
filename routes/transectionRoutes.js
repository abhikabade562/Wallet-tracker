const express = require('express');
const { addTransection, getAllTransection,editTransection,deleteTransection} = require('../controller/transectionCtrl');


//router object
const router=express.Router()

//routes
//add transection
router.post('/add-transection',addTransection);

//edit transection
router.post('/edit-transection/:id',editTransection);

//delete transection
router.post('/delete-transection',deleteTransection);

//get transection
router.post("/get-transection",getAllTransection);

module.exports =router;