// Assuming backend uses snake_case or different names, and potentially different types
export interface CriterionDto {
  criterion_id: string; // Backend might use snake_case
  criterion_name: string;
  criterion_description: string;
  post_id: string;
  parent_id: string | null;
  value_range: number[]; // Backend might name it differently
  is_important: boolean;
  is_subjective: boolean;
  weight_value: number; // Backend might name it differently
  path_elements: string[]; // Backend might name it differently
  created_at: string; // Example: if backend includes creation timestamp
}

export interface CriterionCreateDto {
  name: string; // Frontend might send camelCase
  description: string;
  postId: string;
  parentId: string | null;
  range: number[];
  important: boolean;
  subjective: boolean;
  weight: number;
  // Path is often generated/managed by backend on create
}

export interface CriterionUpdateDto {
  name?: string;
  description?: string;
  range?: number[];
  important?: boolean;
  subjective?: boolean;
  weight?: number;
  // Path is typically not updated directly by client
  // postId, parentId are usually immutable after creation
}
