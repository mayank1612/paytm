const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { Account, User } = require("../db");
const mongoose = require("mongoose");
const router = Router();

router.get("/balance", authMiddleware, async function (req, res) {
  const userId = req.userId;

  const account = await Account.findOne({ userId: userId });

  res.status(200).json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async function (req, res) {
  const userId = req.userId;

  const session = await mongoose.startSession();

  session.startTransaction();

  const { to, amount } = req.body;

  const senderInfo = await Account.findOne({ userId: userId }).session(session);
  const receiverInfo = await User.findOne({ username: to }).session(session);

  if (!senderInfo) {
    session.abortTransaction();
    return res.status(404).json({ message: "Sender account not found" });
  }

  if (!receiverInfo) {
    return res.status(404).json({ message: "Receiver is not a valid user" });
  }

  if (senderInfo.balance > amount) {
    const sender = await Account.updateOne(
      { userId: userId },
      { $inc: { balance: -amount } }
    ).session(session);

    const receiver = await Account.updateOne(
      { userId: receiverInfo._id },
      { $inc: { balance: amount } }
    ).session(session);

    if (!receiver || receiver?.modifiedCount === 0) {
      // Creating receiver account
      new Account({ userId: receiverInfo._id, balance: amount })
        .save()
        .session(session);

      session.commitTransaction();

      return res
        .status(404)
        .json({ message: "Receiver account created and amount transfered" });
    }

    session.commitTransaction();

    return res.status(200).json({ message: "Transfer successful" });
  }

  return res
    .status(403)
    .json({ message: "Insufficient balance", balance: senderInfo.balance });
});

module.exports = router;
