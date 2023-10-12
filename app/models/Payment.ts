export interface Payment {
  percentage: number;
  destination: string;
  contractAddress: string;
  toBePaid: bigint;
  paid: bigint;
}
