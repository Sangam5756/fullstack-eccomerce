import Product from "../../model/product.model.js";
export const filterProduct = async (req, res) => {
  try {
    const categoryList = req?.body?.category;

    const product = await Product.find({
      category: {
        $in: categoryList,
      },
    });

    res.json({
      data: product,
      message: "category List",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
