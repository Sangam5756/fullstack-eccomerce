import express from "express";

const router = express.Router();

import { userSignUpController } from "../controller/userSignUp.controller.js";
import { userLogin } from "../controller/userLogin.controller.js";
import { userDetailsController } from "../controller/userDetails.controller.js";
import { authToken } from "../middleware/authToken.js";
import { userLogout } from "../controller/userLogout.js";
import { allUser } from "../controller/allUser.controller.js";
import updateUser from "../controller/updateUser.js";
import UploadProductcontroller from "../controller/UploadProduct.controller.js";
import getProductsController from "../controller/getAllProducts.controller.js";
import editProductController from "../controller/editProductController.js";

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

export default router;
