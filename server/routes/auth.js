const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const verifyToken = require("../middleware/auth");

//route Post api/auth/
//desc check if user in login
// access public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "internal server error" });
  }
});

//route Post api/auth/register
//desc Resgister user
// access public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ success: false, message: "missing usename or password" });
  try {
    //check for exitsting user
    const user = await User.findOne({ username });

    if (user)
      return res.json({ success: false, message: "username already taken" });
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();

    //return token
    const accessToken = jwt.sign({ userId: newUser._id }, "skfhdjshdksf");

    res.json({
      success: true,
      message: "user created successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "internal server error" });
  }
});
//route Post api/auth/login
//desc login user
// access public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.json({ success: false, message: "missing usename or password" });
  try {
    //check for exitsting user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorect username  " });
    //username fourd
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorect password " });
    //all good
    //return token
    const accessToken = jwt.sign({ userId: user._id }, "skfhdjshdksf");

    res.json({
      success: true,
      message: "user logined in successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "internal server error" });
  }
});
module.exports = router;
