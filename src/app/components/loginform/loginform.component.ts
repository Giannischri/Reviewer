import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FormControl,FormGroup } from '@angular/forms';
import { EventEmitter } from 'stream';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {
  formdata:any;
  constructor(
    public authService: AuthService,public router:Router
    
  ) { }
  loginform = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
   
  });
  ngOnInit() { }
  
  onSubmit(){
    this.formdata={
      username:this.loginform.get('username')?.value,
       password:this.loginform.get('password')?.value,
       
    };
    this.authService.SignIn(this.formdata.username,this.formdata.password)
    this.loginform.reset()
    
  }
    
}
