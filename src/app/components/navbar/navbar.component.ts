import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
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
  constructor(public auth: AuthService) { }

  ngOnInit() {
    
    if(this.auth.isLogged==true)
    this.role=this.auth.getrole()

    console.log(this.role)
    
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
