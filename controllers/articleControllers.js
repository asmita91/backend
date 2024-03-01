const cloudinary = require("cloudinary");
const Articles = require("../model/articleModel")

const createArticle = async (req,res) => {
    // step 1 : check incomming data
    console.log(req.body);
    console.log(req.files);

    // step 2 : Destructuring data
    const {
        articleName, 
        articleDescription,
    } = req.body;
    const {articleImage} = req.files;

    // step 3 : Validate data
    if(!articleName  || !articleDescription  || !articleImage){
        return res.json({
            success : false,
            message : "Please fill all the fields"
        })
    }

    try {
        // upload image to cloudinary
        const uploadedImage = await cloudinary.v2.uploader.upload(
            articleImage.path,
            {
                folder : "articles",
                crop : "scale"
            }
        )

        // Save to database
        const newArticle = new Articles({
            articleName : articleName,
            articleDescription : articleDescription,
            articleImageUrl : uploadedImage.secure_url
        })
        await newArticle.save();
        res.json({
            success : true,
            message : "Article published successfully",
            article : newArticle
        })


        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }

}


const getArticles = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      const total = await Article.countDocuments();
      const articles = await Article.find()
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.json({ total, articles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const getSingleArticle = async (req,res) => {
    const articleId = req.params.id;
    try {
        const singleArticle = await Articles.findById(articleId);
        res.json({
            success : true,
            message : "Single article fetched successfully!",
            article : singleArticle
        })
        
    } catch (error) {
        console.log(error);
        res.send("Internal server error")
    }
}

// update product
const updateArticle = async (req,res) => {
    // step 1 : check incomming data
    console.log(req.body);
    console.log(req.files);

    // destructuring data
    const {
        articleName,
        
        articleDescription,
        
    } = req.body;
    const {articleImage} = req.files;

    // validate data
    if( !articleName 
        || !articleDescription 
        ){
        return res.json({
            success : false,
            message : "Required fields are missing!"
        })
    }

    try {
        // case 1 : if there is image
        if(articleImage){
            // upload image to cloudinary
            const uploadedImage = await cloudinary.v2.uploader.upload(
                articleImage.path,
                {
                    folder : "articles",
                    crop : "scale"
                }
            )

            // make updated json data
            const updatedData = {
                articleName : articleName,
                articleDescription : articleDescription,
                articleImageUrl : uploadedImage.secure_url
            }

            // find product and update
            const articleId = req.params.id;
            await Articles.findByIdAndUpdate(articleId, updatedData)
            res.json({
                success : true,
                message : "Article updated successfully with Image!",
                updatedArticle : updatedData
            })

        } else {
            // update without image
            const updatedData = {
                articleName : articleName,
                articleDescription : articleDescription,
            }

            // find product and update
            const articleId = req.params.id;
            await Articles.findByIdAndUpdate(articleId, updatedData)
            res.json({
                success : true,
                message : "Article updated successfully without Image!",
                updatedArticle : updatedData
            })
        }
        
    } catch (error) {
        res.status(500).json({  
            success : false,
            message : "Internal server error"
        })
    }
}

// delete product
const deleteArticle = async (req,res) =>{
    const articleId = req.params.id;

    try {
        await Articles.findByIdAndDelete(articleId);
        res.json({
            success : true,
            message : "Article deleted successfully!"
        })
        
    } catch (error) {
        res.json({
            success : false,
            message : "Server error!!"
        })
    }
}

const getPagination = async (req, res) => {
    const requestedPage = parseInt(req.query.page, 10) || 1;
    const resultPerPage = 2;

    try {
        const totalArticles = await Articles.countDocuments();
        const articles = await Articles.find({})
            .skip((requestedPage - 1) * resultPerPage)
            .limit(resultPerPage);

        if (articles.length === 0) {
            return res.json({
                success: false,
                message: "No articles found!"
            });
        }

        res.json({
            success: true,
            articles: articles,
            currentPage: requestedPage,
            totalPages: Math.ceil(totalArticles / resultPerPage),
            totalArticles: totalArticles
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occurred in pagination");
    }
};


module.exports = {
    createArticle,
    getArticles,
    getSingleArticle,
    updateArticle,
    deleteArticle,
    getPagination
}