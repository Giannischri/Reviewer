export interface SignupRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // The backend typically doesn't need password2; it confirms password internally
  // If your backend *does* expect it, add password2: string; here
}

// Define the DTO for auth response (moved out of inline interface for clarity)
export interface AuthResponseDTO {
  token: string;
  // Add other properties your backend sends on successful login/signup, e.g.:
  userId?: string;
  email?: string;
  message?: string;
}
