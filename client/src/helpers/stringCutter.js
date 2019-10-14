const stringCutter = string => {
  return string.length > 19 ? `${string.slice(0, 15)}...` : string;
};

export default stringCutter;
