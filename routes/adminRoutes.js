const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/admin/offres", adminController.getAllOffres);

router.get("/admin/offres/create",adminController.showCreateForm);

router.post("/admin/offres",adminController.createOffre);


router.get("/admin/offres/:id/edit",adminController.showEditForm);

router.post("/admin/offres/:id/edit",adminController.updateOffre);

router.post("/admin/offres/:id/delete",adminController.deleteOffre
);

module.exports = router;