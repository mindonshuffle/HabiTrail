const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);

//temporary login redirect

// router.get("/login", function(req, res) {
//   res.sendFile(path.join(__dirname, "../views/login.html"));
// });
    
// If no API routes are hit, send the React app

router.use(function(req, res) {
  console.log('Express loading default page...');
  // res.sendFile(path.join(__dirname, "../client/build/index.html"));
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

module.exports = router;
