import Product from "../../model/product.model.js";
import uploadProductPermission from "../../helper/permission.js";

const editProductController = async (req, res) => {
  try {

    const sessionUser = req.userId;

    if (!uploadProductPermission(sessionUser)) {
        throw new Error("Permission Denied");
      }

    const {_id, ...resBody} = req.body;

    // console.log(req.body)

    const product = await Product.findByIdAndUpdate(_id, resBody);
      
    // console.log(product)

    res.status(200).json({
      data: product,
      success: true,
      error: false,
      message: "Product Edited Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export default editProductController;
