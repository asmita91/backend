const express=require("express");
const {authGuard,authGuardAdmin, requireSignIn } = require('../middleware/authGuard.js');
const categoryController=require('../controllers/categoryController.js');

const router=express.Router()

router.post("/create-category", categoryController.createCategoryController);
router.put("/update-category/:id", categoryController.updateCategoryController);
router.get("/allCategories",categoryController.getAllCategory)
router.get("/singleCategory/:slug",categoryController.singleCategoryController)
router.delete("/delete-category/:id", categoryController.deleteCategoryCOntroller )
module.exports=router;