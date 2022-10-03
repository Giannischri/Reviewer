
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/compat/database';
import {BehaviorSubject, ConnectableObservable, Observable, toArray} from 'rxjs';
import { Criteria } from './criteria';
import { DatabaseReference } from '@angular/fire/compat/database/interfaces';
import { ThisReceiver } from '@angular/compiler';
import { map,of } from 'rxjs';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { Post } from './post';
import { rawListeners } from 'process';
import { User } from './user';
import { UiMessagesComponent } from 'src/app/components/ui-messages/ui-messages.component';
import { MatDialog } from '@angular/material/dialog';
 

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
 @Injectable({
  providedIn: 'root'
})
@Injectable()
export class TreeService {
  post?:any;
  cand?:User;
  criteriadata:any;
  scands!:any[]
  tempnodes!:any[]
  subjectivescorearray!:any[]
  showsubjective:boolean=true
  constructor(public afd:AngularFireDatabase,public dialog:MatDialog) {
   
  }
  UI_message(error_msg: any) {
    this.dialog.open(UiMessagesComponent, {
      data: error_msg,
    });
  }
  addtodatabase(data:any[])
  {
       
      this.afd.database.ref('criteria/'+this.post.key).set(data);
      
     
  }
  getfromdatabase(post:Post):Observable<any[]>
  {  
    if(post.key){
    var ref=firebase.database().ref().child('criteria').child(post.key)
    return this.afd.list(ref).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.val() as Criteria}) 
        )
      )
    ) 
  }
  else
  return of([{yeah:"skata"}]);
  }
  savescore(post:Post,cand:User,ranker:string,score:any)
  { 
    console.log(cand)
    console.log(score)
    cand.score=score
    this.afd.database.ref('scores/'+post.key+'/'+cand.key).set(cand)
  }
  savecriteriascore(post:Post,cand:User,ranker:string,node:Criteria,option?:string)
  {
    console.log(node)
    var key=this.afd.createPushId()
    if(node.key==undefined)
    node.key=key;
    
    var data={
      title:node.title,
      key:node.key,
      subjective:node.subjective,
      score:node.score,  
    }
   var data2= JSON.parse(JSON.stringify(data))
   console.log(data2)
   if(node.subjective==false)
   {
    this.afd.list('criteriascores/'+post.key+'/'+cand.key+'/'+node.key).remove()
    this.afd.list('criteriascores/'+post.key+'/'+cand.key).set(node.key,data2)
   }
   else if(node.subjective==true)
   {
    console.log("saving subjective") 
    this.afd.list('subjectivecriteriascores/'+post.key+'/'+cand.key+'/'+node.key).remove()
    this.afd.list('subjectivecriteriascores/'+post.key+'/'+cand.key+'/'+ranker).set(node.key,data2)
    this.getsubjectiveScore(post,cand,ranker).subscribe(obj=>{this.subjectivescorearray=obj})
    //console.log(this.subjectivescorearray)
    //if(!this.subjectivescorearray.find(x=>x.title==node.title))
    //this.subjectivescorearray.push(node)

    console.log(this.subjectivescorearray)
    
    

   }
    
    
  }
  
  
  /*getcallRecursively(node:Criteria,snode:Criteria,post?:Post,cand?:User,ranker?:string)
  {
    if(node.subjective==true && this.subjectivescorearray && this.getOccurrence(this.subjectivescorearray,node.title!)==this.post?.Rankers.length )
    {
      let count = this.subjectivescorearray!.filter((obj) => obj.title === node.title).length;
      let totalPrice = this.subjectivescorearray!
      .filter(
        (item) =>
          item.title === node.title 
      )
      .reduce((accumulator, item) => {
        return accumulator + item.score;
      }, 0);
        node.allvoted=true
        node.score=totalPrice /count 
      
  }
   if(node.title==snode.title && node.subjective==false)
   {
    node.score=snode.score
    node.key=snode.key
   }
  
    if(node.children) {
      node.children.forEach((childNode:any) => {
        this.getcallRecursively(childNode,snode);
      });
    }
  }*/
  
  getobjcriteriascores(post:Post,cand:User)
  {
    return this.afd.list(firebase.database().ref().child('criteriascores').child(post.key!).child(cand.key!)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.val() as Criteria[]}) 
        )
      )
    )
  }
  getsubcriteriascore(post:Post,cand:User,ranker:string)
  {
    this.getsubjectiveScore(post,cand,ranker).subscribe(obj=>{this.subjectivescorearray=obj})
    return this.afd.list(firebase.database().ref().child('subjectivecriteriascores').child(post.key!).child(cand.key!).child(ranker)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.val() as Criteria[]}) 
        )
      )
    )
  }
