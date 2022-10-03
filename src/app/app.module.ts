import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { MatTreeModule } from '@angular/material/tree';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { SignupformComponent } from './components/signupform/signupform.component';
import { LoginformComponent } from './components/loginform/loginform.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AuthService } from "./shared/services/auth.service";
import { CardsComponent } from './components/cards/cards.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { ProjectbuildComponent } from './components/projectbuild/projectbuild.component';
import { ProjectbuildsearchComponent } from './components/projectbuildsearch/projectbuildsearch.component';
import { ProjectbuildcsvComponent } from './components/projectbuildcsv/projectbuildcsv.component';
import { ProjecteditComponent } from './components/projectedit/projectedit.component';
import { ProjecteditdetailsComponent } from './components/projecteditdetails/projecteditdetails.component';
import { CriteriaformComponent } from './components/criteriaform/criteriaform.component';
import { UiMessagesComponent } from './components/ui-messages/ui-messages.component';
import { CarddetailsComponent } from './components/carddetails/carddetails.component';
import { RouterModule } from '@angular/router';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { VerifyemailComponent } from './components/verifyemail/verifyemail.component';
import { RankcandidatesComponent } from './components/rankcandidates/rankcandidates.component';
import { RatecriteriaComponent } from './components/ratecriteria/ratecriteria.component';
import { CardsearchComponent } from './components/cardsearch/cardsearch.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { ChooseroleComponent } from './components/chooserole/chooserole.component';
import { NavbarComponent } from './components/navbar/navbar.component';




const firebaseConfig = {
  apiKey: "AIzaSyDW2jDlzvDM-pEOg_wmqwPnsvEm1klJ9Os",
  authDomain: "reviewer-9883a.firebaseapp.com",
  projectId: "reviewer-9883a",
  storageBucket: "reviewer-9883a.appspot.com",
  messagingSenderId: "999877669969",
  appId: "1:999877669969:web:68cb8881d0959e882a7470"
};

@NgModule({
  declarations: [
    AppComponent,
    SignupformComponent,
    LoginformComponent,
    CardsComponent,
    ForgotpasswordComponent,
    AdminpanelComponent,
    UserdetailsComponent,
    ProjectbuildComponent,
    ProjectbuildsearchComponent,
    ProjectbuildcsvComponent,
    ProjecteditComponent,
    ProjecteditdetailsComponent,
    CriteriaformComponent,
    UiMessagesComponent,
    CarddetailsComponent,
    UserprofileComponent,
    VerifyemailComponent,
    RankcandidatesComponent,
    RatecriteriaComponent,
    CardsearchComponent,
    ChooseroleComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatTreeModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    CoolSocialLoginButtonsModule,
    NgxCsvParserModule,
    ScrollingModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule,
    AngularFireDatabaseModule
    
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
