import { Input, Output,EventEmitter, Inject } from '@angular/core';
import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectbuildComponent } from '../projectbuild/projectbuild.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
@Component({
  selector: 'app-projectbuildsearch',
  templateUrl: './projectbuildsearch.component.html',
  styleUrls: ['./projectbuildsearch.component.css']
})
export class ProjectbuildsearchComponent implements OnInit {
  div1 = true;
  project_manager_search: any;
  project_manager_search_last: any;
  project_manager_search_name: any;
  project_manager_search_email: any;

  temp_pid: any;
  UsersArray: any;
    add_Project_Manager(id: any,secondname: any,name:any,email:any): void{

      this.temp_pid=id;
      this.project_manager_search=name+" "+secondname;//add value to search bar and key up search
      this.project_manager_search_last=secondname;//add value to search bar and key up search
      this.project_manager_search_name=name;//add value to search bar and key up search
      this.project_manager_search_email=email;//add value to search bar and key up search

    }
    constructor(
      public dialogRef: MatDialogRef<ProjectbuildsearchComponent>,
      private dataservice: DataService,
      @Inject(MAT_DIALOG_DATA) public data={
        name: "",
        email: ""
      }
      ){

    }
  ngOnInit(): void {

      //h bazw interface gia polla dedomena  (san bookmark)
    
      this.UsersArray = this.dataservice.users
   

  }

  closeDialog(val:any){

    if(val==1){
      this.dialogRef.close("")
    }else{
      console.log("inside projectbuildsearch  ",this.UsersArray)
      const data=[{}]
      data.push(this.temp_pid)
      data.push(this.project_manager_search_name)
      data.push(this.project_manager_search_last)
      data.push(this.project_manager_search_email)
      
      this.dialogRef.close(data)
    }
  }



}
