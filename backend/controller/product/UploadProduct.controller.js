import uploadProductPermission from "../../helper/permission.js";
import Product from "../../model/product.model.js";
const UploadProductcontroller = async (req, res) => {
  try {
    const sessionUser = req.userId;

    if (!uploadProductPermission(sessionUser)) {
      throw new Error("Permission Denied");
    }

    const uploadProduct = await new Product(req.body);

    const savedProduct = await uploadProduct.save();
    console.log(savedProduct);

    res.status(200).json({
      data: savedProduct,
      message: "Product Saved SuccessFully",
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

export default UploadProductcontroller;
