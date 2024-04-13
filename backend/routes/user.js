const { Router } = require("express");
const { z } = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const router = Router();

router.post("/signup", async (req, res) => {
  const params = req.body;
  const { username, password, firstName, lastName } = params;

  const userSchema = z.object({
    username: z.string().email(),
    firstName: z.string().min(3),
    lastName: z.string().min(1),
    password: z.string().min(3),
  });

  const validateUser = userSchema.safeParse({
    username,
    password,
    firstName,
    lastName,
  });

  if (validateUser.success) {
    const found = await User.findOne({
      username: validateUser.data.username,
    });

    if (found) {
      res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    } else {
      const user = new User({
        username: validateUser.data.username,
        firstName: validateUser.data.firstName,
        lastName: validateUser.data.lastName,
      });

      const hashedPassword = await user.createHash(password);
      user.password_hash = hashedPassword;

      console.log({ user });

      user.save();
      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      res
        .status(200)
        .json({ mesasge: "User created successfully", token: token });
    }
  } else {
    res.status(400).json({
      message: "Invalid input",
    });
  }
});

router.post("/signin", async (req, res) => {
  const params = req.body;
  const { username, password } = params;

  const userSchema = z.object({
    username: z.string().email(),
    password: z.string().min(3),
  });

  const validateUser = userSchema.safeParse({
    username,
    password,
  });

  if (validateUser.success) {
    const userInfo = await User.findOne({
      username: validateUser.data.username,
    });

    if (userInfo) {
      const isPasswordCorrect = await userInfo.validatePassword(password);

      if (!isPasswordCorrect) {
        res.status(411).json({
          message: "Error while logging in",
        });
      } else {
        const token = jwt.sign(
          { userId: userInfo._id ?? userInfo.id },
          JWT_SECRET
        );

        res.status(200).json({
          token: token,
        });
      }
    } else {
      res.status(411).json({
        message: "Invalid user schema",
      });
    }
  } else {
    res.status(400).json({
      message: "Invalid input",
    });
  }
});

module.exports = router;
