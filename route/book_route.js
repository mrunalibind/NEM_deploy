let express=require("express");
const { BookModel } = require("../model/book_model");
let bookRouter=express.Router();

bookRouter.get("/",(req,res)=>{
    res.status(200).send({msg:"Book Router Working"});
})

// Post request, create a book.
bookRouter.post("/create",async(req,res)=>{
    let {title,author,isbn,description,published_date}=req.body;
    try {
        let book=new BookModel({title,author,isbn,description,published_date});
        await book.save();
        res.status(201).send({msg:"Book is created"});
    } catch (error) {
        res.status(400).send({msg:error.message});
    }
})

// Get request, retrieve data based on ID
bookRouter.get("/retrieve/:id",async(req,res)=>{
    let {id}=req.params; 
    try {
        let book=await BookModel.findOne({_id:id});
        res.status(200).send({msg:book});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Get request based on query title or author
bookRouter.get("/retrieve",async(req,res)=>{
    let {title, author}=req.query; 
    try {
        if(title){
            let book=await BookModel.find({title});
            res.status(200).send({msg:book});
        }
        else if(author){
            let book=await BookModel.find({author});
            res.status(200).send({msg:book});
        }
        else{
            let book=await BookModel.find();
            res.status(200).send({msg:book});
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Update data, put request take id from params
bookRouter.put("/update/:id",async(req,res)=>{
    let {id}=req.params;
    try {
        let book=await BookModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({msg:"Book is Updated"});
    } catch (error) {
        res.status(400).send(error.message);
    }
})


// Delete request, take id from params
bookRouter.delete("/remove/:id",async(req,res)=>{
    let {id}=req.params;
    try {
        let book=await BookModel.findByIdAndDelete({_id:id});
        res.status(200).send({msg:"Book is Deleted"});
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports={bookRouter};