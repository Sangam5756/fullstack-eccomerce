import Cart from "../../model/cartProduct.js";

const addtoCartController = async (req, res) => {
  try {
    const [productId] = req?.body;
    const currentUser = req.userID;

    // check product is available in cart or not
    const isAvailable = await Cart.find({ productId });
    if (isAvailable) {
      return res.json({
        message: "Already exists in cart",
        succes: false,
        error: true,
      });
    }
    // saved the data in payload
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };
    // pass the payload to the cart model
    const newAddtoCart = await new Cart(payload);
    // save the into the database
    const savedProduct = await newAddtoCart.save();
    // send the response back to user
    res.send(200).json({
      data: savedProduct,
      message: "Product Added To cart",
      error: false,
      success: true,
    });

    // or send the error
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export default addtoCartController;
