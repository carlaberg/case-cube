const express = require("express");
const assert = require("assert");
const caseController = require("../controllers/caseController");
const { signIn, protect, currentUser } = require("../controllers/authController");
const mongoose = require("mongoose");
const Case = mongoose.model("Case");
const multer = require("multer");

const router = express.Router();

// Get

router.get("/api/get-cases", caseController.getCases);

router.get("/api/get-featured-cases", caseController.getFeaturedCases);

router.get("/api/current-user", protect, currentUser);

// Post

router.post("/api/profile", protect, caseController.upload);

router.post("/api/upload-single", protect, caseController.uploadSingle);

router.post("/api/tomemory", protect, caseController.uploadToMemory);

router.post("/api/insert-case", protect, caseController.insertCase);

router.post("/api/sign-in", signIn);

// Put

router.put("/api/update-case", protect, caseController.updateCase);

// Delete

router.delete("/api/delete-case", protect, caseController.deleteCase);

module.exports = router;
