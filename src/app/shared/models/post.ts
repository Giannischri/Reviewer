export interface Post {
  id: number; // Use 'number' for Long in TypeScript
  title: string;
  managerId: number; // Use 'number' for Long in TypeScript
  description: string;
  image: string;
  finalized: boolean;
  open: boolean;
  rankers: number[]; // Use 'number[]' for List<Long>
  candidates: number[]; // Use 'number[]' for List<Long>
  createdAt?: Date;
  updatedAt?: Date;
}
