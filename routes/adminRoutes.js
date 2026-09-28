const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/admin/offres", adminController.getAllOffres);

router.get("/admin/offres/create",adminController.showCreateForm);

router.post("/admin/offres",adminController.createOffre);

module.exports = router;