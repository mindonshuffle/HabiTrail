const router = require("express").Router();
const checkinController = require("../../controllers/checkinController");

// Matches with "/api/checkin"
router.route("/")
    .post(checkinController.create);

// // Matches with "/api/checkin/:id"
router.route("/:id")
    .get(checkinController.find)
    .put(checkinController.update)
    .delete(checkinController.remove);

module.exports = router;
