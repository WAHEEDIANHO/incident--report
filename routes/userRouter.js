const express = require("express");
const User = require("../models/user");
const forbiddenMethod = require("../controllers/forbiddenMethod");
const {
  addUser,
  deleteUserByID,
  getUserByID,
  getUsers,
  updateUserByID,
} = require("../controllers/userController");
const passport = require("passport");
const authenticate = require("../authenticate");
const { verifyUser, verifyAdmin } = require("../authenticate");


const router = express.Router();

router.post("/signup", (req, res) => {

      req.body.username = req.body.username;
      req.body.admin = false;
      User.register(
        new User({ ...req.body }),
        req.body.password,
        (err, user) => {
          if (err) {
            res.statusCode = 500;
            // res.setHeader("Content-type", "application/json");
            console.log(err);
            return res.json({ err: err });
          } else {
            passport.authenticate("local")(req, res, () => {
              res.statusCode = 200;
              res.setHeader("Content-type", "application/json");
              return res.json({ success: true, status: "reg successful" });
            });
          }
        }
      );
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id, role: req.user.role });
  console.log(authenticate.getUserId(token));
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.json({
    success: true,
    token: token,
    _id: req.user._id,
    role: req.user.role,
    status: "You are successfully loged in",
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("session-id");
  res.send("Logout successsfully");
});

router.post("/change_password", verifyUser, (req, res) => {
  console.log(req.body);
  const { email, oldPassword, newPassword } = req.body;
  User.findByUsername(email)
    .then((user) => {
      console.log("ressetting password");
      user.changePassword(oldPassword, newPassword, (err) => {
        if (!err) {
          user.save();
          res.json({ success: true });
        } else {
          const err = new Error();
          err.message = "Error chnnage password";
          res.status(500).json({ err: err });
        }
      });
    })
    .catch((err) => res.status(500).json({ err: "user not find" }));
});

router
  .route("/")
  .get(verifyUser, getUsers)
  .post(forbiddenMethod)
  .put(forbiddenMethod)
  .delete(forbiddenMethod);

router
  .route("/:id")
  .get(verifyUser, getUserByID)
  .post(forbiddenMethod)
  .put(verifyUser, updateUserByID)
  .delete(verifyUser, verifyAdmin, deleteUserByID);

module.exports = router;
