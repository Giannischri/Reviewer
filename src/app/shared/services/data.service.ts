import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireList,AngularFireDatabase, snapshotChanges } from '@angular/fire/compat/database';
import { appendFile } from 'fs';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { Post } from './post';
import { User } from './user';
import { ProjectbuildsearchComponent } from 'src/app/components/projectbuildsearch/projectbuildsearch.component';
import { AuthService } from './auth.service';
import { Observable,map,of,Subject,throwError, from } from 'rxjs';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { UiMessagesComponent } from 'src/app/components/ui-messages/ui-messages.component';
import { Console } from 'console';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  users: User[] = [];
  editorprojects2!:any[]
  editorprojects1!:any[]
  cards:Post[]=[];
  cands:any[]=[];
  rankerposts:any[]=[];
  
  constructor(
    public afd:AngularFireDatabase,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private dialog:MatDialog,
    private auth:AuthService
    

  ) {this.getUsers().subscribe(data=>{
    this.users=data
    this.users.forEach( (item, index) => {
      if(item.roles?.admin==true) this.users.splice(index,1);
    });
  }) 
  this.getProjectCards().subscribe(data=>{
    this.cards=data
  })
}
  openConfirmDialog(){
    return this.dialog.open(ProjectbuildsearchComponent,{
      disableClose: true
    });
  }
  openConfirmDialog2(list:any){
    return this.dialog.open(ProjectbuildsearchComponent,{
      disableClose: true,
      data: list
    });
}
  projectsList!: AngularFireList<any>;
  UsersList!: AngularFireList<any>;
  projectsList2!: AngularFireList<any>;
  


getProjectCards(){
  
   return this.afd.list('projects').snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() as [] }) 
        )
      )
    )   
}
  getProject(postkey:string){
    
    var obj:any
    firebase.database().ref().child('projects').child(postkey!).on('value',function (snapshot){
       obj=snapshot.val()
    })
    return of(obj)
      
  }
  UI_message(error_msg: any) {
    this.dialog.open(UiMessagesComponent, {
      data: error_msg,
    });
  }
  checkprojects(title:any,manager:any)
  {
    var managerex:boolean=false
    var titleex:boolean=false;
    console.log('CHECKPROJECTS'+title+""+manager)
    firebase.database().ref().child("projects").orderByKey().on("child_added", function (snapshot) {

      if (snapshot.child("Title").val() == title) {//an o titlos yparxei hdh den ginetai na mpei idios pouthena
        return titleex=true
      }
     
      if (snapshot.child("Project_Manager").val() == manager && snapshot.child("Finalized").val() == false) {//an o user einai manager se allo unfinished project
       return managerex=true
      }
      return 0
    });
    return [managerex,titleex]
  }
