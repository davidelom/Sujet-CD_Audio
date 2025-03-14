const express = require("express");
const router = express.Router();
const cdController = require("../controllers/cdController");

router.get("/cds", cdController.getAllCDs);
router.post("/cds", cdController.addCD);
router.delete("/cds/:id", cdController.deleteCD);

module.exports = router;
