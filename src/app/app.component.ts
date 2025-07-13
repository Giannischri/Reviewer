import { HtmlParser } from '@angular/compiler';
import { Component,OnInit,Output,EventEmitter,ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceV2 } from './shared/services/authv2.service';
// import { ProjectbuildComponent } from './components/projectbuild/projectbuild.component';
// import { DataService } from './shared/services/data.service';

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
  constructor(public auth: AuthServiceV2,public afauth:AngularFireAuth,public dialog:MatDialog) {

}
  ngOnInit() {

    // if(this.auth.isLogged==true)
    // this.role=this.auth.getrole()
    //
    // console.log(this.role)
    console.log("yolooo")
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


}

