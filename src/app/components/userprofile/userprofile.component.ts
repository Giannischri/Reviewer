import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
   usr:User
  constructor(private auth:AuthService) {
    this.usr=this.auth.userData
   }

  ngOnInit(): void {
    console.log(this.usr)
  }

}
