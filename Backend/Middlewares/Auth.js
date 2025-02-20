const jwt = require("jsonwebtoken")
const ensureAut = (req,res,next)=>{
    const auth = req.headers["authorization"];
    if(!auth){
        return res.status(200).json({message: "unauthorized token required"})
    }
    try{
    const decoded  = jwt.verify(auth, process.env.JWT_Key);
    req.user = decoded;
    next();
    }
    catch(error){
     return res.status(403).json({message: "unauthorized token required"})
    }
}
module.exports = ensureAut