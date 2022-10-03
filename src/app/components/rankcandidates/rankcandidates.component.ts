import { Component, NgZone, OnInit,OnChanges } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { Post } from 'src/app/shared/services/post';
import { User } from 'src/app/shared/services/user';
import { Criteria } from 'src/app/shared/services/criteria';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { TreeService } from 'src/app/shared/services/tree.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { MatDialog } from '@angular/material/dialog';
import { UiMessagesComponent } from '../ui-messages/ui-messages.component';
import { SimpleChange } from '@angular/core';
@Component({
  selector: 'app-rankcandidates',
  templateUrl: './rankcandidates.component.html',
  styleUrls: ['./rankcandidates.component.css']
})
export class RankcandidatesComponent implements OnInit {
    posts?:Post[];
    notranker:boolean=false;
    currentpost?:Post;
    currentcand?:User;
    inscore:any;
    cands?:User[];
    candscore!:any;
    ranked:boolean=false
    missedbutton:boolean=false
    treeControl = new NestedTreeControl<Criteria>(node => node.children);
  treeSource = new MatTreeNestedDataSource<Criteria>();
  dataSource: BehaviorSubject<Criteria[]>;
  constructor(private auth:AuthService,private datasrv:DataService,private router:Router,private route:ActivatedRoute,private ngZone:NgZone,private treesrv:TreeService,public dialog:MatDialog) { 
    this.dataSource = new BehaviorSubject<Criteria[]>([]);
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const prostkeyparam = routeParams.get('postkey');
    this.auth.afAuth.authState.subscribe((user)=>{
      console.log(user!.email)
      if(user) 
      this.auth.getuserkey(user!.email).subscribe((res:any)=>{  
        for(var index in res)
        { 
          if(res[index].email==user!.email)
           {
            console.log(res[index].key)
            if(prostkeyparam){
                this.datasrv.getProject(prostkeyparam).subscribe(res=>{this.posts=[]
                  this.posts?.push(res)
                this.currentpost=res
                this.check(this.currentpost!)
              })
                
            }
            else{
            this.datasrv.getprojectsperranker(res[index].key).subscribe(res=>{
              this.posts=res
            })
          }
          }
        }
     })
    
    
     
  })
  
  }
  check(post:Post)
  {
    console.log(this.auth.userData)
    this.currentcand=undefined
    this.notranker=false
   post.Rankers.forEach((element:any)=>{
    if(element.key==this.auth.userData.key)
    {
      this.notranker=true
    }
   })
   
  }
  crit(){
    this.candscore=undefined
    this.missedbutton=false
    this.ranked=false;
    this.treesrv.getCandScores(this.currentpost!).subscribe(data=>{
      if(data){
        data.forEach((element:any)=>{
          this.missedbutton=true
      if(element.email==this.currentcand?.email){
      this.ranked=true
      
      }
    })
  }
    }) 
  
   /* this.treesrv.getfromdatabase(this.currentpost!).subscribe(data=>this.dataSource.next(data));
    this.dataSource.subscribe(items => {
      this.treeSource.data= [];
      this.treeSource.data = items;
    });*/
    
  }
  savecandidatescore(){
          this.treesrv.savescore(this.currentpost!,this.currentcand!,this.auth.userData.key!,this.candscore)
          this.UI_message('Candidate score saved')
          this.ngZone.run(()=>{
            this.router.navigateByUrl('/rank-candidates')
            });
  }
  missedinterview(){
    this.treesrv.savescore(this.currentpost!,this.currentcand!,this.auth.userData.key!,'-1')
    this.UI_message('Candidate missed the interview')
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/rank-candidates')
      });
  }
  getscore(data:string){
    console.log(data+"  "+this.currentcand?.email)
      this.candscore=data
      
      
  }
  UI_message(error_msg: any) {
    this.dialog.open(UiMessagesComponent, {
      data: error_msg,
      width:'350px'
    });
  }
  
}
