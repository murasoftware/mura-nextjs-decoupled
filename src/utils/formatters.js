/* eslint-disable */
export const priceShort = value => {
  var val = +value;
  if (val < 1000) {
    return '$' + value;
  }

  if (val < 1000000) {
    return '$' + (val / 1000).toFixed(2) + ' K';
  }

  if (val < 1000000000) {
    return '$' + (val / 1000000).toFixed(2) + ' MM';
  }

  if (val < 1000000000000) {
    return '$' + (val / 1000000000).toFixed(2) + ' B';
  }
};

export const numbers = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberAsShorthand = value => {
  var val = +value;
  if (val < 1000) {
    return '$' + value;
  }

  if (val < 1000000) {
    return '$' + (val / 1000).toFixed(2) + ' K';
  }

  if (val < 1000000000) {
    return '$' + (val / 1000000).toFixed(2) + ' MM';
  }

  if (val < 1000000000000) {
    return '$' + (val / 1000000000).toFixed(2) + ' B';
  }

  if (val < 1000000000000000) {
    return '$' + (val / 1000000000000).toFixed(2) + ' T';
  }
};
