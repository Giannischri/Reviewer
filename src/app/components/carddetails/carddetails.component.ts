import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Criteria } from 'src/app/shared/services/criteria';
import { of,Observable } from 'rxjs';
import { TreeService } from 'src/app/shared/services/tree.service';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/shared/services/post';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { throws } from 'assert';
import { User } from 'src/app/shared/services/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import {MatTabsModule} from '@angular/material/tabs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.css']
})
export class CarddetailsComponent implements OnInit {
   cands:User[]=[]
   pcands:User[]=[]
   fcands:User[]=[]
   mcands:User[]=[]
   scoreusers:any[]=[]
   candbutton:boolean=false
   nocands:boolean=false;
   viewonly!:boolean;
   post:Post|undefined;
   treeControl = new NestedTreeControl<Criteria>(node => node.children);
   treeSource = new MatTreeNestedDataSource<Criteria>();
   dataSource: BehaviorSubject<Criteria[]>;
  constructor(public treesrv:TreeService,public route:ActivatedRoute,public datasrv:DataService,public auth:AuthService) {
    this.dataSource = new BehaviorSubject<Criteria[]>([]);
    
   }

  ngOnInit(): void {
    this.nocands=false
    const routeParams = this.route.snapshot.paramMap;
    const prostkeyparam = routeParams.get('postkey');
    const candkeyparam = routeParams.get('candkey');
    console.log(prostkeyparam)
    this.datasrv.getProjectCards().subscribe(res=>{
      res.forEach((element:Post)=>{
      if(element.key==prostkeyparam) 
      this.post=element 
    })
  
   //this.scoreusers=this.treesrv.checkfinalization(this.post!)
    if(this.post?.Project_Manager==this.auth.userData.firstname+" "+this.auth.userData.secondname)
      this.viewonly=false
      else
      this.viewonly=true
    this.post?.Rankers.forEach((element:any)=>{
      if(element.email==this.auth.userData.email)
      this.viewonly=true
    })
    if(this.post)
    this.treesrv.getfromdatabase(this.post).subscribe((res:Criteria[])=>{this.dataSource.next(res)});
  
  })
    this.dataSource.subscribe(items => {
      this.treeSource.data= [];
      this.treeSource.data = items;
      
    });
    
  }
  hasChild(index: number, node: Criteria){
    if(node.children){
      console.log("has child"+node.title)
    
    return true;
    }
    else
    {
      console.log("no child"+node.title)
    return false;
    }
    
  }
  hasNoContent(index: number,node: Criteria){
    
    if(node.title==''){
      console.log("hasno"+node.title);
    return true
    }
    else{
      console.log("has"+node.title)
    return false
    }
  }
candscores(){
  try{
      this.treesrv.getCandScores(this.post!).subscribe((res:User[])=>{
        if(res.length==0 || !res)
        throw 'emptycriteria'
        console.log(res)
        res.sort((a,b) => Number(a.score!)-Number(b.score!));
       this.cands=res.reverse()
       this.pcands=res.filter(item => item.score !=0 && item.score!=-1);
       
      this.fcands= res.filter(item => item.score ==0);
      this.mcands= res.filter(item => item.score == -1);  
      })  
      this.candbutton=true  
      

   }
  catch(e)
  {
    if(e=='emptycriteria')
    this.nocands==true
  }
   
  }
}

   

