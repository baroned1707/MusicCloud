export const fixNumber = (number) => {
  return number >= 10 ? `${number}` : `0${number}`;
};

export const coverSecToMinute = (number) => {
  number = Math.floor(number);
  return `${fixNumber(Math.floor(number / 60))}:${fixNumber(Math.floor(number % 60))}`;
};
