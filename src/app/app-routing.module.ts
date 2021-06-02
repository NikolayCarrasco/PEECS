import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './core/guards/logged/logged.guard';
import { LoginComponent } from './visitor/login-screen/login-screen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'visitor',
    loadChildren: () => import('./visitor/visitor.module')
      .then(m => m.VisitorModule),
      canActivate: [LoggedGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
