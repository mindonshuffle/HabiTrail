const router = require("express").Router();
const userRoutes = require("./user");
const habitRoutes = require("./habit");
const checkinRoutes = require("./checkin");
const authRoutes = require("./auth");

router.use("/user", userRoutes);
router.use("/habit", habitRoutes);
router.use("/checkin", checkinRoutes);
router.use("/auth", authRoutes);

module.exports = router;