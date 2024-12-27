import User from "../../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("please Provide email");
    }
    if (!password) {
      throw new Error("please Provide password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const tokendData ={
        id :user._id,
        email:user.email
      }
      const token  =await jwt.sign(tokendData, process.env.SECRET_TOKEN_KEY, {expiresIn: 60 * 60 * 8})
      
      const tokenOption ={
        httpOnly:true,
        secure:true,
        sameSite:'None'
        
      }

      res.cookie( "token" , token , tokenOption ).status(200).json({
        data:token,
        message:"Login Succesfully",
        success:true,
        error:false
      })

    }
     else {
      throw new Error("Please check  Password");
    }
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
