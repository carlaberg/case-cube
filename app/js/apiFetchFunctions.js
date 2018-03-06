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
  console.log('nu har jag kommit till add case med redux');
  console.log(caseData);
    // const formData = new FormData();
    // formData.append('casePics', caseData.caseHeroImg);
    // caseData.casePics.map(pic => formData.append('casePics', pic));
    //
    // let response = await fetch('/api/profile', {
    //     method: 'POST',
    //     body: formData
    // });
    // let imgData = await response.json();
    //
    // const casePics = imgData
    //     .filter((img, index) => index != 0)
    //     .map(pic => pic.filename);
    //
    // const dbObject = {
    //     title: caseData.title,
    //     caseHeroImg:
    //         imgData.length > 0 ? imgData[0].filename : caseData.caseHeroImg,
    //     casePics,
    //     description: caseData.description
    // };
    //
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    //
    // return fetch('/api/insert-case', {
    //     method: 'post',
    //     body: JSON.stringify(dbObject),
    //     headers: headers
    // }).then(resp => resp.json());
};

export const updateHero = async (id, hero) => {

    const formData = new FormData();
    formData.append('casePics', hero);

    let response = await fetch('/api/profile', {
        method: 'POST',
        body: formData
    });
    let imgData = await response.json();

    const dbObject = { id, hero: imgData[0].filename};

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
