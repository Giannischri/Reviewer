import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginformComponent } from './components/loginform/loginform.component';
import { SignupformComponent } from './components/signupform/signupform.component';
import { CardsComponent } from './components/cards/cards.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { AuthGuard } from './shared/services/auth.guard';
import { User } from './shared/services/user';
import { VerifyemailComponent } from './components/verifyemail/verifyemail.component';
import { ProjectbuildComponent } from './components/projectbuild/projectbuild.component';
import { ProjecteditComponent } from './components/projectedit/projectedit.component';
import { CriteriaformComponent } from './components/criteriaform/criteriaform.component';
import { CarddetailsComponent } from './components/carddetails/carddetails.component';
import { ProjecteditdetailsComponent } from './components/projecteditdetails/projecteditdetails.component';
import { RoleGuard } from './shared/services/role.guard';
import { CanActivate } from '@angular/router';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { RankcandidatesComponent } from './components/rankcandidates/rankcandidates.component';

const routes: Routes = [
  
  { path: 'sign-in', component: LoginformComponent },
  { path: 'register-user', component: SignupformComponent },
  { path: 'cards', component:  CardsComponent },
  { path: 'cards/:postkey', component: CarddetailsComponent },
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'verify-email', component:VerifyemailComponent },
  { path: 'rank-candidates', component: RankcandidatesComponent,canActivate:[AuthGuard],data:{role:'ranker'} },
  { path: 'adminpanel', component: AdminpanelComponent,canActivate:[AuthGuard],data:{role:'admin'}},
  { path: 'project-build', component: ProjectbuildComponent,canActivate:[AuthGuard],data:{role:'admin'}},
  { path: 'project-build/:postkey', component: ProjectbuildComponent,canActivate:[AuthGuard],data:{role:'admin'}},
  { path: 'cards-edit/:reviewer',component: CardsComponent,canActivate:[AuthGuard],data:{role:'editor'}},
  { path: 'rank-candidates/project-edit-details/:postkey',component: ProjecteditdetailsComponent},
  { path: 'rank-candidates/:postkey',component: RankcandidatesComponent,canActivate:[AuthGuard],data:{role:'ranker'}},
  { path: 'userprofile',component:UserprofileComponent},
  {path:'edit-node',component:CriteriaformComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
