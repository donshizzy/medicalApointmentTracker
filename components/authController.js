const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const { hashpassword, comparepassword } = require("../utils/ppidSec");
const {
  generateAccessToken,
  refreshToken,
  verifyToken,
} = require("../utils/tokenDetails");

const signup = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({
        status: 400,
        message: "All required fields must be provided",
      });
    }
    const existingUser = await User.findOne({ $or: [{ email, username }] });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        message: "User already exists",
      });
    }
    const hashDigit = await hashpassword(password);
    const user = new User({
      username:email,
      email:username,
      password: hashDigit,
    });
    await user.save();

    const token = generateAccessToken({
      userId: user._id,
      username: user.username,
      email: user.email,
    });
    console.log(user, token);
    return res.status(201).json({
      status: 201,
      message: "Signup successful",
      user: {
        userId: user._id,
        email: user.email, 
        username: user.username,
      },
      token: "JWT " + token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "All input fields are required",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found, get registered",
      });
    }
    const validatePassword = await comparepassword(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({
        status: 401,
        message: "Invalid password",
      });
    }
    const token = generateAccessToken({ userId: user._id });
    return res.status(200).json({
      status: 200,
      message: "Successful login",
      user: { userId: user._id, email: user.email, username: user.username },
      token: "JWT " + token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const refreshUserToken = async (req, res) => {
  try {
    const refreshedToken = req.headers.authorization.split(" ")[1];
    console.log(req.headers);
    if (!refreshedToken) {
      return res.status(400).json({
        status: 400,
        message: "Refresh token not provided",
      });
    }

    const decodedToken = verifyToken(refreshedToken);
    if (!decodedToken || !decodedToken.userId) {
      return res.status(400).json({
        status: 400,
        message: "Invalid refresh token",
      });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const accessToken = generateAccessToken({ userId: user._id });

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
const checkUserDesignation  = async (req, res)=>{
  const user = req.user._id;
  let userDesignation = '';
  const confirmUserProfile = await Profile.findOne({userId: user});
  if(user && confirmUserProfile){
    const  userDesignation =  confirmUserProfile.designation;
  
  }
  return res.status(200).json({message:`user designation is ${userDesignation}`})

}

const getRegistrationStatus = async (req,res)=>{
  
  const user = req.user._id;
  /* const userRegistrationStatus = user.registered;*/
  try {
    const userProfile = await Profile.findOne({userId:user});
    if (!userProfile)
    {
      user.registered = false;
      return res.status(400).json({registered:false, message: "User not found"});

    }
    user.registered = true;
    await user.save();
    return res.status(200).json({ registered: true , userProfile});
    
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message);
  }
}

module.exports = {
  signup,
  signIn,
  refreshUserToken,
  checkUserDesignation,
  getRegistrationStatus,
};
