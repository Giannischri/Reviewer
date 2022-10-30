import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/services/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  @Input() user?: User;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  form = new FormGroup({
    firstname:new FormControl(''),
    secondname:new FormControl(''),
    email:new FormControl(''),
    plainuser:new FormControl(''),
    simple: new FormControl(''),
    ranker: new FormControl(''),
    editor:new FormControl(''),
    admin:new FormControl(''),
  });
  currentuser: User = {
      key:'',
      uid: '',
      email: '',
      firstname:'',
      secondname:'',
      roles: {
       
        admin: false,
      },
      emailVerified: false,
  };
  message = '';
  constructor(private authservice: AuthService) { }
  ngOnInit(): void {
    this.message = '';
  }
  ngOnChanges(): void {
    this.message = '';
    if(this.user){
    this.currentuser ={
      ...this.user
    };
    console.log(this.currentuser)
    this.form.reset()
      this.form.get('firstname')?.setValue(this.currentuser.firstname)
      this.form.get('secondname')?.setValue(this.currentuser.secondname)
      this.form.get('email')?.setValue(this.currentuser.email)
      this.form.get('simple')?.setValue(this.currentuser.roles?.employee?.simple)
      //this.form.get('editor')?.setValue(this.currentuser.roles?.employee?.editor)
      //this.form.get('ranker')?.setValue(this.currentuser.roles?.employee?.ranker)
      this.form.get('admin')?.setValue(this.currentuser.roles?.admin)
      if(this.currentuser.roles?.admin==false && !this.currentuser.roles.employee?.simple && !this.currentuser.roles.employee?.ranker && !this.currentuser.roles.employee?.editor)
      this.form.get('plainuser')?.setValue('true')
      else if(this.currentuser.roles?.employee?.simple || this.currentuser.roles?.employee?.editor || this.currentuser.roles?.employee?.ranker)
      this.form.get('simple')?.setValue(true)
    
  }
  }
  
  updateTutorial(): void {
    const data = {
      firstname: this.currentuser.firstname,
      secondname: this.currentuser.secondname,
      email:this.currentuser.email,
      roles: {
        admin: this.form.get('admin')?.value?true:false,
        employee:{
        ranker: this.form.get('ranker')?.value?true:false,
        editor:this.form.get('editor')?.value?true:false,
        simple:this.form.get('simple')?.value?true:false,
        }
        
      },
      emailVerified: this.currentuser.emailVerified,
    };
    if(this.form.get('plainuser')?.value==true){
      data.roles.admin=false
      data.roles.employee.ranker=false
      data.roles.employee.editor=false
      data.roles.employee.simple=false
    }
    
    if (this.currentuser.key) {
      
     
      this.authservice.update(this.currentuser.key,data)
      .then(() => this.message = 'The tutorial was updated successfully!')
       .catch(err => console.log(err));
    }
  }
 

}
