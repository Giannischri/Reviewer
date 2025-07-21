import { Component, OnInit } from '@angular/core';
import { Observable,map } from 'rxjs';
import {AuthServiceV2} from 'src/app/shared/services/authv2.service';
// import { DataService } from 'src/app/shared/services/data.service';
import { Post } from 'src/app/shared/models/post';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatDialog } from '@angular/material/dialog';
// import { CarddetailsComponent } from '../carddetails/carddetails.component';
// import { TreeService } from 'src/app/shared/services/tree.service';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
// import { CardsearchComponent } from '../cardsearch/cardsearch.component';
// import { UiMessagesComponent } from '../ui-messages/ui-messages.component';
import { AppComponent } from 'src/app/app.component';
// import { ChooseroleComponent } from '../chooserole/chooserole.component';
import {ProjectrankingComponent} from "../../projectranking/projectranking.component";
import * as fileSaver from 'file-saver';
import {ProjectMetaComponent} from "../../projectranking/components/project-meta/project-meta.component";
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
   posts:Post[]=[];
   candsr:any[]=[];
   scores:any[]=[]
  constructor(public auth:AuthServiceV2,public dialog:MatDialog,private route:ActivatedRoute,private router:Router)
    {

    }

  ngOnInit(): void {


   // if(this.route.snapshot.paramMap.get('reviewer')=='2')
   //   {
   //    this.dataservice.getProjectCards().subscribe((res)=>{
   //    res.forEach((post:Post)=>{
   //      if(this.iseditor(post))
   //      this.posts.push(post)
   //
   //    })
   //  });
   //
   //   }
   //   else{

     this.getcards();

     // }
   }

  getcards(){

    this.posts = [
      {
        id: 1,
        title: 'Project Alpha',
        managerId: 101,
        description: 'Description of Project Alpha',
        image: 'https://via.placeholder.com/150',
        finalized: false,
        open: true,
        rankers: [201, 202],
        candidates: [301],
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-06-01'),
      },
      {
        id: 2,
        title: 'Project Beta',
        managerId: 102,
        description: 'Description of Project Beta',
        image: 'https://via.placeholder.com/150',
        finalized: true,
        open: false,
        rankers: [203],
        candidates: [],
        createdAt: new Date('2024-11-15'),
        updatedAt: new Date('2025-05-20'),
      },
    ];
  }
  openProjectRankingDialog() {
    this.dialog.open(ProjectrankingComponent, {
      width: '800px',
    });
  //
  // getRole(): string {
  //   return this.auth.getrole();
  // }
  //
  // isAdmin(): boolean {
  //   return this.getRole() === 'admin';
  // }
  //
  // isEditor(post: Post): boolean {
  //   // Implement your logic to check if current user is editor of post
  //   return this.auth.isEditorOfPost(post); // example method
  // }
  //
  // isRanker(post: Post): boolean {
  //   return this.auth.isRankerOfPost(post); // example method
  // }
  //
  // isCandidate(post: Post): boolean {
  //   return this.auth.isCandidateOfPost(post); // example method
  // }
  //
  // canViewCandidates(post: Post): boolean {
  //   return this.isAdmin() || (post.Open && !this.isCandidate(post)) || this.isRanker(post) || this.isEditor(post);
  // }
  //
  // canViewRankers(post: Post): boolean {
  //   return this.isAdmin() || post.Open || this.isRanker(post) || this.isEditor(post);
  // }
  //
  // canViewButton(post: Post): boolean {
  //   const role = this.getRole();
  //   return (!this.isEditor(post) && (role !== 'editor' && role !== 'editor+ranker')) || (this.isRanker(post) && !post.Finalized);
  // }
  //
  // canEdit(post: Post): boolean {
  //   const role = this.getRole();
  //   return (role === 'editor' || role === 'editor+ranker') && this.isEditor(post) && !post.Finalized;
  // }
  //
  // canRank(post: Post): boolean {
  //   const role = this.getRole();
  //   return (role === 'ranker' || role === 'editor+ranker') && this.isRanker(post) && !post.Finalized;
  // }
  //
  // canFinalize(post: Post): boolean {
  //   const role = this.getRole();
  //   return !post.Finalized && this.isEditor(post) && (role === 'editor' || role === 'editor+ranker');
  // }
  //
  // canExport(post: Post): boolean {
  //   return post.Finalized && this.isEditor(post);
  // }
  //
  // canBecomeCandidate(post: Post): boolean {
  //   return post.Open && !post.Finalized && this.getRole() === 'viewer' && !this.isCandidate(post);
  // }

  // Actions

//   showcands(post: Post) {
//     // Implement show candidates logic
//     console.log('Show candidates for', post);
//   }
//
//   showrankers(post: Post) {
//     // Implement show rankers logic
//     console.log('Show rankers for', post);
//   }
//
//   insertCandidate(post: Post) {
//     // Implement candidate insertion logic
//     console.log('Insert candidate for', post);
//   }
//
//   exportcsv(post: Post) {
//     // Implement export CSV logic
//     console.log('Export CSV for', post);
//   }
}}

