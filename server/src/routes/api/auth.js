const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // .select("-password") : password는 보여주지않겠다 (-)
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error !");
  }
});

// @route   POST api/auth
// @desc    Login user
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // 1. 유저가 있는지 확인한다.
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "유저 정보가 존재하지 않습니다. " }] });
      }

      // 2. 패스워드 검증
      // password : 입력받은 Password
      // user.password : 암호화되어서 저장되어있다.
      // bcrypt.compare() : user.password를 해독해서 password와 일치하는지 확인
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ errors: [{ msg: "패스워드가 일치하지 않습니다." }] });
      }

      // 3. Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, "jong", { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error!");
    }
  }
);

module.exports = router;
