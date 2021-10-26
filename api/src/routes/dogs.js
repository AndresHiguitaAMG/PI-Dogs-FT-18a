const router = require('express').Router();
const { getDogs, getDogsById, postDogs } = require('../controllers/dogsControllers');

router.get("/", getDogs);
router.get("/:id", getDogsById);
router.post("/create", postDogs);

module.exports = router;