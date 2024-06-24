import Product from "../../model/product.model.js";
export const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");

    const product = await Product.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });

    res.json({
      data: product,
      error: false,
      success: true,
      message: "search success",
    });

    console.log(query);
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
