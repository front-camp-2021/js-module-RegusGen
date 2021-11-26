export const prepareFilters = (arr) => {
  return arr.map(item => {
    return {
      value: item.toLowerCase().split(' ').join('_').replace('4', '4-'),
      checked: false,
      title: item
    }
  });
};
