
import {ViewChild } from '@angular/core';
import { Component, HostListener, OnInit } from '@angular/core';
import {  AngularFireDatabase,  AngularFireList,} from '@angular/fire/compat/database';
import {  FormControl,  FormBuilder,  FormGroup,  Validators, ControlContainer,} from '@angular/forms';
import { User } from 'firebase/auth';
import {MatDialog} from '@angular/material/dialog';
import { ProjectbuildsearchComponent } from '../projectbuildsearch/projectbuildsearch.component';
import { DataService } from 'src/app/shared/services/data.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { ProjectbuildcsvComponent } from '../projectbuildcsv/projectbuildcsv.component';
import { UiMessagesComponent } from '../ui-messages/ui-messages.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/shared/services/post';
import { ThisReceiver } from '@angular/compiler';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
@Component({
  selector: 'app-projectbuild',
  templateUrl: './projectbuild.component.html',
  styleUrls: ['./projectbuild.component.css']
})
export class ProjectbuildComponent implements OnInit {
  users:any[]=[];
   public rankers:any[]=[];
   public editorkey1!:any;
   public editorkey2!:any;
   public cands:any[]=[];
   public post!:Post;
   posts!:Post[];
   addOnBlur = true;
   posting:boolean=false;
  
  public getScreenWidth: any;
  public getScreenHeight: any;
  contentEditable: boolean = false;
  temp_pid = '';
  show_csv = false;
  header = false;
  hoverImage = false;
  project_manager_search: any;
  
  csvRecords: any[] = [];
  User_list = [
    {
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
    },
    {
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
    },
    {
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
    },
    {
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
    },
    {
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
    },
    {
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
    },
    {
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
    },
    {
      id: '',
      name: '',
      surname: '',
      email: '',
      phone: '',
      location: '',
    },
  ];
  Ranker_list = [
    {
      id: 1,
      name: '',
    },
  ];

  constructor(
    public dialog: MatDialog,
    private dataservice: DataService,
    private ngxCsvParser: NgxCsvParser,
    private fb: FormBuilder,
    private router:ActivatedRoute,
    private route:Router
  ) { } ///private firestore: AngularFirestore) { }
  projectArray: any[] = [];
  ngOnInit(): void {
    this.dataservice.getProjectCards().subscribe((res)=>{this.posts=res
    this.dataservice.getUsers().subscribe((res)=>{this.users=res})
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    const routeParams = this.router.snapshot.paramMap;
    var postkeyparam = routeParams.get('postkey');
    if(postkeyparam){
      console.log(this.posts)
    this.posts.forEach((element:any)=>{
        if(element.key==postkeyparam)
        this.post=element
    })
      console.log(this.post)
      this.registrationForm.setValue({Title:this.post.Title,Description:this.post.Description,Project_Manager:this.post.Project_Manager,pid:this.post.key,Open:this.post.Open})
      this.project_manager_search=this.post.Project_Manager
      this.rankers=this.post.Rankers
      this.cands=this.post.Candidates 
      this.dataservice.getUsers().subscribe((res)=>{
        res.forEach(element=>{
          if(element.firstname+" "+element.secondname==this.post.Project_Manager){
             this.editorkey1=element.key
             this.dataservice.geteditorprojects(this.editorkey1).subscribe((data:any)=>{this.dataservice.editorprojects1=data})        
       } 
        })
    })
    }
  })
  }
  @HostListener('unloaded')
ngOnDestroy() {
    
}
 
