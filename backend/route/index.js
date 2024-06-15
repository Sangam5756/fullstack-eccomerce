import express from "express";
import { userSignUpController } from "../controller/userSignUp.controller.js";
import { userLogin } from "../controller/userLogin.controller.js";
import {userDetailsController, } from "../controller/userDetails.controller.js";
import {authToken} from "../middleware/authToken.js";

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", userLogin);
router.get("/user-details",authToken, userDetailsController);

export default router;
