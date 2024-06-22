import express from "express";

const router = express.Router();

import { userSignUpController } from "../controller/user/userSignUp.controller.js";
import { userLogin } from "../controller/user/userLogin.controller.js";
import { userDetailsController } from "../controller/user/userDetails.controller.js";
import { authToken } from "../middleware/authToken.js";
import { userLogout } from "../controller/user/userLogout.js";
import { allUser } from "../controller/user/allUser.controller.js";
import updateUser from "../controller/user/updateUser.js";
import UploadProductcontroller from "../controller/product/UploadProduct.controller.js";
import getProductsController from "../controller/product/getAllProducts.controller.js";
import editProductController from "../controller/product/editProductController.js";
import getProductcategoryController from "../controller/product/getProductcategoryOne.Controller.js";
import GetCategoryWiseProductController from "../controller/product/GetCategoryWiseProductOne.Controller.js";
import { getProductDetailscontroller } from "../controller/product/getProductDetails.controller.js";
import addtoCartController from "../controller/user/addtoCartController.js";
import countAddToCart from "../controller/user/countAddToCartProduct.js";
import addToCartViewProduct from "../controller/user/addToCartViewProduct.js";
import { updateAddCartController } from "../controller/user/updateAddCartController.js";

router.post("/signup", userSignUpController);
router.post("/login", userLogin);
router.get("/user-details", authToken, userDetailsController);
router.get("/user-Logout", userLogout);

// Admin Panel
router.get("/all-users", authToken, allUser);
router.post("/update-user", authToken, updateUser);

// Product
router.post("/add-product", authToken, UploadProductcontroller);
router.get("/get-product", getProductsController);
router.post("/edit-product", authToken, editProductController);
router.get("/getProduct-category", getProductcategoryController);
router.post("/category-products", GetCategoryWiseProductController);
router.post("/product-details", getProductDetailscontroller);

// user add to cart
router.post("/add-to-cart", authToken, addtoCartController);
router.get("/countAddToCartProduct", authToken, countAddToCart);
router.get("/viewCartProduct", authToken, addToCartViewProduct);
router.post("/UpdateCartProduct", authToken, updateAddCartController);
export default router;
