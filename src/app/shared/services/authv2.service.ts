import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs'; // Removed 'tap' from here as it's used in login, not signup
import { tap } from 'rxjs/operators'; // Keep tap for login method
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

// Define the DTO for signup request
export interface SignupRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // The backend typically doesn't need password2; it confirms password internally
  // If your backend *does* expect it, add password2: string; here
}

// Define the DTO for auth response (moved out of inline interface for clarity)
export interface AuthResponse {
  token: string;
  // Add other properties your backend sends on successful login/signup, e.g.:
  userId?: string;
  email?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceV2 {
  private authApiUrl = `${environment.apiUrl}/auth`; // Adjust based on your API Gateway/Auth service path
  private tokenKey = 'jwt_token'; // Key for localStorage
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable(); // Expose as observable

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // --- NEW: UI_message method (assuming AuthServiceV2 will handle this) ---
  // If you have a separate, dedicated UI messaging service, inject it here
  // and use that instead. For now, this provides a basic implementation.
  UI_message(message: string): void {
    console.log('UI Message:', message);
    // In a real app, you'd integrate a toast/snackbar service here (e.g., MatSnackBar)
  }
  // -----------------------------------------------------------------------

  // --- FIX: Updated signup method signature and payload construction ---
  signup(
    firstname: string,
    secondname: string,
    email: string,
    password: string,
    password2: string // Keep if your backend explicitly expects it for confirmation
  ): Observable<AuthResponse> { // Assuming signup also returns AuthResponse or similar
    console.log("Attempting signup...");

    // Construct the DTO for the backend
    const signupPayload: SignupRequestDto = {
      firstName: firstname,
      lastName: secondname,
      email: email,
      password: password,
      // Add password2 here IF your backend's /register endpoint expects it
      // password2: password2,
    };

    // Send the DTO to the backend
    return this.http.post<AuthResponse>(`${this.authApiUrl}/register`, signupPayload).pipe(
      tap(response => {
        // You might want to log the response from signup too, or handle auto-login
        console.log('Signup successful response:', response);
        // If signup automatically logs in, store token:
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }
  // -------------------------------------------------------------------

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authApiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log('Login successful! Response:', response); // Log the full response
        localStorage.setItem(this.tokenKey, response.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']); // Redirect to login page
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
