import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import 'animate.css'
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  container_login!: ElementRef;
  container_register!: ElementRef;

  login: boolean = true;
  register: boolean = false;
  forgotPassword: boolean = false;

  modelId: string = '';
  modelName: string ='';
  modelLastname: string = '';
  modelCarnet: string = '';
  modelEmail: string = '';
  modelPassword: string = '';
  modelCarnetPass: string = '';
  modelnewPass: string = '';

  registerForm: FormGroup
  loginForm: FormGroup


  constructor(private elementRef: ElementRef, private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.container_login = this.elementRef.nativeElement.querySelector('#container_login');
    this.container_register = this.elementRef.nativeElement.querySelector("#container_register");
  }

  showLogin(){
    this.register = false;
    this.login = true;
  }

  showRegister(){
    this.register = true;
    this.login = false;
  }

  showForgotPassword(){
    this.register = false;
    this.login = false;
    this.forgotPassword = true;
  }

  async loginUser(){
    const body = {
      "username": this.loginForm.get('username')?.value,
      "password": this.loginForm.get('password')?.value
    }
    const res = await this.userService.loginUser(body);
    console.log(res)
    if(res?.code  == 'USER_LOGED'){
      this.router.navigateByUrl('/dashboard');
      sessionStorage.setItem('access_token', res?.access_token)
    }else{
      
    }
  }
  async registerUser(){
    const body = {
      "username": this.registerForm.get('username')?.value,
      "email": this.registerForm.get('email')?.value,
      "password": this.registerForm.get('password')?.value
    }

    const res = await this.userService.registerUser(body);
    if(res?.code == 'USER_CREATED'){
      alert('Usuario creado correctamente')
    }else{
      alert('Error creating post')
    }
  }

  async updatePassword(){
    /* const body = {
      "carnet": this.modelCarnetPass,
      "password": this.modelnewPass
    }

    const res = await this.userService.updatePassword(body);
    if (res?.statusCode == 200){
      alert('Contraseña actualizada correctamente')
    }else{
      alert('Error actualizando contraseña')
    } */
  }



}
