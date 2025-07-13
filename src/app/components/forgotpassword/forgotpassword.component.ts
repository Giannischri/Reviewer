import { Component, OnInit } from '@angular/core';
import { AuthServiceV2 } from 'src/app/shared/services/authv2.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(public auth:AuthServiceV2) { }

  ngOnInit(): void {
  }

}
