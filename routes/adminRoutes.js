const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/admin/offres", adminController.getAllOffres);

module.exports = router;