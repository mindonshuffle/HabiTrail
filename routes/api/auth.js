const router = require("express").Router();
const authController = require("../../controllers/authController");

// Matches with "/sessionId"
router.route("/sessionId")
    .get(authController.sessionId);

    // Matches with "/login"
router.route("/login")
    .get(authController.sessionId);

// Matches with "/logout"
router.route("/logout")
    .get(authController.sessionId);

// // // Matches with "/api/user/:id"
// router.route("/:id")
//     .get(userController.find)
//     .put(userController.update)
//     .delete(userController.remove);

// app.get('/login', function(req, res) {
//     res.render('login', { user : req.user });
// });

module.exports = router;
