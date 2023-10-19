const firstUpper = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const join = (...str: (string | undefined)[]) => str.filter(Boolean).join(' ');

export default {
  firstUpper,
  join,
};
