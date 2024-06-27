import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitleComponent } from "../../partials/title/title.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service'; 
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from '../../partials/default-button/default-button.component';
import { InputContainerComponent } from '../../partials/input-container/input-container.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.css',
    imports: [TitleComponent, CommonModule, TextInputComponent, 
      DefaultButtonComponent, InputContainerComponent, RouterLink]
})
export class LoginPageComponent implements OnInit {

  loginForm!:FormGroup;
  toastrService = inject(ToastrService);
  isSubmitted = false;
  returnUrl = '';
  constructor(private formBuilder: FormBuilder
    , private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({email:this.fc.email.value,
      password: this.fc.password.value}).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
  }
}
