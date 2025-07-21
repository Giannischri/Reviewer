import { Criterion } from '../models/criterion'

export interface CriterionNode extends Criterion {
  children?: CriterionNode[];
  score?: number;  // optional, for user input or calculation
}
