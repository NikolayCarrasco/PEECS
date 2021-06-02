import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private router: Router
  ) { }

  login(entity: string | null): null{
    if(entity !== null){
      if(entity === 'Admin'){
        this.router.navigate(['/admin'])
      }
      if(entity === 'User'){
        this.router.navigate(['/user'])
      } 
    }
    return null;
   }

  logout(){
    this.router.navigate(['./visitor']);
  }

  register(){}

}
