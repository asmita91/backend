const mongoose=require("mongoose");
const articleSchema=new mongoose.Schema({
articleName:{
    type: String,
    required:true,
    trim:true,
},

articleDescription:{
    type:String,
    required:true,
    trim:true,
},

articleImageUrl:{
    type: String,
    required:true,

},
createdAt:{
    type:Date,
    default: Date.now(),
}
})
const Articles=mongoose.model('articles',articleSchema);
module.exports=Articles;