import { TaxDistribution } from "./TaxDistribution";

export interface TaxesDistributionDeclaration {
  submitted: boolean;
  distributions: TaxDistribution[];
}
