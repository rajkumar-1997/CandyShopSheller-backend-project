const path=require('path');
const CandyRecord=require('../models/candy.js');
const rootDir=require('../util/path.js');

exports.homepage=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','index.html'));

}

exports.addCandy=async (req,res,next)=>{
    const candyname=req.body.candyname;
    const description=req.body.description;
    const price=req.body.price;
    const quantity=req.body.quantity;
    try{

        
        let result= await CandyRecord.create({candyname:candyname,description:description,price:price,quantity:quantity})
        
             console.log('candy added',result);
             res.status(200).json({"newecandy":result});
    }
    catch(err){
        console.log(err);
    }
}

exports.sendAllCandy=async (req,res,next)=>{
    try{

        let candies = await CandyRecord.findAll()
             console.log(candies);
             res.status(201).json({allData:candies});
    }
    catch(err){
        console.log(err,'Got some error')
        res.status(500).json({error:err});
       
    }
}




exports.getEditCandy= async (req,res,next)=>{
    const candyId=req.params.candyId;
   try{

       let candy = await CandyRecord.findByPk(candyId);
            console.log(candy);
            res.send(candy);
   }
    catch(err){
        console.log(err);
    }
}

exports.editCandy= async (req,res,next)=>{
    const expenseId=req.params.expenseId;
    const updatedAmount=req.body.amount;
    const updatedCategory=req.body.category;
    const updatedDescription=req.body.description;
try{

    let expense = await ExpenseData.findByPk(expenseId)
         expense.amount=updatedAmount;
         expense.category=updatedCategory;
         expense.description=updatedDescription;
         console.log(expense);
          let result= await  expense.save();
         
             console.log(result);
             res.send();
         
}
    catch(err){
        console.log(err);
    }
}