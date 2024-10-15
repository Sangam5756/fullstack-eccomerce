import User from "../../model/user.model.js";
import bcrypt from "bcryptjs";

export const userSignUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({email});

    if(user){
      throw new Error("User Already exists")
    }

    if (!email) {
      throw new Error("please provide email");
    }

    if (!name) {
      throw new Error("please provide name");
    }

    if (!password) {
      throw new Error("please provide password");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if(!hashPassword){
        throw new Error("Something is Wrong")
    }

    const payload = {
        ...req.body,
        role:"GENERAL",
        password:hashPassword
    }

    const userdata = new User(payload);

    const newuser =await userdata.save();
    
    res.status(201).json({
        data:newuser,
        success:true,
        error:false,
        message:"User created successfully"
    })


  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
