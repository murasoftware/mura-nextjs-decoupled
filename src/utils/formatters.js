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

export const youtubeDuration = (durationIn) => {
  if (!durationIn) return '';
  let duration = durationIn;
	let hours   = 0;
	let minutes = 0;
  let seconds = 0;
  let minutes_split;
  let hours_split;
  let seconds_split;
	duration = duration.replace('PT','');
	if (duration.indexOf('H') > -1) {
		hours_split = duration.split('H');
		hours       = parseInt(hours_split[0]);
		duration    = hours_split[1];
	}
	if (duration.indexOf('M') > -1) {
		minutes_split = duration.split('M');
		minutes       = parseInt(minutes_split[0]);
		duration      = minutes_split[1];
	}
	if (duration.indexOf('S') > -1) {
		seconds_split = duration.split('S');
		seconds       = parseInt(seconds_split[0]);
	}

  return `${hours > 0 ? `${hours}:` : ``}${minutes}:${seconds}`
}