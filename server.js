const express=require("express")
const cheerio=require("cheerio")
const axios = require("axios")
const port=process.env.PORT||8000

const app=express();

app.get('/',(req,res)=>{
    res.status(200).send("hello this is an api")
})

app.get('/:id',(req,res)=>{
    const {id}=req.params

    if(!id){
        res.status(400).send({message:"please provide a user id"});
    }

    const url1 = `https://auth.geeksforgeeks.org/user/${id}/`
    
    axios(url1).then(response=>{
        const html=response.data;
        const $=cheerio.load(html);
        const gfgscores=[]
        $('.score_card_value',html).each(function(){
           const gfgscore= $(this).text()
           gfgscores.push(gfgscore)
           
        
        })
         numb=parseInt(gfgscores[1])
         
        



  res.json({gfgscore:numb})

})
})

app.listen(port,()=>{
    console.log("app is listening on port");
})