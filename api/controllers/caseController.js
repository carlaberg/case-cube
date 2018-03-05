const mongoose = require("mongoose");
const Case = mongoose.model("Case");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg")
  }
})

exports.getCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch(err) {
    console.error(err.message);
  }

};
const toMemory = multer({storage: multer.memoryStorage()}).single('casePics');

exports.uploadToMemory = (req, res, next) => {
  toMemory(req, res, function (err) {
    if (err) {
      console.log(err.message);
    }

    console.log(req.file);
    res.send(req.file);
  })
}

const toDisk = multer({ storage: storage }).array('casePics');

exports.upload = async (req, res, next) => {
  toDisk(req, res, function (err) {
    if (err) {
      console.log(err.message);
    }

    console.log(req.files);
    res.send(req.files);
  })
}

exports.insertCase = async (req, res, next) => {
  try{
    const newcase = new Case(req.body);
    await newcase.save();
    res.json(newcase);
    console.log("case saved");
  } catch(err) {
    console.error(err.message);
  }

};
