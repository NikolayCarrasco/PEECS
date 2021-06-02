import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})

export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  messageFlag = 0;

  constructor( 

      private authService: AuthService,
      private router: Router, 
      private formBuilder: FormBuilder,

  ) {

    this.registerForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required]]}

    );
  }
  
  ngOnInit(): void {
  }

  get email() { return this.registerForm?.get('email'); }
  get password() { return this.registerForm?.get('password'); }



  async onSubmit(): Promise<void>{
    const email = this.email?.value;
    const password = this.password?.value;
    try {
      await this.authService.login(email!,password!).toPromise();
      this.messageFlag = 0;
    } catch (error) {
      this.messageFlag = 1;
    }

  }

}
