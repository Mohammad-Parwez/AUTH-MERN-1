const mongoose = require("mongoose")
const mongo_url = process.env.MONOGO_CONC
 
mongoose.connect(mongo_url)
.then(()=>{
    console.log("databse connected")
}).catch((error)=>{
    console.log(error)
})