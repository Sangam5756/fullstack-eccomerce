import Cart from "../../model/cartProduct.js";

const countAddToCart = async (req, res) => {
  try {

    const user = req.userId;

    const count = await Cart.countDocuments({
      userId: user,
    });

    console.log(count)
    

    res.json({
      message: "Count of product in Cart",
      data: {
        count: count,
      },
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }

 
};

export default countAddToCart;
