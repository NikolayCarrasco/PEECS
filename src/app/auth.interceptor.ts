import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService
  ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const skipIntercept = req.headers.has('skip');

      if (skipIntercept) {

          req = req.clone({
          headers: req.headers.delete('skip')
        });
        return next.handle(req);
      }
      req = this.addToken(req);     
      
      return next.handle(req);
  }

  private addToken(req: HttpRequest<any>) {

    const token = this.authService.getToken();
    
    if (token){
      req = req.clone({
        setHeaders: {
            token: token
        }
      });
      return req;
    }
    return req;
  }


}
