import Cart from "../../model/cartProduct.js";

export const updateAddCartController = async (req, res) => {
  try {
    const CurrentUserId = req.userId;

    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    const updateProduct = await Cart.updateOne(addToCartProductId, {
      ...(qty && { quantity: qty }),
    });

    res.json({
      message: "product Updated",
      data: updateProduct,
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
