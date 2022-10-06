import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase,AngularFireList,AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, of, UnsubscriptionError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UiMessagesComponent } from 'src/app/components/ui-messages/ui-messages.component';
import { rejects } from 'assert';
import { ChooseroleComponent } from 'src/app/components/chooserole/chooserole.component';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: User={}; 
  userRef: AngularFireList<User>;
  user:any;
  logged:any
  aer:any='false,false,false'
  currentrole:any;
  fullname!:any;
  constructor(
    public afd:AngularFireDatabase,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    public dialog:MatDialog
   
  ) {
    this.userRef=afd.list('/users'),
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log("logged bitch");
       this.ValidateToken()
       this.SetSignIn(user.email);
       
       
      } else {
        console.log("delog bitch");
      
      }
    });
  }
  GenerateToken()
  {
   this.afAuth.idToken.subscribe(res=>{
    if(res)
    localStorage.setItem('access-token',res)
  })
  }
  ValidateToken()
  {
    var bool=false
    this.afAuth.idToken.subscribe(res=>{
      if(res==localStorage.getItem('acess-token'))
        bool=true
    })
    return bool
  }
 
  
  // Sign in with email/password
  SignIn(email: string, password: string) {
    
    var exists:boolean=false
    this.afd.list('users').valueChanges().subscribe(res=>{
      res.forEach((element:any)=>{
        if(element.email==email)
        exists=true
      })
    })
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.SetSignIn(email)
          this.GenerateToken();
          this.router.navigate(['cards'])
        });
        
        
        
      })
      .catch((error) => {
        
        if(error.code=='auth/invalid-email')
        this.UI_message('invalid email form')
          else if(error.code=='auth/user-not-found')
          this.UI_message('User doesnt exists')
          else if(error.code=="auth/wrong-password")
        this.UI_message('User password is wrong')
        else if(error.code=="auth/too-many-requests")
        this.UI_message('Too many trys please wait or change password')
        this.router.navigate(['sign-in'])
      });
      
  }
  // Sign up with email/password
  SignUp(firstname:string,secondname:string,email: string, password: string,password2:string) {
    
    if(password==password2){
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        //this.SendVerificationMail();
        
        this.SetUserData(result.user,firstname,secondname);
        
        
      })
      .catch((error) => {
        this.UI_message('User name already exists')
      });
      
    }
    else{
      this.UI_message('Passwords dont match')
      return this.afAuth
    }
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.UI_message('Password reset email sent, check your inbox.')
      })
      .catch((error) => {
        this.UI_message(error);
      });
  }
  // Returns true when user is looged in and email is verified
 
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['cards']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        
        this.afd.database.ref().child("users").orderByChild("email").equalTo(result!.user!.email!).once("value",snapshot => {
          
          if (snapshot.exists()){
            this.GenerateToken()
            
          }
          else
          {
          this.SetUserData(result.user);
          this.GenerateToken()
          }
      });
      this.ngZone.run(() => {
        this.router.navigate(['cards']);
        
        
      });
      })
      .catch((error) => {
        this.UI_message(error);
      });
      
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any,firstname?:string,secondname?:string) {
    
    
    if(firstname!=null && secondname!=null){
      var key=this.afd.createPushId();
    const userData: User = {
      uid: key,
      email: user.email,
      firstname:firstname,
      secondname:secondname,
      roles: {
        admin:false,
        employee:{
            simple:false,
            editor:false,
            ranker:false,
        }
      },
      emailVerified: user.emailVerified,
    };
    
    
   this.afd.list('/users').set(key,userData);
   
     //this.afs.collection('users').add(userData);

  }
  else
  {
    var key=this.afd.createPushId();
    var fname=user.displayName.split(" ");
    const userData: User = {
      uid: key,
      email: user.email,
      firstname:fname[0],
      secondname:fname[1],
      roles: {
        admin:false,
        employee:{
          simple:false,
          editor:false,
          ranker:false,
      }
      },
      emailVerified: user.emailVerified,
    };
    this.afd.list('/users').set(key,userData);
    
    
  }
 /* this.SendVerificationMail();
  this.ngZone.run(() => {
    
    
  });*/
  this.router.navigate(['sign-in']);
  }
  getuserkey(email:any){
    return this.userRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    )
  }
  SetSignIn(email:any){
    this.userRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
         for(var index in data)
              { 
                if(data[index].email==email)
                 {
                  this.userData= {
                    key:data[index].key,
                    email: email,
                    firstname:data[index].firstname!,
                    secondname:data[index].secondname!,
                    roles: {
                      
                      admin: data[index].roles?.admin?true:false,
                      employee:{
                        editor: data[index].roles?.employee?.editor?true:false,
                        ranker: data[index].roles?.employee?.ranker?true:false,
                        simple:data[index].roles?.employee?.ranker?true:false,
                      }
                      
                    },
                 }
                
                }
              }
             this.fullname=this.userData.firstname+" "+this.userData.secondname
             if(!localStorage.getItem('roles')){
           this.aer=String(this.userData.roles?.admin)+','+String(this.userData.roles?.employee?.editor)+','+String(this.userData.roles?.employee?.ranker)
           localStorage.setItem('roles',this.aer)
         //  if(this.userData.roles?.employee?.editor==true && this.userData.roles?.employee?.ranker==true )
         //  this.dialog.open(ChooseroleComponent)
             }
            
    });
    
   
    console.log(this.userData)
    
  }
  
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('roles');
      localStorage.removeItem('access-token');
      localStorage.removeItem('role')
      this.currentrole=null
      this.router.navigate(['sign-in'])
      .then(() => {
        window.location.reload();
      });
    });
  }
  update(key:string,value:any):Promise<void>{
    return this.afd.database.ref("users/").child(key).update(value);
  }
  delete(key:string):Promise<void>{
    return this.afd.list('/users').remove(key);
  }
 
  getrole(){
    let roles=localStorage.getItem('roles')?.split(',')
   
    if(roles){
      if (roles![1]=='true' && roles![2]=='true')
      return 'editor+ranker'
    else if (roles![1]=='true'){
    return 'editor'
    }
    else if(roles![0]=='true'){
    return 'admin'
    }
    else if(roles![2]=='true'){
    return 'ranker'
    }
    
    else {
    return 'viewer'
    }
  }
  else 
  return 'viewer'
  }
 
  get isLogged(): boolean {
    const token = localStorage.getItem('access-token');
    return (token !== null) ? true : false;
  }
  UI_message(error_msg: any) {
    this.dialog.open(UiMessagesComponent, {
      data: error_msg
    });
  }
  
}