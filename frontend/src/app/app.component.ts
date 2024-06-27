import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterOutlet } from '@angular/router'; 
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { SearchComponent } from './components/partials/search/search.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { FoodService } from './services/food.service';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { MapComponent } from './components/partials/map/map.component';
import { bootstrapApplication } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet, HomeComponent, 
    HeaderComponent, SearchComponent, RouterLink,
    RouterModule, ReactiveFormsModule,
    LoginPageComponent, LoadingComponent, MapComponent,  
    ToastrModule
  ],
  
  providers: [FoodService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  ngOnInit(): void {
  }
/*   //Toastr PRUEBA PENDIENTE
  constructor (private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }  */
}

/* //Componente de Toastr - OJO
bootstrapApplication(AppComponent, {
  providers: [
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }), 
  ]
});
 */