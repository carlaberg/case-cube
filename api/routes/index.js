const express = require("express");
const assert = require("assert");
const caseController = require("../controllers/caseController");
const mongoose = require("mongoose");
const Case = mongoose.model("Case");
const multer = require("multer");


const router = express.Router();

// Get

router.get("/api/get-cases", caseController.getCases);

// Post

router.post("/api/profile", caseController.upload);

router.post("/api/upload-single", caseController.uploadSingle);

router.post("/api/tomemory", caseController.uploadToMemory);

router.post("/api/insert-case", caseController.insertCase);

// Put

router.put("/api/update-case", caseController.updateCase);

router.put("/api/update-hero", caseController.updateHero);

module.exports = router;
