export const findItemToUpdate = (id, items) => {

  const itemToModify = items.findIndex(pic => pic.id === id);
  const itemsBefore = items.slice(0, itemToModify);
  const itemsAfter = items.slice(itemToModify + 1);

  return { itemToModify, itemsBefore, itemsAfter };
};

export const pxToInt = stringVariable => {
  return parseInt(stringVariable.slice(0, -2));
}