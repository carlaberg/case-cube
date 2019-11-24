const cloudinary = require('cloudinary');
require('dotenv').config();
cloudinary.config({
  cloud_name: 'dhtmefcoz',
  api_key: '926247886774172',
  api_secret: 'MGZDjawGkbGG8cSNaVP5IN9XZ-8'
});

const promisifyMediaUpload = async mediaObject => {

    const uploadPromises = [];

    for (const prop in mediaObject) {

        mediaObject[prop].forEach(media => {
            if(prop === 'video') {
                const videoPromise = new Promise((resolve, reject) => {
                    cloudinary.v2.uploader.upload(media.path, {folder: process.env.NODE_ENV == 'develop' ? IMAGE_FOLDER_DEV : IMAGE_FOLDER, resource_type: 'video'}, function(error,result) {
                        if(error) {
                            reject(error.message);
                        }
                        resolve({caseMediaType: 'video', ...result});  
                    });
                })
                uploadPromises.push(videoPromise);
            } else {
                  const uploadPromise = new Promise((resolve, reject) => {
                      cloudinary.v2.uploader.upload(media.path, {folder: process.env.NODE_ENV == 'develop' ? IMAGE_FOLDER_DEV : IMAGE_FOLDER}, function(error,result) {
                          if(error) {
                              reject(error.message);
                          }
                          if(prop === 'hero') {
                              resolve({
                                  caseMediaType: 'hero', ...result
                              });
                          } else {
                              resolve({
                                  caseMediaType: 'casePic', ...result
                              });
                          }
                      });
                  })
                  uploadPromises.push(uploadPromise);
            }
        })
    }

    try {
        const savedMedia = await Promise.all(uploadPromises)

        const casePics = savedMedia.filter(media => media.caseMediaType === 'casePic');
        const hero = savedMedia.filter(media => media.caseMediaType === 'hero');
        const video = savedMedia.filter(media => media.caseMediaType === 'video');

        // Respopnse object to send back to client
        return { hero, casePics, video }

    } catch (err) {
        console.error(err.message);
    }


}

module.exports = promisifyMediaUpload;
