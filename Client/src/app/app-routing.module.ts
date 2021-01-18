import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CdCreateComponent } from './components/cd/cd-create/cd-create.component';
import { CdEditComponent } from './components/cd/cd-edit/cd-edit.component';
import { CdsComponent } from './components/cd/cds/cds.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UsersComponent } from './components/user/users/users.component';
import { AcessGuard } from './guard/acess.guard';
import { GerenicAcessGuard } from './guard/gerenic-acess.guard';

const routes: Routes = [
  {path: '', component: LoginComponent , canActivate: [AcessGuard]},
  {path: 'home', component: HomeComponent, canActivate: [GerenicAcessGuard]},
  {path: 'cds', component: CdsComponent, canActivate: [GerenicAcessGuard]},
  {path: 'cdEdit', component: CdEditComponent, canActivate: [GerenicAcessGuard]},
  {path: 'cdCreate', component: CdCreateComponent, canActivate: [GerenicAcessGuard]},
  {path: 'users', component: UsersComponent, canActivate: [GerenicAcessGuard]},
  {path: 'userEdit', component: UserEditComponent, canActivate: [GerenicAcessGuard]},
  {path: 'userCreate', component: UserCreateComponent, canActivate: [GerenicAcessGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
