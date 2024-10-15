import React from "react";
import Product from "../../model/product.model.js"
export const getProductDetailscontroller = async (req, res) => {
  try {

    const {Productid} = req.body;
    

    const productDetail = await Product.findById(Productid);
  

    res.json({
        message:"ProductData",
        success:true,
        error:false,
        data:productDetail
    })


  } catch (error) {
    res.status(400).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
