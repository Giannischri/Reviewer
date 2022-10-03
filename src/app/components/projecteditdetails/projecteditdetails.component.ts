import { Component, Renderer2, OnInit,Input,Inject,Output,ViewChild, ElementRef, ViewChildren,QueryList, asNativeElements } from '@angular/core';
import { Post } from 'src/app/shared/services/post';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import { TreeService } from 'src/app/shared/services/tree.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject,empty,of as observableOf,map} from 'rxjs';
import { Criteria } from 'src/app/shared/services/criteria';
import { MatDialog} from '@angular/material/dialog';
import { CriteriaformComponent } from '../criteriaform/criteriaform.component';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/services/user';
import { RatecriteriaComponent } from '../ratecriteria/ratecriteria.component';
import { FocusMonitorDetectionMode } from '@angular/cdk/a11y';
import { NgxCsvParser } from 'ngx-csv-parser';
import { EventEmitter } from '@angular/core';
import { UiMessagesComponent } from '../ui-messages/ui-messages.component';
import { resourceLimits } from 'worker_threads';
import { SimpleChange } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { NgForOf } from '@angular/common';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-projecteditdetails',
  templateUrl: './projecteditdetails.component.html',
  styleUrls: ['./projecteditdetails.component.css']
})

export class ProjecteditdetailsComponent implements OnInit {
  @Input() post?: Post;
  @Input() cand?:User
  @Input() viewonlyability?:boolean
  @Output() myOutput:EventEmitter<string>= new EventEmitter();  

