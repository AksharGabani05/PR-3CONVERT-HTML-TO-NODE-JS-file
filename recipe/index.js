const express=require("express")
const mid = require("./mid")
let app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let initialRecipe = [
    {
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      preparationTime: '15 minutes',
      cookingTime: '15',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
      country: "India",
      veg: true,
      id: 1
    }
  ]

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to the Recipe API.")
})
app.get("/recipe/all",(req,res)=>{
    res.status(200).send(initialRecipe)
})
app.get("/index",(req,res)=>{
    
    res.status(200).sendFile(__dirname+("/index.html"))
})
app.get("/add",(req,res)=>{
    res.status(200).sendFile(__dirname+("/recipe.html"))
})
app.post("/recipe/add",mid,(req,res)=>{
    let newrecipe = req.body;
  initialRecipe.push(newrecipe);
  res.json(initialRecipe);
})
app.patch("/recipe/update/:id",(req,res)=>{
    let {id}=req.params
    
    let updatedrecipe=initialRecipe.filter(recipe=>recipe.id==id)

    updatedrecipe[0].name=req.body.name
    updatedrecipe[0].description=req.body.description
    updatedrecipe[0].preparationTime=req.body.preparationTime
    updatedrecipe[0].cookingTime=req.body.cookingTime
    updatedrecipe[0].imageUrl=req.body.imageUrl
    updatedrecipe[0].country=req.body.country
    updatedrecipe[0].veg=req.body.veg

    res.status(200).send(initialRecipe)
})
app.delete("/recipe/delete/:id",(req,res)=>{
    let {id}=req.params
    let index=initialRecipe.findIndex(recipe=>recipe.id==id)
    let deletedrecipe=initialRecipe.splice(index,1)[0]
    res.status(200).send(initialRecipe)
})

app.get("/recipe/filter", (req, res) => {
    let { veg, sort, country } = req.query

    if (veg === 'true' || veg === 'false') {
        newrecipe = initialRecipe.filter(recipe => recipe.veg === (veg === 'true'))
        res.send(newrecipe)
    }
    else if (sort === 'lth') {
        newrecipe = initialRecipe.sort((a, b) => a.cookingTime - b.cookingTime)
        res.send(newrecipe)
    }
    else if (sort === 'htl') {
        newrecipe = initialRecipe.sort((a, b) => b.cookingTime - a.cookingTime)
        res.send(newrecipe)
    }
    else if(country){
        newrecipe = initialRecipe.filter(e => e.country.toLocaleLowerCase() === country.toLocaleLowerCase())
        res.send(newrecipe)
    }
    else{
        res.status(404).send("wrong quert")
    }
})
app.listen(8090,()=>{
    console.log("Server 8090 start");
})