export const statsSchema = {
  Notional: {
    name: 'Notional Traded',
    historical: 'IexNotional',
    data: 'IexNotional',
    minute: 'IexNotional',
    dataType: 'priceShort',
  },
  MatchedVolume: {
    name: 'Matched Volume',
    historical: 'IexCumQty',
    data: 'IexCumQty',
    minute: 'IexCumQty',
  },
  MarketShare: {
    name: 'Market Share',
    historical: 'IexMarketBps',
    data: 'IexMarketBps',
    minute: 'IexMarketBps',
    dataType: 'percentageString',
  },
  Orders: {
    name: 'Orders',
    historical: 'FixMessage_NewOrderSingleFromBroker',
    data: 'FixMessage_NewOrderSingleFromBroker',
    minute: 'Orders',
  },
  Routed: {
    name: 'Routed',
    historical: 'RoutedCumQty',
    data: 'RoutedCumQty',
    minute: 'RoutedCumQty',
  },
  Trades: {
    name: 'Trades',
    historical: 'NumberOfIexTrades',
    data: 'NumberOfIexTrades',
    minute: 'IexTrades',
  },
  VolumePrediction: {
    name: 'Volume Prediction',
    historical: 'IexCumQty',
    data: 'Prediction',
  },
  MarketVolume: {
    name: 'Market Volume',
    historical: 'MarketVolume',
    data: 'MarketCumQty',
    minute: 'MarketVolume',
  },

};

