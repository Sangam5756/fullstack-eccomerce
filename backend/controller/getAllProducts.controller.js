import Product from "../model/product.model.js"

const getProductsController = async (req, res) =>{

try {
    const product = await Product.find().sort({createdAt : -1})
    res.status(200).json({
        message:"All Products",
        data:product,
        error:false,
        success:true
    })

} catch (error) {
    res.status(400).json({
        message:error.message,
        success:false,
        error:false
    })
    
}

}

export default getProductsController;