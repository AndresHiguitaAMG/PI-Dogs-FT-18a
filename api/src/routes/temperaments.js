const router = require('express').Router();
const { getTemperaments } = require("../controllers/temperamentsControllers");

router.get("/", getTemperaments);

module.exports = router;