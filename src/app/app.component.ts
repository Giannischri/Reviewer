import { HtmlParser } from '@angular/compiler';
import { Component,OnInit,Output,EventEmitter,ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './shared/services/auth.service';
import { ProjectbuildComponent } from './components/projectbuild/projectbuild.component';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  @Output() 
  public sidenavToggle = new EventEmitter();
  public logged:boolean=false;
  role!:any
  constructor(public auth: AuthService,public afauth:AngularFireAuth,public dialog:MatDialog,public dataservice:DataService) { 
    
}
  ngOnInit() {
    
    if(this.auth.isLogged==true)
    this.role=this.auth.getrole()

    console.log(this.role)
    
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  
 
}

