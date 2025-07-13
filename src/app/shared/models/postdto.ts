// How the backend sends a Post
export interface PostDto {
  id: number; // Matches frontend model
  title: string;
  manager_id: number; // Assuming backend might use snake_case for IDs
  description: string;
  image_url: string; // Assuming backend might use a specific name for image URL
  is_finalized: boolean; // Assuming boolean fields might have 'is_' prefix
  is_open: boolean;
  ranker_ids: number[]; // Assuming backend uses 'ids' suffix
  candidate_ids: number[]; // Assuming backend uses 'ids' suffix
  created_at: string; // Example: if backend sends creation timestamp
  updated_at: string; // Example: if backend sends last updated timestamp
}

// How the backend expects data for creating a Post
export interface PostCreateDto {
  title: string;
  // managerId is often inferred from authenticated user, or passed separately
  description: string;
  image?: string; // Optional for creation, if image can be added later
  // finalized, open, rankers, candidates usually default on backend or set later
}

// How the backend expects data for updating a Post
export interface PostUpdateDto {
  title?: string;
  description?: string;
  image_url?: string; // Matching the DTO name for update
  is_finalized?: boolean;
  is_open?: boolean;
  ranker_ids?: number[];
  candidate_ids?: number[];
}
