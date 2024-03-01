const cloudinary = require("cloudinary");
const Products = require("../model/productModel")

const createProduct = async (req,res) => {
    // step 1 : check incomming data
    console.log(req.body);
    console.log(req.files);

    // step 2 : Destructuring data
    const {
        productName, 
        productPrice,
        productDescription,
        category,
    } = req.body;
    const {productImage} = req.files;

    // step 3 : Validate data
    if(!productName || !productPrice || !productDescription || !category || !productImage){
        return res.json({
            success : false,
            message : "Please fill all the fields"
        })
    }

    try {
        // upload image to cloudinary
        const uploadedImage = await cloudinary.v2.uploader.upload(
            productImage.path,
            {
                folder : "products",
                crop : "scale"
            }
        )

        // Save to database
        const newProduct = new Products({
            productName : productName,
            productPrice : productPrice,
            productDescription : productDescription,
            category : category,
            productImageUrl : uploadedImage.secure_url
        })
        await newProduct.save();
        res.json({
            success : true,
            message : "Product created successfully",
            product : newProduct
        })


        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }

}


// get all products
const getProducts = async (req,res) => {
    try {
        const products = await Products.find({}).sort({ createdAt: -1 }).populate('category', 'name');
        res.json({
            success : true,
            message : "All products fetched successfully!",
            products : products
        })
        
    } catch (error) {
        console.log(error);
        res.send("Internal server error")
    }

}

// fetch single product
const getSingleProduct = async (req,res) => {
    const productId = req.params.id;
    try {
        const singleProduct = await Products.findById(productId);
        res.json({
            success : true,
            message : "Single product fetched successfully!",
            product : singleProduct
        })
        
    } catch (error) {
        console.log(error);
        res.send("Internal server error")
    }
}

// update product
const updateProduct = async (req,res) => {
    // step 1 : check incomming data
    console.log(req.body);
    console.log(req.files);

    // destructuring data
    const {
        productName,
        productPrice,
        productDescription,
        category
    } = req.body;
    const {productImage} = req.files;

    // validate data
    if( !productName 
        || !productPrice 
        || !productDescription 
        || !category){
        return res.json({
            success : false,
            message : "Required fields are missing!"
        })
    }

    try {
        // case 1 : if there is image
        if(productImage){
            // upload image to cloudinary
            const uploadedImage = await cloudinary.v2.uploader.upload(
                productImage.path,
                {
                    folder : "products",
                    crop : "scale"
                }
            )

            // make updated json data
            const updatedData = {
                productName : productName,
                productPrice : productPrice,
                productDescription : productDescription,
                category : category,
                productImageUrl : uploadedImage.secure_url
            }

            // find product and update
            const productId = req.params.id;
            await Products.findByIdAndUpdate(productId, updatedData)
            res.json({
                success : true,
                message : "Product updated successfully with Image!",
                updatedProduct : updatedData
            })

        } else {
            // update without image
            const updatedData = {
                productName : productName,
                productPrice : productPrice,
                productDescription : productDescription,
                category : category,
            }

            // find product and update
            const productId = req.params.id;
            await Products.findByIdAndUpdate(productId, updatedData)
            res.json({
                success : true,
                message : "Product updated successfully without Image!",
                updatedProduct : updatedData
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
const deleteProduct = async (req,res) =>{
    const productId = req.params.id;

    try {
        await Products.findByIdAndDelete(productId);
        res.json({
            success : true,
            message : "Product deleted successfully!"
        })
        
    } catch (error) {
        res.json({
            success : false,
            message : "Server error!!"
        })
    }
}
//pagination route
// const getPagination=async(req,res)=>{
// //step:1 get the page user requested
// const requestedPage=req.query.page;
// //step:2 result per page
// const resultPerPage=2;
// try {
//     //step3: Fetch all the products
//     //result: (test1,test2,test3,test4,test5,test6)
//     const products= await Products.find({})
//     //step4: skip the data
// .skip((requestedPage-1)*resultPerPage)
// //limit per page data
// .limit(resultPerPage)
// if(products.length===0){
//     return res,json({
//         succes:false,
//         message:"No products found!"
//     })
// }
// res.json({
//     success:true,
//     products:products
// })
                                           
// } catch (error) {
//     console.log(error)
//     res.send("Error occured in pagination")
// }
// };
const getPagination = async (req, res) => {
    // Step 1: Get the page user requested, default to 1 if not provided
    const requestedPage = parseInt(req.query.page, 10) || 1;
    // Step 2: Result per page
    const resultPerPage = 2;

    try {
        // Step 3: Count total number of products
        const totalProducts = await Products.countDocuments();
        // Step 4: Fetch paginated products
        const products = await Products.find({})
            .skip((requestedPage - 1) * resultPerPage)
            .limit(resultPerPage).sort({createdAt:-1}).populate('category', 'name')
            ;

        if (products.length === 0) {
            return res.json({
                success: false,
                message: "No products found!"
            });
        }

        res.json({
            success: true,
            products: products,
            currentPage: requestedPage,
            totalPages: Math.ceil(totalProducts / resultPerPage),
            totalProducts: totalProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occurred in pagination");
    }
};

const filterProduct=async(req,res)=>{
    try {
        const {checked, circle}=req.body;
let args={}
if(checked.length>0)args.category=checked;
if (circle.length === 2) {
    args.productPrice = { $gte: Number(circle[0]), $lte: Number(circle[1]) };
}

const products = await Products.find(args).populate('category', 'name');
res.status(200).send({
    success:true,
    products
})
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error while filtering product",
            error,
        })
    }
}


module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getPagination,
    filterProduct
}