const mongoose = require("mongoose");
const Case = mongoose.model("Case");
const fs = require('fs');

const removeUnusedImgs = async () => {

  try {
    const cases = await Case.find({}, {'caseHeroImg.src': 1, 'casePics': 1, '_id': 0});
    console.log(cases);

    const imgsDb = [];

    cases.forEach(item => {
      item.casePics.forEach(pic => {
        imgsDb.push(pic.src.replace('/uploads/', ''));
      })
      imgsDb.push(item.caseHeroImg.src.replace('/uploads/', ''));
    })

    fs.readdir(__basedir + '/public/uploads', (err, files) => {
      if(err) throw err;

      const dbSet = new Set(imgsDb);
      const filesToRemove = files.filter(file => !dbSet.has(file))

      filesToRemove.forEach(file => {
        fs.unlink(__basedir + `/public/uploads/${file}`, err => {
          if(err) throw err;
          console.log('Image deleted');
        });
      })
    })

  } catch (err) {
    console.error(err.message)
  }
}

module.exports = removeUnusedImgs;
