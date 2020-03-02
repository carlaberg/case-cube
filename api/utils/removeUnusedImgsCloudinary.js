const mongoose = require("mongoose");
const Case = mongoose.model("Case");
require('dotenv').config();
const fs = require('fs');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dhtmefcoz',
  api_key: '926247886774172',
  api_secret: 'MGZDjawGkbGG8cSNaVP5IN9XZ-8'
});

const { NODE_ENV, IMAGE_FOLDER, IMAGE_FOLDER_DEV } = process.env;

const removeUnusedImgsCloudinary = async () => {
  cloudinary.v2.api.resources({type: 'upload', max_results: 500, prefix: NODE_ENV == 'develop' ? IMAGE_FOLDER_DEV : IMAGE_FOLDER}, findFilesToRemove)
}
const findFilesToRemove = async (err, result) => {

  try {
    const cases = await Case.find({}, {'caseHeroImg.publicId': 1, 'casePics': 1, '_id': 0});

    const imgsDb = [];

    cases.forEach(item => {
      item.casePics.forEach(pic => {
        imgsDb.push(pic.publicId);
      })

      imgsDb.push(item.caseHeroImg.publicId);
    })

    const filesToRemove = [];
    const dbSet = new Set(imgsDb);

    console.log(dbSet);
    result.resources.forEach(resultItem => {
      if(!dbSet.has(resultItem['public_id'])){

          filesToRemove.push(resultItem.public_id);
      }
    });

    cloudinary.v2.api.delete_resources(filesToRemove, (error, result) => {
        if(error) {
          console.log(error.message);
        }
        console.log(result);
    });

  } catch (err) {
    console.error(err.message)
  }

}

module.exports = removeUnusedImgsCloudinary;
