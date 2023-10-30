const express = require("express");
const authController = require("../components/authController");
const profileController = require("../components/profileController");
const passport = require("passport");
const passportConfig = require("../config/passport");

passportConfig(passport);

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// authentication routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signIn);
router.get(
  "/designed",
  passport.authenticate("jwt", { session: false }),
  authController.checkUserDesignation
);
router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profileController.addUserProfile
);
router.get(
  "/registered",
  passport.authenticate("jwt", { session: false }),
  authController.getRegistrationStatus
);

module.exports = router;
