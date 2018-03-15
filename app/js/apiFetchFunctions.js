export const postFileData = async (url, file) => { d
    var formData = new FormData();
    formData.append('casePics', file);

    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });

    const fileData = await response.json();

    return fileData;
};

export const getCases = () => {
    return fetch('/api/get-cases').then(response => response.json());
};

export const uploadCasePics = async caseData => {
    const formData = new FormData();
    formData.append('casePics', caseData.caseHeroImg);
    caseData.casePics.map(pic => formData.append('casePics', pic));

    let response = await fetch('/api/profile', {
        method: 'POST',
        body: formData
    });
    let imgData = await response.json();

    return imgData;
};

export const addCase = async caseData => {
  console.log(caseData);
    const formData = new FormData();
    formData.append('hero', caseData.caseHeroImg.fileData);
    caseData.casePics.map(pic => formData.append('casePics', pic.fileData));

    let response = await fetch('/api/profile', {
        method: 'POST',
        body: formData
    });

    const savedImgs = await response.json();

    const casePics = caseData.casePics.map((item, index) => {
      return {
        id: item.id,
        src: savedImgs.casePics[index]['secure_url'],
        publicId: savedImgs.casePics[index]['public_id']
      }
    });
    console.log('52', savedImgs);
    const dbObject = {
        title: caseData.title,
        caseHeroImg: {
          src: savedImgs.hero[0]['secure_url'],
          publicId: savedImgs.hero[0]['public_id']
        },
        casePics,
        description: caseData.description
    };
    console.log('61', dbObject);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    return fetch('/api/insert-case', {
        method: 'post',
        body: JSON.stringify(dbObject),
        headers: headers
    }).then(resp => resp.json());
};

export const updateCase = async caseData => {

    const formData = new FormData();
    if(caseData.caseHeroImg.fileData) {
      formData.append('hero', caseData.caseHeroImg.fileData);
    }
    caseData.casePics.map(pic => {
      if(pic.fileData) {
        formData.append('casePics', pic.fileData)
      }
    });

    let response = await fetch('/api/profile', {
        method: 'POST',
        body: formData
    });
    let savedImgs = await response.json();

    let count = 0;
    const casePics = caseData.casePics.map((item, index) => {

      // Only update the images that have changed (received new fileData when user picked a new file)
      if(item.fileData) {
          const src = savedImgs.casePics[count]['secure_url'];
          const publicId = savedImgs.casePics[count]['public_id'];
          count++
          return {id: item.id, src, publicId }
      // If user hasn't choosen a new img resave the old one
      } else {
          return {
              id: item.id,
              src: item.src,
              publicId: item.publicId
          }
      }

    });

    const dbObject = {
        caseId: caseData.caseId,
        title: caseData.title,
        caseHeroImg: {
          src: savedImgs.hero[0] ? savedImgs.hero[0]['secure_url'] : caseData.caseHeroImg.src,
          publicId: savedImgs.hero[0] ? savedImgs.hero[0]['public_id'] : caseData.caseHeroImg.publicId,
        },
        casePics,
        description: caseData.description
    };

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT',
    });

    return fetch('/api/update-case', {
        method: 'PUT',
        body: JSON.stringify(dbObject),
        headers: headers
    }).then(resp => resp.json());
};

export const updateHero = async (id, hero) => {

    const formData = new FormData();
    formData.append('hero', hero);

    let response = await fetch('/api/upload-single', {
        method: 'POST',
        body: formData
    });
    let imgData = await response.json();

    const dbObject = { id, hero: `/uploads/${imgData[0].filename}` };

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT',
    });

    return fetch('/api/update-hero', {
        method: 'PUT',
        body: JSON.stringify(dbObject),
        headers: headers
    }).then(resp => resp.json());
};

export const deleteCase = id => {

  const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE',
  });

  return fetch('/api/delete-case', {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: headers
  }).then(resp => resp.json());

}
