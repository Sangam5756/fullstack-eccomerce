export const userLogout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "user logout successfully",
      error:false,
      data:[],
      success:true
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: true,
      error: false,
    });
  }
};
