import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent, routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { bootstrapApplication } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideHttpClient(), 
    provideAnimations(), provideToastr()]
};

/* bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ]
}); */