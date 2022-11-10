export const options = (currency = 'CAD') => {
  return {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  };
};

export const currencyFormatter = (price, options) => {
  const formatter = new Intl.NumberFormat(navigator.language, options());
  return formatter.format(price);
};

export const positiveNum = priceChangePercentage => {
  return priceChangePercentage > 0;
};
