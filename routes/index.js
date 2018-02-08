const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);
    
// If no API routes are hit, send the React app

router.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, "..views/login.html"));
})

router.use(function(req, res) {
  // res.sendFile(path.join(__dirname, "../client/build/index.html"));
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;
