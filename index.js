let express=require("express");
const { connection } = require("./db");
const { bookRouter } = require("./route/book_route");
let app=express();
app.use(express.json())
app.use("/book",bookRouter);

app.listen(8060,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error)
    }
    console.log("Server is running on port 8090");
})

module.exports={app};