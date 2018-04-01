const router = require("express").Router();
const authController = require("../../controllers/authController");
const passport = require('passport');

// Matches with "/sessionId"
router.route("/sessionId")
    .get(authController.sessionId);

    // Matches with "/login"
// router.route("/login")
//     .post(authController.login);

router.route("/login")
    .post( 
        passport.authenticate('local-login', 
            { 
                successRedirect: '/dashboard',
                failureRedirect: '/signin'
            }
        )
    );

router.route("/signup")
    .post( 
        passport.authenticate('local-signup', 
            { 
                successRedirect: '/dashboard',
                failureRedirect: '/signin'
            }
        )
    );

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
