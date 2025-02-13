export const addSpaceNumber = (value) => {
  return new Intl.NumberFormat('ru-RU').format(parseFloat(value));
};

export const addSpaceNumber2 = (value) => {
  return new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 }, { maximumFractionDigits: 2 }).format(parseFloat(value));
};
