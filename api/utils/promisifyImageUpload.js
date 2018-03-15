const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'dhtmefcoz',
  api_key: '926247886774172',
  api_secret: 'MGZDjawGkbGG8cSNaVP5IN9XZ-8'
});

const promisifyImageUpload = async imageObject => {

    const uploadPromises = [];

    for (const prop in imageObject) {

        imageObject[prop].forEach(img => {
            const uploadPromise = new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload(img.path, function(error,result) {
                    if(error) {

                        reject(error.message);
                    }
                    if(prop === 'hero') {
                        resolve({
                            caseImageType: 'hero', ...result
                        });
                    } else {
                        resolve({
                            caseImageType: 'casePic', ...result
                        });
                    }
                });
            })
            uploadPromises.push(uploadPromise);
        })
    }

    try {
        const savedImages = await Promise.all(uploadPromises)

        const casePics = savedImages.filter(img => img.caseImageType === 'casePic');

        const responseObject = {
            hero: savedImages[0],
            casePics
        }

        return responseObject;
    } catch (err) {
        console.error(err.message);
    }


}

module.exports = promisifyImageUpload;