  currentpost: Post={};
  currentcand:User={};
  childrenweightwarn:boolean=false;
  parentweightwarn:boolean=false;
  emptycriteria:boolean=false;
  ability!:any;
  message = '';
  sumscore:any;
  inscore:any;
 vcands!:any[];
 cands!:any[];
 criteriarankers!:any[];
 criteriascores!:any[];
 objcriteria!:any[];
 subcriteria!:any[];
   selectedFile!:File
   changes:boolean=false
   candscore:any;
  treeControl = new NestedTreeControl<Criteria>(node => node.children);
  treeSource = new MatTreeNestedDataSource<Criteria>();
  dataSource: BehaviorSubject<Criteria[]>;
  constructor(public ngxcsv:NgxCsvParser,public authservice: AuthService,private dataservice:DataService,public treesrv:TreeService,public dialog:MatDialog,private route:Router,private router:ActivatedRoute,private el:ElementRef) { 
    this.dataSource = new BehaviorSubject<Criteria[]>([]);
     
  }
  
  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    this.emptycriteria=false
    var postkeyparam = routeParams.get('postkey');
    var criteri
    if(postkeyparam && !this.cand){
    this.currentpost.key=postkeyparam
    this.treesrv.getfromdatabase(this.currentpost).subscribe(data=>this.dataSource.next(data));
    this.dataservice.getProject(this.currentpost.key).subscribe((data:any)=>this.post=data)
    }else{
      console.log("cnad:"+this.cand +"post:"+this.post)
        this.treesrv.getfromdatabase(this.post!).subscribe(data=>{
          if(data.length==0)
          this.emptycriteria=true
          this.dataSource.next(data)
          this.treesrv.getCandScore(this.post!,this.cand!).subscribe(data=>{
            this.candscore=data 
          this.treesrv.getsubjectiveScore(this.post!,this.cand!,this.authservice.userData.key!).subscribe(obj=>{this.treesrv.subjectivescorearray=obj})
          console.log("cands different scores sub")
          console.log(this.treesrv.subjectivescorearray)
          this.treesrv.getobjcriteriascores(this.post!,this.cand!).subscribe(data2=>{
          this.objcriteria=data2
          console.log("getting objective")
          console.log(data2)
          this.objcriteria.forEach((element:any)=>{
          this.dataSource.value.forEach((element2:any)=>{
            this.getcallRecursively(element2,element)
          })
        })
        
        this.treesrv.getsubcriteriascore(this.post!,this.cand!,this.authservice.userData.key!).subscribe(data3=>{
           this.subcriteria=data3
           console.log("getting subjective")
           console.log(data3)
           this.subcriteria.forEach((element:any)=>{
            this.dataSource.value.forEach((element2:any)=>{
              this.subjectivegetcallRecursively(element2,element)
            })
           })
           this.refresh()
           this.entryscoregen()
          
       
        
        })
      
      
      }) 
    })
        });
        
        
       
       
    //this.criteriarankers=this.treesrv.getObjectiveScore(this.post!,this.cand!)
    
    this.vcands=this.treesrv.checkfinalization(this.post!)  
    
    }
    console.log(this.viewonlyability)
    if(this.post!.Finalized==true && this.post?.Finalized)
      this.viewonlyability=true
    if(this.viewonlyability==false ){
      if(this.authservice.userData.roles?.employee){
    this.ability=this.authservice.getrole()
      }
    }
    else{
    this.ability=''
    } 
   
   
    this.dataSource.subscribe(items => {
      this.treeSource.data= [];
      this.treeSource.data = items;
    });  
    
   
  }
  entryscoregen()
  {
    var sumup:boolean=true
    var sumscore=0
   console.log('entry score gen')
    this.dataSource.value.forEach(element=>{
      console.log(element.score+"   "+element.weight)
        if(!element.score || (element.subjective==true && !element.allvoted))
        sumup=false
        if(element.weight!>1)
        sumscore+=element.score!*(element.weight!/100)
        else
        sumscore+=element.score!*element.weight!
    })
    sumscore=+sumscore.toFixed(2)
    if(this.candscore!=null && this.changes==false){
    this.myOutput.emit(this.candscore+"")
    console.log("score already exists")
    }
    else if(sumup && !this.emptycriteria && this.changes==true ){
     console.log("score generated after change"+sumscore)
    this.myOutput.emit(sumscore+"")
    }else if(this.changes==false && this.candscore==null && sumscore){
     this.myOutput.emit(sumscore+"")
     console.log("score generated automatically"+sumscore)
    }
  }
  subjectivegetcallRecursively(node:Criteria,snode:Criteria)
  {
   
    if(node.title==snode.title && node.subjective==true)
   {
    node.score=snode.score
    node.key=snode.key
   
   }
   if(this.treesrv.subjectivescorearray && this.getOccurrence(this.treesrv.subjectivescorearray,node.title!)==this.post?.Rankers.length && node.subjective==true )
    {
      this.subjectivescoregeneration(node)
      this.subcriteria.forEach(element=>{
        if(element.title==node.title && element.score==0){
          node.score=0
        }
      })
      
    }
    if(node.children) {
      node.children.forEach((childNode:any) => {
        this.subjectivegetcallRecursively(childNode,snode);
      });
    }
  }
  getcallRecursively(node:Criteria,snode:Criteria,post?:Post,cand?:User,ranker?:string)
  {
    
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
  }
  subjectivescoregeneration(node:Criteria){
   
      let count = this.treesrv.subjectivescorearray!.filter((obj) => obj.title === node.title).length;
      let totalPrice = this.treesrv.subjectivescorearray!
      .filter(
        (item) =>
          item.title === node.title 
      )
      .reduce((accumulator, item) => {
        return accumulator + item.score;
      }, 0);
        node.allvoted=true
        console.log(count+"  "+totalPrice)
        node.score=+(totalPrice /count).toFixed(2) 
      
  }
  autoscoregeneration(node:Criteria)
  {
    
      var allowed=true
      var sumscore=0;
      if(node.children){
        
       node.children.forEach((element:Criteria)=>{ 
        
                if(!element.score || (element.subjective==true && !element.allvoted))
                allowed=false
                if(element.weight!>1){
                sumscore+=(element.weight!/100)*element.score!
                }
                else
                sumscore+=element.weight!*element.score!
                })
              
      if(allowed){
        
        node.score=+sumscore.toFixed(2)
        this.treesrv.savecriteriascore(this.post!,this.cand!,this.authservice.userData.key!,node)
      }
    }
    
    
    
  }
  getOccurrence(array:any[], value:string) {
    var count = 0;
    array.forEach((v) => (v.title === value && count++));
    return count;
}
getOccurrencescore(array:any[], value:number) {
  var count = 0;
  array.forEach((v) => (v.score === value && count++));
  return count;
}
  UI_message(error_msg: any) {
    this.dialog.open(UiMessagesComponent, {
      data: error_msg,
      width:'350px'
    });
  }
  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if( changes['post'] && changes['post'].previousValue != changes['post'].currentValue ) {
      this.ngOnInit()
      
    } 
    if( changes['cand'] && changes['cand'].previousValue != changes['cand'].currentValue ) {
      this.ngOnInit()
      
    } 
    
  }
 refresh(){
    this.dataSource.value.forEach(element=>{
      this.gettempcallRecursively(element)
     })
  }
  missedinterview(){
    this.myOutput.emit(-1+"")
    this.candscore=-1
    this.dataSource.value.forEach(element=>{
      this.zeroalldata(element)
    })
    this.changes=false
    this.treesrv.savescore(this.post!,this.cand!,this.authservice.userData.key!,-1)
    this.UI_message('Candidate Missed the interview')
      
  }
  zeroalldata(node:Criteria)
  {
    node.score=0
    this.treesrv.savecriteriascore(this.post!,this.cand!,this.authservice.userData.key!,node)
    console.log(node)
      if(node.children) {
        node.children.forEach((childNode:any) => {
          this.zeroalldata(childNode);
        });
      }
    
  }
  finalize()
  {
    
  if(this.vcands.length==this.post?.Candidates.length){
      this.treesrv.finalizeproject(this.post!);
      this.UI_message('Project Finalized')
  }
      else
      this.UI_message('Not all candidates have been ranked.So you cant finalize it')
  
  }
  
  submitCriteria()
  {
    
    this.treesrv.post=this.post
    this.treesrv.addtodatabase(this.dataSource.value);
    
  }
  deleteCriteria()
  {
    this.dataSource.next([])
    this.UI_message('Please enter new Criteria and Save')
  }
 gettempcallRecursively(node:Criteria)
  {
     if(node.subjective==true && !node.score && node.allvoted==undefined)
     {
      this.autoscoregeneration(node)   
     }
    if(node.children) {
      node.children.forEach((childNode:any) => { 
        this.gettempcallRecursively(childNode);
      });
    }
  
  }

  scoregeneration(node:Criteria,input:string)
  {
    //console.log(this.treeSource.data)
    var allowed:boolean=true
    var allvoted:boolean=true
    var min,max
    var sumscore=0;
    if(node.numbers!)
    {
      if(input.indexOf(':') > -1)
      {
       node.numbers=node.numbers.filter((value,index)=>{return value.splice(value.indexOf(':'),1)})
      }
      max=Math.max(...node.numbers)
      min=Math.min(...node.numbers)
    }else if(node.range)
    {
      if(typeof node.range.min=='string'){
      max=node.range.max!.charCodeAt(0) - 97
      min=node.range.min!.charCodeAt(0) - 97
      }
      else
      {
        max=node.range.max!
        min=node.range.min!
      }
    } 
    if(node.children){
    node.children.forEach(element=>{ 
      
      if(element.subjective==true  && !element.allvoted)
      allvoted=false
      if(!element.score)
      allowed=false
      if(element.weight!>1){
        
      sumscore+=(element.weight!/100)*element.score!
      
      }
      else
      sumscore+=element.weight!*element.score!
    })
    if(allowed && allvoted){
    node.score=+sumscore.toFixed(2)
  /* if(node.score<=min){
      this.treesrv.savescore(this.post!,this.cand!,this.authservice.userData.key!,'0')
      this.UI_message('Candidate failed')
        this.route.navigateByUrl('/cards')
    }*/
     if(node.score){
      console.log("dad node generated"+node)
     var data:Criteria[]=this.treeSource.data
    this.treesrv.savecriteriascore(this.post!,this.cand!,this.authservice.userData.key!,node)
    if(this.getOccurrence(this.treesrv.subjectivescorearray,node.title!)==this.post?.Rankers.length && node.subjective==true){
    node.allvoted=true
    this.subjectivescoregeneration(node)
    }
    }
  }
  } 
  }
  scoregeneration2(node:Criteria,input:any)
  {
    console.log('nodescoregen')
    var max=0,min=0,inputnum;
    this.sumscore=0
    if(node.numbers!)
      {
        if(input.indexOf(':') > -1)
        { 
          var temp:any[]=[]
           node.numbers.forEach((value:String)=>{temp.push(value.split(':')[1])})
           min=Math.min(...temp)
           max=Math.max(...temp)
           input=input.split(':')[1]
           console.log(min+"+"+input)
        }else{
        max=Math.max(...node.numbers)
        min=Math.min(...node.numbers)
        }
      }else if(node.range)
      {
        if(typeof node.range.min=='string'){
        max=node.range.max!.charCodeAt(0) - 97
        min=node.range.min!.charCodeAt(0) - 97
        input=input.charCodeAt(0) - 97
        }
        else
        {
          max=node.range.max!
          min=node.range.min!
        }
      } 

      
      var normalval:number=0;
      if(node.direction=='Positive')
       normalval=(input-min)/(max-min)
      else if(node.direction=='Negative')
       normalval=(max-input)/(max-min)
      
     node.score=+normalval.toFixed(2)
     
     if(input==min && node.important==true)
     {
      console.log("zero cand")
      this.zerocandidate(node)
     }
     
      var data:Criteria[]=this.treeSource.data
     this.treesrv.savecriteriascore(this.post!,this.cand!,this.authservice.userData.key!,node)
    
      if(this.getOccurrence(this.treesrv.subjectivescorearray,node.title!)==this.post?.Rankers.length){
      node.allvoted=true
      console.log("subjectivescore generation")
      this.subjectivescoregeneration(node)
      }
    
     
  }
  hasChild(index: number, node: Criteria){
    
    if(node.children){
    return true;
    }
    else
    {
    return false;
    }
    
  }
  hasNoContent(index: number,node: Criteria){
    
    if(node.title==''){
    return true
    }
    else{
    return false
    }
  }
  toggleNode(node: Criteria) {
    this.treeControl.toggle(node);
  }
  getScore(event: Event,node:Criteria): string{
    return (event.target as HTMLInputElement).value;
  }
  getinputScore(event: Event,node:Criteria)
  {
     this.inscore=(event.target as HTMLInputElement).value;
  }
 /* getObjective(node:Criteria)
  {
    this.treesrv.objectivescore=0
    console.log(this.criteriarankers)
    this.criteriarankers.forEach((element:any[])=>{
      console.log(element)
         // this.treesrv.sumcallRecursively(element,node)
    })
  
  node.score=this.treesrv.objectivescore
  }*/
  zerocandidate(node:Criteria)
  {
  this.UI_message('Candidate failed')
  node.score=0
  this.treesrv.savecriteriascore(this.post!,this.cand!,this.authservice.userData.key!,node)
  this.myOutput.emit(0+"")
  this.candscore=0
  this.treesrv.savescore(this.post!,this.cand!,this.authservice.userData.key!,0)
  this.changes=false
  return 
  }
  checkchanges(node?:Criteria,input?:any){
    this.changes=true
    var sumscore=0
    if(node){
   if(node.important==true)
   {
    if( node.range && node.range.min  && typeof node.range.min=='string'){
      if(input.charCodeAt(0) - 97==node!.range!.min!.charCodeAt(0) - 97)
      {
       this.zerocandidate(node)
        return
      }
      }
    else if((node.range && node.range.min==input))
    {
      this.zerocandidate(node)
      return
    }
    else if(node.numbers)
    {
      if(Math.min(...node.numbers)==input){
        this.zerocandidate(node)
        return
      }
      
      else if(input.indexOf(':') > -1)
        { 
          
          var temp:any[]=[]
           node.numbers.forEach((value:String)=>{temp.push(value.split(':')[1])})
           if(input.split(':')[1]==Math.min(...temp)){
            this.zerocandidate(node)
            return
           }

        }   
    }
   }
   
   var ancestors=this.getAncestors(this.treeSource.data,node.title!)
   var parent:Criteria=ancestors[ancestors.length-2];
   
  if(input)
   this.scoregeneration2(node,input)
   if(node.children)
   {
    node.children.forEach(element=>{
      element.score=+''
    })
   }
   if(parent)
   {
        for(let i=ancestors.length-1;i>=0;i--)
        {
        this.scoregeneration(ancestors[i],input)
        }
    }}
    console.log("score gen after changes")
    var sumup:boolean=true
    this.treeSource.data.forEach(element=>{
        if(!element.score || (element.subjective==true && !element.allvoted))
        sumup=false
        if(element.weight!>1)
        sumscore+=element.score!*(element.weight!/100)
        else
        sumscore+=element.score!*element.weight!
    })
    if(sumup){
      sumscore=+sumscore.toFixed(2)
   this.myOutput.emit(sumscore+"")
    }
   
   }
  
  getAncestors(array:Criteria[], name:string):any {
    if (typeof array !== 'undefined') {
      for (let i = 0; i < array.length; i++) {
        if (array[i].title === name) {
          
          return [array[i]];
        }
        
        const a:Criteria[] = this.getAncestors(array[i].children!, name);
        if (a !== null) {
          a.unshift(array[i]);
          return a;
        }
      }
    }
    return null
  }
  
 weightcheck(parent:Criteria,result:any)
 {
    
  var rootsum=0;
 
      if(this.treeSource.data.length>1){
        rootsum=this.treeSource.data.map(item => Number(item.weight)).reduce((prev, next) => prev! + next!);
       }
       else
        rootsum=result.data.weight
    
        if(rootsum!=1 && rootsum!=100){
        this.UI_message('Parent total weight isnt 1 or 100')
        this.parentweightwarn=true
        
        }
        else
        this.parentweightwarn=false

       var sum2=0
        if(parent?.children){
        sum2=parent!.children.map(item=> Number(item.weight)).reduce((prev, next) => prev! + next!) 
        if(sum2!=1 && sum2!=100){
        this.UI_message("children total weight isnt 1 or 100")
        this.childrenweightwarn=true
        
        }
        else
        this.childrenweightwarn=false
        }
        
 }
  
  openDialog(parent?:Criteria,edit?:boolean) {
   
  
    let dialogRef = this.dialog.open(CriteriaformComponent,{
      data: {
        
        action:'add',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    
      if (parent) {
        
        parent.children = [
          ...(parent.children || []),
          result.data
        ];
        if (!this.treeControl.isExpanded(parent)) {
          this.treeControl.expand(parent);
        }
      }
    
      else {
        
        this.dataSource.next([
          ...this.dataSource.value,
          result.data
        ]);
      }
      
      this.dataSource.next(this.dataSource.value);
      this.weightcheck(parent!,result)
      if(this.parentweightwarn==false && this.childrenweightwarn==false)
      this.submitCriteria()
    });
    
  }
  openDialog2(parent:Criteria)
  {
    
    const dialogRef = this.dialog.open(CriteriaformComponent,{
      data: {
        parent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      
      
      if(result){
     parent.weight=result.data.weight
     parent.title=result.data.title
     parent.description=result.data.description
     parent.important=result.data.important
     parent.subjective=result.data.subjective
     parent.range=result.data.range
     parent.numbers=result.data.numbers
     parent.direction=result.data.direction
      }
      console.log('open dialog2')
      this.dataSource.next(this.dataSource.value)
    this.weightcheck(parent!,result)  
        if(this.parentweightwarn==false && this.childrenweightwarn==false)
        this.submitCriteria()
    })
    

  }



  openDialog3(node:Criteria)
  {
    
    const dialogRef=this.dialog.open(RatecriteriaComponent,{
      data:{
        weight:node.weight,
        title:node.title,
        numbers:node.numbers,
        range:node.range,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
     if(result)
     this.checkchanges(node,result.data)
  })
  }
  removenode(node:Criteria)
  {
    var ancestors=this.getAncestors(this.treeSource.data,node.title!)
    var parent=ancestors[ancestors.length-2]
   if(ancestors.length==1){
    this.treeSource.data.forEach(element=>{
      if(element==node){
        var i=this.treeSource.data.indexOf(node)
        if (i >= 0) {
          this.treeSource.data.splice(i, 1);
        }
      }
    })
   }else{
    parent.children.forEach((element:any)=>{
      if(element==node){
      var i=parent.children.indexOf(node)
      if (i >= 0) {
        parent.children.splice(i, 1);
      }
      }
    })
  }
  this.weightcheck(parent,node)
  this.dataSource.next(this.dataSource.value)
  if(this.parentweightwarn==false && this.childrenweightwarn==false)
  this.submitCriteria()
  }
  fileChangeListener(event: any): void {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
     var carray=JSON.parse(fileReader.result as string);
     this.dataSource.next(carray.Criteria)
     this.submitCriteria()
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }
 
  
}

 
  
  



 
 


