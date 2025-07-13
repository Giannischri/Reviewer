import { Component, OnInit } from '@angular/core';
import { AuthServiceV2 } from 'src/app/shared/services/authv2.service';
import { Output,EventEmitter,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output()
  public sidenavToggle = new EventEmitter();
  public logged:boolean=false;
  role!:any
  constructor(public auth: AuthServiceV2) { }

  ngOnInit() {

    // if(this.auth.isLogged==true)
    // this.role=this.auth.getrole()
    //
    // console.log(this.role)
    console.log("navbar yolo")

  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
