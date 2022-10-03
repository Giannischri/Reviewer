import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';
import { map, Subscription } from 'rxjs';
import {FormControl} from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { Post } from 'src/app/shared/services/post';
@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  posts?:Post[];
   users?:User[];
   currentuser?:User;
   currentindex=-1;
   
  constructor(private authservice:AuthService,private datasrv:DataService) 
  { 

  }

  ngOnInit(): void {
    this.getusers();
  
  }
  refreshList():void{
    this.currentuser=undefined;
    this.currentindex=-1;
    this.getusers();
    
  }
  getusers(){
    this.datasrv.getUsers().subscribe((users:User[]) => {
      this.users = users;
      console.log(this.users);
  });
  }
  setActive(user:User,index:number):void{
    this.currentuser=user;
    this.currentindex=index;
    
  }

}
