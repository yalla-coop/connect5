const stringCutter = (string, isMobile) => {
  return string.length > 19 && isMobile ? `${string.slice(0, 15)}...` : string;
};

export default stringCutter;
