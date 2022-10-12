import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import {MatDialogRef} from '@angular/material/dialog';
import { FormGroup,FormControl, Validators,ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})
export class SignupformComponent implements OnInit   {
  validemail!:boolean
  validpassword!:boolean
  signupform = new FormGroup({
    firstname: new FormControl('',Validators.required),
    secondname: new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[
      Validators.required, 
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,20}$')
]),
    password2:new FormControl(''),
  });
  constructor(
    public authService: AuthService
    
    
  ) {  }
  
  ngOnInit() { 
    
  }
 onSubmit()
 {
  var firstname=this.signupform.get('firstname')?.value!
  var secondname=this.signupform.get('secondname')?.value!
  var email=this.signupform.get('email')?.value!
  var password=this.signupform.get('password')?.value!
  var password2=this.signupform.get('password')?.value!
  this.getFormValidationErrors()
  if(this.validemail==true && this.validpassword==true)
  this.authService.SignUp(firstname,secondname,email,password,password2)
  
 }
 getFormValidationErrors(){
  this.validemail=true
  this.validpassword=true
  if(this.signupform.get('password')?.value!=this.signupform.get('password2')?.value!)
      {
        this.authService.UI_message('Passwords doesnt match')
        this.validpassword=false
      }
  Object.keys(this.signupform.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.signupform.get(key)!.errors!;
    if (controlErrors != null && key=='email') {  
      this.authService.UI_message('email not in valid form')
      this.validemail=false
    }
    if (controlErrors != null && key=='password') {  
      this.authService.UI_message('The password given does not conform to the allowed password patterns')
      this.validpassword=false
    }
  })
  
}
}
