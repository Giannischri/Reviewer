import { Component,OnChanges,DoCheck,OnInit } from '@angular/core';
import { Post } from 'src/app/shared/services/post';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable,switchMap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute,NavigationEnd,ParamMap, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-projectedit',
  templateUrl: './projectedit.component.html',
  styleUrls: ['./projectedit.component.css']
})
export class ProjecteditComponent implements OnInit {
  posts?:Post[];
  emptypost:boolean=false;
  currentpost?:Post;
  currentindex=-1;
  sub:any
 constructor(private authservice:AuthService,private dataservice:DataService,private router:Router) 
 { 
 
 }
 ngOnInit(): void {
    
    this.getposts();
    
 }
 getposts()
 { 
  this.dataservice.getReviewerPosts().subscribe((res:Post[])=>{
    console.log(res)
  this.posts=res
 });   
  
 }
 ngOnDestroy() {
  if (this.sub) {
    this.sub.unsubscribe();
  }
}
 refreshList():void{
   this.currentpost=undefined;
   this.currentindex=-1;
   
   
 }
 setActive(post:Post,index:number):void{
   this.currentpost=post;
   this.currentindex=index;
   console.log(this.currentpost);
 }

 
}
