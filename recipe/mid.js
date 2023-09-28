const { response } = require("express")

const mid=(req,res,next)=>{
    let {name,description,preparationTime,cookingTime,imageUrl,country,veg}=req.body
    if (name && description && preparationTime && cookingTime && imageUrl && country && veg ) {
      next()
    }
    else{
      res.status(400).send("All fields are required.");
      }
}
module.exports=mid