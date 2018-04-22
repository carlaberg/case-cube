const mongoose = require("mongoose");
const Case = mongoose.model("Case");
const multer = require("multer");
const removeUnusedImgs = require('../utils/removeUnusedImgs');
const removeUnusedImgsCloudinary = require('../utils/removeUnusedImgsCloudinary');
const promisifyImageUpload = require('../utils/promisifyImageUpload');
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({
  destination: './public/uploads',
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
    res.send(req.file);
  })
}

const toDisk = multer({ storage: storage }).fields([{name: 'hero', maxCount: 1}, {name: 'casePics', maxCount: 20}]);

exports.upload = async (req, res, next) => {
  toDisk(req, res, async function (err) {
    if (err) {
      console.log(err.message);
    }

    try {

      const images = await promisifyImageUpload(req.files);

      res.send(images);

    } catch (err) {
      console.error(err.message);
    }
  })
}

const singleToDisk = multer({ storage: storage }).array('hero', 20);
exports.uploadSingle = async (req, res, next) => {
  singleToDisk(req, res, function (err) {
    if (err) {
      console.log(err.message);
    }
    res.send(req.files);
  })
}

exports.insertCase = async (req, res, next) => {

  console.log(req.body);
  try{
    const newcase = new Case(req.body);
    await newcase.save();
    res.json(newcase);
    console.log("case saved");
  } catch(err) {
    console.error(err.message);
  }

};

exports.updateCase = async (req, res, next) => {

  try {
    Case.findOneAndUpdate({caseId: req.body.caseId}, req.body, { new: true, overwrite: true, upsert: false, fields: {} }, (err, doc) => {
      if(err) {
        console.log('Could not update case', err);
      }
      removeUnusedImgs();
      removeUnusedImgsCloudinary();
      res.json(doc)
    })
  } catch(err) {
      console.log(err.message);
  }
};

exports.deleteCase = async (req, res, next) => {
  console.log(req.body);
  console.log(req.body.id);
  try {
    Case.remove({caseId: req.body.id}, (err, doc) => {
      if(err) {
        console.log('Could not remove', err);
      }
      removeUnusedImgs();
      removeUnusedImgsCloudinary();
      res.json(doc)
    });
  } catch(err) {
      console.log(err.message);
  }
};