/*  getcriteriascores(post:Post,cand:User,ranker:string)
  {
    this.showsubjective=true
    
    this.afd.list(firebase.database().ref().child('subjectivecriteriascores').child(post.key!).child(cand.key!)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.val() as []}) 
        )
      )
    ).subscribe((data2:any)=>{
      
    if(data2.length!=post.Rankers.length)
    this.showsubjective=false
    
      if(this.showsubjective==true){
        this.post=post
        console.log('allvoted')
        this.getsubjectiveScore(post,cand,ranker).subscribe(obj=>{this.subjectivescorearray=obj})
     this.afd.list(firebase.database().ref().child('criteriascores').child(post.key!).child(cand.key!)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.val() as Criteria[]}) 
        )
      )
    ).subscribe(data2=>{
       data2.forEach((element:any)=>{
         data.forEach((element2:any)=>{
           
            this.getcallRecursively(element2,element,post,cand,ranker)
            
         })
        })
    })
    
  }
  else
  {
    console.log('notall voted')
    this.afd.list(firebase.database().ref().child('criteriascores').child(post.key!).child(cand.key!)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.val() as Criteria[]}) 
        )
      )
    ).subscribe(data2=>{
      
      data2.forEach((element:any)=>{
        data.forEach((element2:any)=>{
           this.getcallRecursively(element2,element,post,cand,ranker)
           
        })
       })
   })
   this.afd.list(firebase.database().ref().child('subjectivecriteriascores').child(post.key!).child(cand.key!).child(ranker)).snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({...c.payload.val() as Criteria[]}) 
      )
    )
  ).subscribe(data2=>{
    data2.forEach((element:any)=>{
      data.forEach((element2:any)=>{
         this.subjectivegetcallRecursively(element2,element)
         
      })
     }) 
 })

  }
})
console.log(this.tempnodes)
    return of(data)
    
  }*/
  getsubjectiveScore(post:Post,cand:User,ranker:string)
  {
    var obs:any[]=[]
     post.Rankers.forEach((element:any)=>{
      firebase.database().ref().child('subjectivecriteriascores').child(post.key!).child(cand.key!).child(element.key).orderByKey().on('child_added',function (snapshot){
       obs.push(snapshot.val())
      })
    })
   return of(obs)
  }
  checkfinalization(post:Post)
  {
    var count=0;
    var cands:any[]=[]
    var ref=firebase.database().ref().child('scores').child(post.key!)  

    ref.on("child_added",function (snapshot){
      cands.push(snapshot.val())
      });
   return cands
    
  }
  finalizeproject(post:Post)
  {
    var ref=firebase.database().ref().child('scores').child(post.key!)  
   this.afd.list(ref).snapshotChanges().subscribe(data=>{
     console.log(data)
     console.log(data.length)
     console.log(post.Candidates.length)
     if(data.length==post.Candidates.length)
    firebase.database().ref().child('projects').child(post.key!).child('Finalized').set(true)
    else
    this.UI_message("Not all Candidates have been ranked")
  })
  }
  getCandScores(post:Post)
  {
     
      var ref=firebase.database().ref().child('scores').child(post.key!)
      return this.afd.list(ref).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({...c.payload.val() as User}) 
          )
        )
      ) 
  }
  getCandScore(post:Post,cand:User)
  {
    var score:any
    firebase.database().ref().child('scores').child(post.key!).child(cand.key!).on('value',function (snapshot){
      score=snapshot.child('score').val()
    })
    return of(score)
  }
  deletefailedcandcriteria(post:Post,cand:User)
     {
    this.afd.list('criteriascores/'+post.key+'/'+cand.key).remove()
    this.afd.list('subjectivecriteriascores/'+post.key+'/'+cand.key).remove()
    
}
}


