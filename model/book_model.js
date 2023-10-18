let mongoose=require("mongoose");

let bookSchema=mongoose.Schema({
    title:String,
    author:String,
    isbn:Number,
    description:String,
    published_date:Date
},{
    versionKey:false
})

let BookModel=mongoose.model("book",bookSchema);

module.exports={BookModel};