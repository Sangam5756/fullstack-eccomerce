import Product from "../../model/product.model.js";

const getProductcategoryController = async (req, res) => {
  try {
    const ProductCategory = await Product.distinct("category");

    // console.log("Product Category", ProductCategory);

    // to store one product from  each category
    const productByCategory = [];

    for (const category of ProductCategory) {
      const product = await Product.findOne({ category: category });

      if (product) {
        productByCategory.push(product);
      }
    }
    res.status(200).json({
      data: productByCategory,
      error: false,
      success: true,
      message: "Product Category",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: false,
    });
  }
};

export default getProductcategoryController;
