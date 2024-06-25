import User from "../../model/user.model.js";

const updateUser = async (req, res) => {
  try {
    const sessionUser = req.userId;

    // console.log(sessionUser);

    const { userId, email, name, role } = req.body;
      // console.log(req.body)
    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    const user = await User.findById(sessionUser);
    // console.log("user.role", user.role);
    // console.log("payload", payload);

    const updateUser = await User.findByIdAndUpdate(userId,payload);
    // console.log("updated User", updateUser);

    res.json({
      data: updateUser,
      message: "User Details updated",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
      data: [],
    });
  }
};

export default updateUser;
