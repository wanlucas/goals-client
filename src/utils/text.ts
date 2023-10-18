const firstUpper = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const join = (...str: string[]) => str.join(' ');

export default {
  firstUpper,
  join,
};
