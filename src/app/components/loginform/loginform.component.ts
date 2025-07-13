import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceV2 } from '../../shared/services/authv2.service';
import { Router } from '@angular/router';
import {Location} from "@angular/common";

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private authService: AuthServiceV2,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  closeDialog() {
    this.location.back();
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.router.navigate(['/dashboard']); // Navigate to a protected route
        },
        error => {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please enter valid credentials.';
    }
  }
}
// import { Component, OnInit } from '@angular/core';
// import { AuthService } from "../../shared/services/auth.service";
// // import { AuthService} from "../../shared/services/authv2.service"
// import { FormControl,FormGroup } from '@angular/forms';
// import { EventEmitter } from 'stream';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-loginform',
//   templateUrl: './loginform.component.html',
//   styleUrls: ['./loginform.component.scss']
// })
// export class LoginformComponent implements OnInit {
//   formdata:any;
//   constructor(
//     public authService: AuthService,public router:Router
//
//   ) { }
//   loginform = new FormGroup({
//     username: new FormControl(''),
//     password: new FormControl(''),
//
//   });
//   ngOnInit() { }
//
//   onSubmit(){
//     this.formdata={
//       username:this.loginform.get('username')?.value,
//        password:this.loginform.get('password')?.value,
//
//     };
//     this.authService.SignIn(this.formdata.username,this.formdata.password)
//     this.loginform.reset()
//
//   }
//
// }
