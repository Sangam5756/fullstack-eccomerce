import React from "react";
import Product from "../../model/product.model.js";

const GetCategoryWiseProductController = async (req, res) => {
  try {
    const { category } = req?.body  || req?.query;
    const product = await Product.find({ category });

    res.json({
      data: product,
      message: "Product",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

export default GetCategoryWiseProductController;
