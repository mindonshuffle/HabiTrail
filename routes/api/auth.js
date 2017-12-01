const router = require("express").Router();
const authController = require("../../controllers/authController");

// Matches with "/sessionId"
router.route("/sessionId")
    .get(authController.sessionId);

// // // Matches with "/api/user/:id"
// router.route("/:id")
//     .get(userController.find)
//     .put(userController.update)
//     .delete(userController.remove);

module.exports = router;