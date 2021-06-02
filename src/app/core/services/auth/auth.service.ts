import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenService } from './../../services/token/token.service';
import * as CryptoJS from 'crypto-js'
import { JwtHelperService } from "@auth0/angular-jwt";
import { RoutesService } from './../../services/routes/routes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private privateKey: string = environment.privateKey;
  private tokenDecoder = new JwtHelperService();

  constructor( 

    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: RoutesService 
    
    ) { 
   
  }

  login(email: string, password: string): Observable<any>{

    return this.httpClient.post( this.baseUrl + '/auth/login',
    {
      email,
      password
    }).pipe(
      tap(
        (data: any) => {
            //this.tokenService.saveToken(this.encrypt(data.token));
            this.tokenService.saveToken(data.message.token);
            this.router.login(this.entity());
        }
      )
    )
  }



  logout(){
    this.tokenService.removeToken();
    this.router.logout();
  }

  isLogged(): boolean{
    const token = this.tokenService.getToken();
    return (token !== null)? true : false;
  }

  entity(): string | null{
    const token = this.tokenDecoder.decodeToken(this.getToken());
    return token.entity;
  }

  getToken(){
    //return this.decrypt(this.tokenService.getToken()!);
    return this.tokenService.getToken()!;
  }

  private encrypt(token: string): string{
    const key = CryptoJS.enc.Utf8.parse(this.privateKey);
    const iv = CryptoJS.enc.Utf8.parse(this.privateKey);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(token.toString()), key,
    {
        keySize: 128 / 8,
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  private decrypt(token: string): string {

    const key = CryptoJS.enc.Utf8.parse(this.privateKey);
    const iv = CryptoJS.enc.Utf8.parse(this.privateKey);
    const decrypted = CryptoJS.AES.decrypt(token, key, {
        keySize: 128 / 8,
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
