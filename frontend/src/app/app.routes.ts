import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

import { TagsComponent } from './components/partials/tags/tags.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/partials/search/search.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';

export const routes: Routes = [ 
    { path: '', component: HomeComponent },
    { path: 'search/:searchTerm', component: HomeComponent },
    { path: 'tag/:tag', component: HomeComponent },
    { path:'food/:id', component:FoodPageComponent},
    { path:'cart-page', component: CartPageComponent},
    {path:'login', component: LoginPageComponent},
    {path:'register', component: RegisterPageComponent},
    {path:'checkout', component: CheckoutPageComponent, canActivate:[AuthGuard]}

  ];

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, TagsComponent, CommonModule, SearchComponent, 
      HeaderComponent, LoadingComponent],
    providers: [HttpClient],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })

  export class AppComponent{}
  