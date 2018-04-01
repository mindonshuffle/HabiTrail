const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require('passport');

// Matches with "/userId"
router.route("/userId")
    .get(authController.userId);

router.route("/login")
    .post(passport.authenticate('local-login'));

router.route("/signup")
    .post(passport.authenticate('local-signup'));

// Matches with "/logout"
router.route("/logout")
    .get(authController.logout);

// // // Matches with "/api/user/:id"
// router.route("/:id")
//     .get(userController.find)
//     .put(userController.update)
//     .delete(userController.remove);

// app.get('/login', function(req, res) {
//     res.render('login', { user : req.user });
// });



module.exports = router;
