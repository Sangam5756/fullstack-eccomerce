import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: String,
  brandName: String,
  category: String,
  productImage: [],
  description: String,
  price: Number,
  sellingPrice: Number,
},{
    timeStamps:true
});

const Product = new mongoose.model("product", productSchema);

export default Product;
