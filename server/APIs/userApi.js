const exp=require('express')
const userApp=exp.Router();
const UserAuthor=require("../models/userAuthorModel")
const expressAsyncHandler=require('express-async-handler');
const createUserOrAuthor=require('./createUserOrAuthor')
const Article=require('../models/articleModel')
// userApp.use(exp.json())
userApp.post("/author", expressAsyncHandler(createUserOrAuthor)); // Create new author
userApp.post("/user", expressAsyncHandler(createUserOrAuthor)); // Create new user
userApp.post("/author-api/articles", expressAsyncHandler(async (req, res) => {
    const newArticle = req.body;
    const article = new Article(newArticle);
    const savedArticle = await article.save();
    res.status(201).send({ message: "article created", payload: savedArticle });
})); // Create new article



//add comment
userApp.put("/comment/:articleId",expressAsyncHandler(async(req,res)=>{
    //get comment obj
    const commentObj=req.body;
    console.log(commentObj,req.params.articleId);
    //add commentObj to comments array of article
    const articlewithComments=await Article.findOneAndUpdate(
        {articleId:req.params.articleId},
        {$push:{ comments:commentObj}},
        {returnOriginal:false});
    //send res
    res.send({message:"comment added",payload:articlewithComments})

}))

module.exports=userApp;
