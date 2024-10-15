import jwt from "jsonwebtoken";

export const authToken = async (req, res, next) => {
  try {
    let token = req.cookies?.token
    // console.log("Token",token)

    if (!token) {
      return res.status(200).json({
        message: "Please login....",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
      // console.log(err), console.log("decoded", decoded);  // to print the value of the decoded token

      if (err) {
        console.log("err in auth", err);
      }

      req.userId = decoded?.id;
      
      next();
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};
