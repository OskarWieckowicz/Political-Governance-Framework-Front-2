export const weiToEth = (wei) => {
  const ethValue = wei / 1e18;
  return ethValue.toFixed(4);
};
