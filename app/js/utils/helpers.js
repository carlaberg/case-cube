export const findItemToUpdate = ( id, items ) => {

  const itemToModify = items.findIndex(pic => pic.id === id);
  const itemsBefore = items.slice(0, itemToModify);
  const itemsAfter = items.slice(itemToModify + 1);

  return { itemToModify, itemsBefore, itemsAfter };
};

export const pxToInt = stringVariable => {
  return parseInt(stringVariable.slice(0, -2));
}

export const twoDigitDate = monthOrDay => {
  return monthOrDay < 10 ? '0' + monthOrDay : '' + monthOrDay;
}

export const formatDate = date => {
  const createdDate = new Date( date );
  const y = createdDate.getFullYear();
  const m = twoDigitDate( createdDate.getMonth() );
  const d = twoDigitDate( createdDate.getDate() );
  
  return `${y}-${m}-${d}`;
}