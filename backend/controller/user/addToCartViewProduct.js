import Cart from "../../model/cartProduct.js";

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;

    const allProduct = await Cart.find({ userId: currentUser });
    console.log(allProduct);

    res.json({
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export default addToCartViewProduct;
