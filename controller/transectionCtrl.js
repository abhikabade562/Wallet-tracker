const transectionModel =require('../models/transectionModel');
const moment=require('moment');

const getAllTransection=async (req,res)=>{
    try {
        const {frequency,selectedDate,type}=req.body;
        const transections =await transectionModel.find({
            ...(frequency!=='custom'?{
                date:{
                    $gt:moment().subtract(Number(frequency),"d").toDate(),
                },
            }:{
                date:{
                    $gte:selectedDate[0],
                    $lte:selectedDate[1]
                },
            }),
            userid:req.body.userid,
            ...(type !=='all' && {type})
        });
        res.status(200).json(transections);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const deleteTransection = async (req,res) => {
    try {
        await transectionModel.findOneAndDelete({_id: req.body.transactionId});
        res.status(200).send('Transection Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const editTransection=async(req,res)=>{
    try {
        console.log(req.body.payload);
        const upd =  await transectionModel.findByIdAndUpdate(
            {_id:req.params.id}
            ,req.body.payload);
        console.log(upd)
        res.status(200).send("Edited Succesfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
const addTransection =async(req,res)=>{
    try {
        const newTreansection =new transectionModel(req.body);
        await newTreansection.save();
        res.status(201).send("Transection Created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports ={getAllTransection,addTransection,editTransection,deleteTransection};