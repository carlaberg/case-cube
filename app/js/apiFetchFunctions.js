import { 
  ENDPOINT_LOGIN,
  ENDPOINT_CURRENT_USER,
  CLIENT_TOKEN
} from './utils/settings'

const token = localStorage.getItem(CLIENT_TOKEN)

export const postFileData = async (url, file) => {
    var formData = new FormData();
    formData.append('casePics', file);

    const headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers
    });

    const fileData = await response.json();

    return fileData;
};

export const getCases = () => {
    return fetch('/api/get-cases').then(response => response.json());
};

export const getFeaturedCases = (url = '/api/get-featured-cases') => {
    return fetch( url ).then(response => response.json());
};

export const uploadCasePics = async caseData => {
    const formData = new FormData();
    formData.append('casePics', caseData.caseHeroImg);
    caseData.casePics.map(pic => formData.append('casePics', pic));

    const profileHeaders = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let response = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
        headers: profileHeaders
    });
    let imgData = await response.json();

    return imgData;
};

export const addCase = async caseData => {
    
    const formData = new FormData();
    formData.append('hero', caseData.caseHeroImg.fileData);
    formData.append('video', caseData.caseVideo);
    caseData.casePics.map(pic => formData.append('casePics', pic.fileData));

    const profileHeaders = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    let response = await fetch('/api/profile', {
        method: 'POST',
        body: formData,
        headers: profileHeaders
    })
    .catch(err => {
      console.error(err.message);
    });

    const savedImgs = await response.json();

    const casePics = caseData.casePics.map((item, index) => {
      return {
        id: item.id,
        src: savedImgs.casePics[index]['secure_url'],
        caption: caseData.casePics[index].caption,
        publicId: savedImgs.casePics[index]['public_id']
      }
    });
    
    const caseVideo = savedImgs.video.length > 0 ? {
      src: savedImgs.video[0]['secure_url'],
      publicId: savedImgs.video[0]['public_id']
    } : null;

    const dbObject = {
        title: caseData.title,
        slug: caseData.title.toLowerCase().replace(' ', '-'),
        caseHeroImg: {
          src: savedImgs.hero[0]['secure_url'],
          caption: caseData.caseHeroImg.caption,
          publicId: savedImgs.hero[0]['public_id']          
        },
        caseVideo,
        caseInfo: caseData.caseInfo,
        casePics,
        description: caseData.description,
        order: caseData.order
    };

    const headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

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
    
    if(caseData.caseVideo && caseData.caseVideo.fileData) {
      formData.append('video', caseData.caseVideo.fileData);
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
          return {id: item.id, src, caption: item.caption, publicId }
      // If user hasn't choosen a new img resave the old one
      } else {
          return {
              id: item.id,
              src: item.src,
              caption: item.caption,
              publicId: item.publicId
          }
      }
    });
    
    const caseVideo = savedImgs.video.length > 0 ? {
      src: savedImgs.video[0] ? savedImgs.video[0]['secure_url'] : caseData.caseVideo.src,
      publicId: savedImgs.video[0] ? savedImgs.video[0]['public_id'] : caseData.caseVideo.publicId,
    } : null;

    const dbObject = {
        caseId: caseData.caseId,
        title: caseData.title,
        slug: caseData.title.toLowerCase().replace(' ', '-'),
        caseHeroImg: {
          src: savedImgs.hero[0] ? savedImgs.hero[0]['secure_url'] : caseData.caseHeroImg.src,
          caption: caseData.caseHeroImg.caption,
          publicId: savedImgs.hero[0] ? savedImgs.hero[0]['public_id'] : caseData.caseHeroImg.publicId
        },
        caseVideo,
        casePics,
        caseInfo: caseData.caseInfo,
        description: caseData.description,
        order: caseData.order
    };

    const headers = new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT',
        'Authorization': `Bearer ${token}`
    });

    return fetch('/api/update-case', {
        method: 'PUT',
        body: JSON.stringify(dbObject),
        headers: headers
    }).then(resp => resp.json());
};

export const deleteCase = id => {

  const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE',
      'Authorization': `Bearer ${token}`
  });

  return fetch('/api/delete-case', {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: headers
  }).then(resp => resp.json());

}

export const login = (credentials) => {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });

  return fetch(ENDPOINT_LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: headers
  }).then(resp => resp.json());
}

export const currentUser = (token) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return fetch(ENDPOINT_CURRENT_USER, {
      method: 'GET',
      headers: headers
  }).then(resp => resp.json());
}