  addr(): void {
    
    this.dataservice
    .openConfirmDialog()
    .afterClosed()
    .subscribe((res)=>{
    var usr={
      key:res[1],
      email:res[4],
      firstname:res[2],
      secondname:res[3]
    }
    var check=this.rankers.find(obj=>{
          return obj.key==res[1]
    })
    var check2=this.cands.find(obj=>{
      return obj.key==res[1]
    })
   console.log(usr)
    if(check==undefined && check2==undefined && usr.key!=undefined ){
    this.rankers.push(usr)
    this.dataservice.users.forEach( (item:any, index) => {
      if(item.email==usr.email) this.dataservice.users.splice(index,1);
    });
    }
    else if(check)
    this.UI_message("Already a Ranker")
    else if(check2)
    this.UI_message('Already a Candidate')
    })
  }
  addc():void{
    
    
    var editortemp:any
    if(this.project_manager_search!=''){
    this.dataservice.users.forEach( (item:any, index) => {
      if(item.firstname+" "+item.secondname==this.project_manager_search){
        editortemp=this.dataservice.users[index]
        this.dataservice.users.splice(index,1);
      }
    });
  }
    this.dataservice
    .openConfirmDialog()
    .afterClosed()
    .subscribe((res)=>{
    var usr={
      key:res[1],
      email:res[4],
      firstname:res[2],
      secondname:res[3]
    }
    var check=this.rankers.find(obj=>{
      return obj.key==res[1]
      })
      var check2=this.cands.find(obj=>{
     return obj.key==res[1]
      })
    
      if(check==undefined && check2==undefined && usr.key!=undefined )
      {
      this.cands.push(usr)
      this.dataservice.users.forEach( (item:any, index) => {
        if(item.email==usr.email) this.dataservice.users.splice(index,1);
      });
      }
      else if(check)
      this.UI_message("Already a Ranker")
      else if(check2)
      this.UI_message('Already a Candidate')
      if(editortemp)
      this.dataservice.users.push(editortemp!)
    editortemp=undefined
    })
    
  }
  removec(cand: User): void {
    const index = this.cands.indexOf(cand);
    this.users.forEach( (item:any, index) => {
      if(item.email==cand.email) this.dataservice.users.push(this.users[index]);
    });
    if (index >= 0) {
      this.cands.splice(index, 1);
    }
  }
  remover(ranker: User): void {
    const index = this.rankers.indexOf(ranker);
    this.users.forEach( (item:any, index) => {
      if(item.email==ranker.email) this.dataservice.users.push(this.users[index]);
    });
    if (index >= 0) {
      this.rankers.splice(index, 1);
    }
  }

  registrationForm = new FormGroup({
    Title: new FormControl('',Validators.required),
    Project_Manager: new FormControl('',Validators.required),
    Description: new FormControl(''),
    Open:new FormControl(''),
    pid: new FormControl(''),
  });

  //print valeus of form on click( me to disabled to koumpi dn mporw na pathsw "POST" mexri na gemisw ta required fields)
  Post_Button() {
    try{
      if(this.rankers.length==0)
      throw("Project doesnt have any rankers")
      this.checktitle(this.registrationForm.value.Title)
    this.cands.forEach(element=>{if(element.firstname+" "+element.secondname==this.registrationForm.value.Project_Manager){
      throw('Editor cant be a Candidate on the same project')
    }})
    this.rankers.forEach(element=>{if(element.firstname+" "+element.secondname==this.registrationForm.value.Project_Manager){
      throw('Editor cant be a Ranker on the same project')
    }})
 
    if(!this.registrationForm.controls['Title'].valid)
    throw('Title field is not valid')
    if(!this.registrationForm.controls['Project_Manager'].valid)
    throw('Project Manager field is not valid')

        this.posting=true
                  this.post={
                    key:this.router.snapshot.paramMap.get('postkey'),
                    Title:this.registrationForm.value.Title,
                    Description:this.registrationForm.value.Description,
                    Project_Manager:this.registrationForm.value.Project_Manager,
                    Candidates:this.cands,
                    Rankers:this.rankers,
                    Open:this.registrationForm.value.Open
                  }    
                  if(this.router.snapshot.paramMap.get('postkey')){
                  console.log("edit"+this.post.key)
                  this.dataservice.insertProjects(this.post,this.editorkey1,this.editorkey2,'edit')
                  }
         else{
          console.log("creating"+this.post)
        let option = this.dataservice.insertProjects(this.post,this.editorkey1,this.editorkey2);
        if (option == 'BOTHEXISTS') {
          this.UI_message( "Project '" +
          this.registrationForm.value.Title +
          "' already exists!  " +
          "User Of Project Per Reviewer ' " +
          this.registrationForm.value.Project_Manager +
          " ' already exists in an Unfinished Project!")
        }
        if (option == 'project_exists') {
          this.UI_message("Project 1 '" +
          this.registrationForm.value.Title +
          "' already exists !!!");
        }
        if (option == 'ADDED') {
          console.warn('ADDED GAMWWW');
          //reset oles tis times gia na eiani empty to form k oles oi metablhtes
          
          this.registrationForm.reset();
        }
        if (option == 'project_per_reviewer_exists') {
          this.UI_message("User '"+this.registrationForm.value.Project_Manager+"' is Project Manager To Another Unfinished Project")
        
      }
      this.cands=[]
      this.rankers=[]
    }
      
      setTimeout(()=>{                           // <<<---using ()=> syntax
        this.posting = false;
    }, 1500);
  }
  catch(e)
  {
    console.log(e)
    this.UI_message(e)
      
  }
}
  add_toBase() {
    let limit = 0;
    let limit2 = 0;
    let num = this.csvRecords.length;
    if (num > this.User_list.length) {
      //an to csv file periexei pio polla stoixeia apo oti to User List mou prosthetw k alla stoixeia sth lista
      console.log('num: ', num, ' user num: ', this.User_list.length);
      limit = num - this.User_list.length;
      console.log('limit:  ', limit);
      for (var _i = 0; _i < limit; _i++) {
        this.User_list.push({
          id: '',
          name: '',
          surname: '',
          email: '',
          phone: '',
          location: '',
        });
      }
    } else if (num < this.User_list.length) {
      //an to csv file periexei ligotera stoixeia apo oti to User List mou afairw k alla stoixeia apo th lista
      console.log('mikrotero');
      console.log('num: ', num, ' user num: ', this.User_list.length);
      limit2 = this.User_list.length - num;
      console.log('limit:  ', limit2);
      for (var _i = 0; _i < limit2; _i++) {
        this.User_list.pop();
      }
    }
    let i = 0;
    console.log('einai: ', num);
    console.log('einai2: ', this.User_list.length);
    for (let items of this.csvRecords) {
     
      this.User_list[i].id = items[0];
      this.User_list[i].name = items[1];
      this.User_list[i].surname = items[2];
      this.User_list[i].email = items[3];
      this.User_list[i].phone = items[4];
      this.User_list[i].location = items[5];
      i = i + 1;
    
    }
    this.cands.forEach(element=>{
      this.User_list.forEach(element2=>{
        if(element.email==element2.email)
        this.User_list.splice(this.User_list.indexOf(element2),1)
      })
    })
      
    console.log('------------------------------------------');
    console.log('name value  ', this.User_list);
    console.log('------------------------------------------');
    this.User_list.forEach((element:any)=>{
      this.users.forEach(element2=>{
         if(element2.email==element.email)
        {
          this.cands.push(element2)
        }
      })
    })
      console.log(this.cands)
    

  }
  //gia to click finallized
  toggleEditable(csvRecords: any) {
    this.contentEditable = true;
    if (this.contentEditable === true) {
      this.dialog.open(ProjectbuildcsvComponent, {
        width: 'auto',
        disableClose: true,
        data: csvRecords,
      });
    }
    this.add_toBase();
  }
  show() {
    this.dialog.open(ProjectbuildcsvComponent, {
      width: 'auto',
      data: this.csvRecords,
    });
  }

