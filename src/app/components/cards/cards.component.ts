import { Component, OnInit } from '@angular/core';
import { Observable,map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Post } from 'src/app/shared/services/post';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
import { CarddetailsComponent } from '../carddetails/carddetails.component';
import { TreeService } from 'src/app/shared/services/tree.service';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { CardsearchComponent } from '../cardsearch/cardsearch.component';
import { UiMessagesComponent } from '../ui-messages/ui-messages.component';
import { AppComponent } from 'src/app/app.component';
import { ChooseroleComponent } from '../chooserole/chooserole.component';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
   posts:Post[]=[];
   candsr:any[]=[];
   scores:any[]=[]
  constructor(private dataservice:DataService,public auth:AuthService,public dialog:MatDialog,public treesrv:TreeService,private route:ActivatedRoute,private router:Router) 
    {
     
    }

  ngOnInit(): void {
    
    
   if(this.route.snapshot.paramMap.get('reviewer')=='2')
     {
      this.dataservice.getReviewerPosts().subscribe((res:Post[])=>{
      
      this.posts=res
    }); 
     
     }
     else{
      
     this.getcards();
     
     }
    }
 
  getcards(){
    this.dataservice.getProjectCards().subscribe((res)=>{
      this.posts=res
    }
      )
    
  }
  iscandidate(post:Post)
  {
    console.log(this.auth.getrole())
    var bool:boolean=false
    post.Candidates.forEach((element:any) => {
      if(element.email==this.auth.userData.email){
      bool=true
      }
    });
    return bool
  }
  isranker(post:Post)
  {
    var bool:boolean=false
    post.Rankers.forEach((element:any) => {
      if(element.email==this.auth.userData.email)
      bool=true
    });
    return bool
  }
  iseditor(post:Post)
  {
    var bool:boolean=false
    if(post.Project_Manager==this.auth.userData.firstname+" "+this.auth.userData.secondname)
      bool=true
    return bool
  }
  insertCandidate(post:Post)
  {
   this.dataservice.insertcandidate(post)
  }
  viewcandidates(cands:any[])
  {
    this.candsr=cands
    console.log(this.candsr)
  }
  searchcards()
  {
       this.dialog.open(CardsearchComponent,{
        height: '90%',
        width: '60%'
       })
  }

    showcands(post:Post)
    {
      this.dialog.open(UiMessagesComponent, {
        data: [post.Candidates,'1'],
      });
    }
    showrankers(post:Post)
    {
      this.dialog.open(UiMessagesComponent, {
        data: [post.Rankers,'2'],

      });
    }
   
  exportcsv(post:Post): void {
    this.treesrv.getCandScores(post!).subscribe((res:any)=>{
      res.forEach((element:any)=>{
        let str=element.email+" -->>:"+element.score
        this.scores.push(str)
      })
 
  console.log(this.scores)
    var json:any={
      'Title':post.Title,
      'Description':post.Description,
      'Project-Editor':post.Project_Manager,
      'Finalized':post.Finalized,
      'Open':post.Open,
      'Rankers':post.Rankers.map((item:any)=>{return item.email}),
      'Candidates':post.Candidates.map((item:any)=>{return item.email}),
      'Scores':this.scores
    }
    console.log(json)
    fileSaver.saveAs(new Blob([JSON.stringify(json, null, 2)], { type: 'JSON' }), 'sample.json');
    this.scores=[]
  
})
  }
}

