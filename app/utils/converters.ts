import { formatEther } from "ethers";

export const weiToEth = (wei: bigint) => {
  const etherValue = formatEther(wei.toString());
  return parseFloat(etherValue).toFixed(4);
};
