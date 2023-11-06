// importing required module, fall back for wrong route
const router = require("express").Router();
const apiRoutes = require("./API");

router.use("/api", apiRoutes);

router.use((req, res) => res.send("Wrong route!"));

module.exports = router;