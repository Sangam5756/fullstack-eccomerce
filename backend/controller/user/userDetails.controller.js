import User from "../../model/user.model.js"
export const userDetailsController =async (req, res) => {
  try {

    
    const user = await User.findById(req.userId)
    
   res.status(200).json({
      data:user,
      success:true,
      error:false,
      message:"User Details"
    })





  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
