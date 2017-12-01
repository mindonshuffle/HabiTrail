const router = require("express").Router();
const habitController = require("../../controllers/habitController.js");

// Matches with "/api/habit"
router.route("/")
    .get(habitController.find)
    .post(habitController.create);

// // Matches with "/api/habit/:id"
router.route("/:id")
    .get(habitController.find)
    .put(habitController.update)
    .delete(habitController.remove);

module.exports = router;
