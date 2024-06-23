import Cart from "../../model/cartProduct.js";

const deleteAddToCart = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const addToCartProduct = req.body._id;

    const delelteCartProduct = await Cart.deleteOne({ _id: addToCartProduct });

    res.json({
    
      message: "Product deleted Successfully",
      error:false,
      success:true,
      data:delelteCartProduct
    });
  } catch (error) {
    res.json({
      error: true,
      message: true,
      message: error.message,
    });
  }
};


export default deleteAddToCart;