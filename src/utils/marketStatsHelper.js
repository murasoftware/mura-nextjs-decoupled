import {statsSchema} from '@utils/schema';
import { numbers, numberAsShorthand } from './formatters';

export const calculateMarketStats = ({ historicalData, realTime } = {}) => {
  const outArray = [];
  Object.keys(statsSchema).forEach(key => {
    let outObject = {};
    const schemaObject = statsSchema[key];
    const { historical, data } = schemaObject;

    outObject = { ...schemaObject };
    
    if (historicalData && historicalData[historical]) {
      outObject.historical = historicalData[historical].RecordValue;
    }
    if (realTime && realTime[data]) {
      outObject.realTime = realTime[data].Count;
    }

    
    if ( key && key.toLowerCase() === 'notional' ) {
      outObject.realTime = +outObject.realTime / 10000;
      outObject.historical = +outObject.historical / 10000;
    }

    if (outObject.realTime) {
      if (outObject.dataType === 'percentageString') {
        outObject.realTime = `${(outObject.realTime * 100).toFixed(3)}%`;
      } else if (outObject.dataType === 'priceShort') {
        outObject.realTime = numberAsShorthand(outObject.realTime);
      } else if (key && key.toLowerCase() === 'notional' ) {
        outObject.realTime = numberAsShorthand(outObject.realTime);
      } else {
        outObject.realTime = numbers(outObject.realTime);
      }
    }

    outArray.push(outObject);
  });

  return outArray;
};
