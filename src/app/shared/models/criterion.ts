export interface Criterion {
  id: string;
  name: string;
  description: string;
  postId: string;
  parentId: string | null;
  range: number[];
  important: boolean;
  subjective: boolean;
  weight: number;
  path: string[];
}
