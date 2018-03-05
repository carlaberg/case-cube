const express = require("express");
const assert = require("assert");
const caseController = require("../controllers/caseController");
const mongoose = require("mongoose");
const Case = mongoose.model("Case");
const multer = require("multer");


const router = express.Router();

//Get cases

router.get("/api/get-cases", caseController.getCases);


router.post("/api/profile", caseController.upload);

router.post("/api/tomemory", caseController.uploadToMemory);


//Save cases to database

router.post("/api/insert-case", caseController.insertCase);

router.put("/api/update-hero", caseController.updateHero);

module.exports = router;
