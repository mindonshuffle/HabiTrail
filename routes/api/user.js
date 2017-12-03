const router = require("express").Router();
const userController = require("../../controllers/userController.js");

// Matches with "/api/user"
router.route("/")
    // .get(userController.find)
    .post(userController.create);

// // Matches with "/api/user/:id"
router.route("/:id")
    .get(userController.find)
    .put(userController.update)
    .delete(userController.remove);

router.route("/:id/habit")
    .get(userController.findHabits);

router.route("/:id/checkin")
    .get(userController.findCheckins);

router.route("/:id/checkin/:date")
    .get(userController.findCheckinsByDate);

module.exports = router;