getProjects2(Title: any, manager: any): any {
    let Title_exists = "false"
    let Manager_exists = "false"
    console.log(Title+' '+manager)
    firebase.database().ref().child("projects").orderByKey().on("child_added", function (snapshot) {
      if (snapshot.child("Title").val() == Title) {//an o titlos yparxei hdh den ginetai na mpei idios pouthena
        Title_exists = "true"
        console.warn("mphkame?   1  ", snapshot.child("Title").val())
      }
      console.log(manager)
      console.log(snapshot.child('Project_Manager').val())
      console.log(snapshot.child('Finalized').val())
      if (snapshot.child("Project_Manager").val() == manager && snapshot.child("Finalized").val() == false) {//an o user einai manager se allo unfinished project
        console.warn("FINALIZED false inside projects (USER)")
        Manager_exists = "true"
        console.warn(snapshot.child("Title").val(), "  ||  ", snapshot.child("Finalized").val(), " with manager:  ", manager)
      }

    });

    if (Title_exists == "true" && Manager_exists == "true") {
      return{
        'Title_exists': "true",
        'Manager_exists': "true"
      };
    }
    else if (Title_exists == "true" &&  Manager_exists == "false") {
      return{
        'Title_exists': "true",
        'Manager_exists': "false"
      };
    }
    else if(Title_exists == "false" &&  Manager_exists == "true"){
      return{
        'Title_exists': "false",
        'Manager_exists': "true"
      };
    }
    else {
      return{
        'Title_exists': "false",
        'Manager_exists': "false"
      };
    }
  }
  insertProjects(post:Post,editorkey1:string,editorkey2:string,edit?:any): any {
    var key:any;
    if(edit){
   key=post.key
   
  }else
   key= this.afd.createPushId();//auto einai project key
  
    if(editorkey1 && editorkey2!=editorkey1 && editorkey2)
    {
      this.editorprojects1.forEach( (item:any, index) => {
        if(item==key) 
        {
          this.editorprojects1.splice(index,1);
         
          firebase.database().ref().child('projectspereditor').child(editorkey1).set(this.editorprojects1)
        }
      });
    }
    
      var candnames:any[]=[]
      var candkeys:any[]=[]
      var rankernames:any[]=[]
      var rankerkeys:any[]=[]
      post.Candidates.forEach((element:any) => {
          candnames.push(element.firstname+" "+element.secondname)
          candkeys.push(element.key)
      });
      post.Rankers.forEach((element:any) => {
        rankernames.push(element.firstname+" "+element.secondname)
    });
    post.Rankers.forEach((element:any) => {
      rankerkeys.push(element.key)
  });
     
      var data={
        key:key,
      Title: post.Title,
      Project_Manager: post.Project_Manager,
      Description: post.Description,
      Finalized:false,
      Candidates:post.Candidates,
      Rankers:post.Rankers,
      Open:post.Open?true:false
      }
      
      
     this.afd.list('/projects').set(key, data);
     if(this.editorprojects2 && editorkey2){
     this.editorprojects2.push(key) 
     firebase.database().ref().child('projectspereditor').child(editorkey2).set(this.editorprojects2)
     }
    // this.afd.list('/projectspereditor').set(editorkey,{key});
     this.afd.list('/rankersperproject').set(key,rankerkeys)
     if(editorkey2)
    firebase.database().ref().child('users').child(editorkey2).child('roles').child('employee').child('editor').set(true)
    rankerkeys.forEach(rankerkey=>{
    firebase.database().ref().child('users').child(rankerkey).child('roles').child('employee').child('ranker').set(true)
  })
  
    this.editorprojects2==undefined
    this.editorprojects1==undefined
    this.router.navigate(['cards'])
      return "ADDED"
      
    
  }
 
  getReviewerPosts(){
    
    var usr=this.auth.userData.key!
    var obs:Post[]=[];
    if(usr)
    {
    var ref=firebase.database().ref().child('projectspereditor').child(usr)
     this.afd.list(ref).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    ).subscribe(data => {
      console.log(data)
      data.forEach((element:any)=>
      {
        firebase.database().ref().child('projects').child(element).orderByKey().on('value',function (snapshot){
             obs.push(snapshot.val())
             
       })
    })
      })
    }
    
   return of(obs) 
}
geteditorprojects(editorkey:string)
{
  var ref=firebase.database().ref().child('projectspereditor').child(editorkey)
  return   this.afd.list(ref).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (c.payload.val())
        )
      )
    )
}
getUsers():Observable<User[]> {
 return this.afd.list('users').snapshotChanges().pipe(
  map(changes =>
    changes.map(c =>
      ({ key: c.payload.key, ...c.payload.val() as Object })
    )
  )
)
}
insertcandidate(post:Post){//push id me ref kai elegxei an uparxei o user mesa
       try{
        if(this.auth.isLogged==false)
        throw("You havent logged in")
       var usr=this.auth.userData.key
       var exists:boolean=false;
       var cands:any[]=[];
     var ref=firebase.database().ref().child('projects').child(post.key!).child('Candidates')  
     if(this.auth.userData.roles?.admin==false && this.auth.userData.roles?.employee?.editor==false && this.auth.userData.roles?.employee?.ranker==false && this.auth.userData.roles?.employee?.simple==false  )
     {
                        var data={
                          email:this.auth.userData.email,
                          firstname:this.auth.userData.firstname,   
                          key:this.auth.userData.key,
                          secondname:this.auth.userData.secondname, 
                        }        
     }
     else
     this.UI_message("You arent supposed to be a candidate")
     ref.on("child_added",function (snapshot){
      //console.log(snapshot.val())
      cands.push(snapshot.val())
     })
   cands.forEach(element=>{
    if(element.email==data.email){
    exists=true
    }
   })
     if(!exists){
    cands.push(data!);
     ref.set(cands)
     throw('You joined the project....wait for your scores')
     }else
     throw('Already a project candidate...')
    }catch(e){
      this.UI_message(e)
    }
    

    
   /*  this.afd.list('projects/'+post.key!+'/Candidates').valueChanges().subscribe((res:any)=>this.cands=res)
     this.cands.forEach(element=>{
      if(element.key==usr)
      exists=true
     })
     if(exists==false){
     this.cands.push(data!)
     console.log(this.cands)
     this.afd.database.ref('projects/'+post.key!+'/Candidates').set(this.cands)
     }
        this.cands=[]       */ 
      
}
getprojectsperranker(ranker:string)
{
 
  var obs:Post[]=[];
  this.afd.list('rankersperproject').snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ $key: c.payload.key, value:c.payload.val() as []})
      )
    )
  ).subscribe(data=>{
    data.forEach(element=>{
      element.value.forEach(element2 => {
        if(element2==ranker){
          firebase.database().ref().child('projects').child(element.$key!).orderByKey().on('value',function (snapshot){
            if(snapshot.val()!=null && !snapshot.child('Finalized').val())
            obs.push(snapshot.val())
            
            
      })
      }
      })
     
    })
  })
  
  return of(obs)
    
}
}

