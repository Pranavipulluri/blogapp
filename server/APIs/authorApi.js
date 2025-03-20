const exp=require('express')
const authorApp=exp.Router();
const expressAsyncHandler=require('express-async-handler');
const createUserOrAuthor=require('./createUserOrAuthor');
const Article =require('../models/articleModel')
const {requireAuth,clerkMiddleware}=require('@clerk/express')
require('dotenv').config()
//authorApp.use(clerkMiddleware)

// authorApp.use(exp.json())
//API
//create a new author
authorApp.post("/author",expressAsyncHandler(createUserOrAuthor))

//create a new article
// Create a new article
authorApp.post("/article", expressAsyncHandler(async (req, res) => {
    const newArticleObj = req.body;
    const newArticle = new Article(newArticleObj);
    const articleObj = await newArticle.save();
    res.status(201).send({ message: "article published", payload: articleObj });
  }));
  


//read all articles
authorApp.get("/articles",requireAuth({signInUrl: "unauthorized"}) ,expressAsyncHandler(async(req,res)=>{
    //read all articles from db {isArticleActive:true}
    const listOfArticles=await Article.find();
    res.status(200).send({message:"articles",payload:listOfArticles})
}))

authorApp.get('/unauthorized',(req,res)=>{
    res.send({message:"Unauthorized request"})
})

//modify an article by article id
authorApp.put("/article/:articleId",requireAuth({signInUrl: "unauthorized"}),expressAsyncHandler(async(req,res)=>{

    //get modified article
    const modifiedArticle=req.body;
    //update article by article id
    const dbRes=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    //send res
    res.status(200).send({message:"article modified",payload:dbRes})
}))

//delete(soft delete) an article by article id
authorApp.put("/articles/:articleId",expressAsyncHandler(async(req,res)=>{

    //get modified article
    const modifiedArticle=req.body;
    //update article by article id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false});
    //send res
    res.status(200).send({message:"article deleted",payload:latestArticle})
}))

module.exports=authorApp;