  UI_message(error_msg: any) {
    this.dialog.open(UiMessagesComponent, {
      data: error_msg,
    });
  }
  show_func() {
    this.show_csv = true;
  }
  click_Project_Manager(event: any) {
    if (event === true) {
      this.dataservice
        .openConfirmDialog()
        .afterClosed()
        .subscribe((res) => {
          console.log(res)
          this.add_Project_Manager(res);
          
        });
    }
  }
 checktitle(string:any)
 {
  
  var ecount=0
  var str =string
  
  
  this.posts.forEach(element=>{
    if(element.Title==str)
    ecount=ecount+1
  })
  if(ecount>=1)
  {
    this.UI_message('Title already exists')
    //this.registrationForm.controls['Title'].setErrors({'incorrect': true});
  }

 }
  add_Project_Manager(data: any) {
    console.log('check projects')
    
    var error:any
    
    this.registrationForm.value.Project_Manager=''
    this.project_manager_search=''
    /*this.posts.forEach(element=>
      {
        if(element.Project_Manager==data[2]+' '+data[3] && element.Finalized==false)
        error='manager'
      })
      if(error=='manager'){
      this.UI_message('Manager exists in unfinished')
      this.registrationForm.controls['Project_Manager'].setErrors({'incorrect': true});
      }
      else if(data instanceof Array){
        console.log('no error')
        this.registrationForm.controls['Project_Manager'].setErrors({'incorrect':null});*/

      if (typeof data[3] == 'undefined') {
        this.project_manager_search = '';
        
      } else {
       var str:string=data[2]+' '+data[3];
        this.project_manager_search = str;
        this.registrationForm.value.Project_Manager =str;
       
        this.editorkey2 = data[1]; 
        this.dataservice.geteditorprojects(this.editorkey2).subscribe((data:any)=>{
          this.dataservice.editorprojects2=[]
          this.dataservice.editorprojects2=data
          if(data.length==0)
          this.dataservice.editorprojects2=[]
          })
        
      }
}

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
  fileChangeListener(event: any): void {
    const files = event.srcElement.files;
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: ',' })
      .pipe()
      .subscribe(
        (result: any) => {
          console.log('Result: ', result);
          this.csvRecords = result;
          
          this.toggleEditable(this.csvRecords);
        },
        (error: NgxCSVParserError) => {
          this.UI_message('Please Choose a CSV File !!')
          event.target.value=null
        }
      );
  }

}
