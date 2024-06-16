import User from "../model/user.model.js";

export const allUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    console.log(allUsers)
    console.log("userId", req.userId);

    res.status(200).json({
      data:allUsers,
      message:"All users",
      error:false,
      success:true
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
