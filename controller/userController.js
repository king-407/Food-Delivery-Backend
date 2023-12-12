const User = require("../model/user");
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      next("Please enter all details");
    }
    const ifExist = await User.findOne({ email });
    if (ifExist) {
      return next("User with this email already exists");
    }

    const user = new User({
      name,
      email,
      password,
    });
    if (req.body.isAdmin) {
      user.isAdmin = true;
    }
    await user.save();
    const token = user.createJWT();
    return res.status(200).json({ token, user });
  } catch (e) {
    console.log(e);
  }
};
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please provide field");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next("user not found");
    }
    const isMatch = await user.comparePassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return next("Invalid credentials");
    }
    const token = user.createJWT();
    return res.status(200).json({ success: "true", user, token });
  } catch (e) {
    next(e);
  }
};
module.exports = { signup, loginController };
