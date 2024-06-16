import User from "../model/user.model";

export const updateUser = async (req,res) =>{


    try {

        const sessionUser = req.userId;

        const { userId,email,name,role  } =req.body;

        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role})
        }

        const user = await User.findById(sessionUser);
        console.log(user.role);

        const updatedUser = await User.findByIdAndUpdate(userId,payload)

        res.status(200).json({
            data:updatedUser,
            success:true,
            error:false,
            message:"User Details"
          })

    } 
    catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false,
          });
        
    }
}