import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// initial component loaded list..
import { AppComponent } from './app.component';

// import { HeaderComponent } from './common-components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpErrorInterceptorInterceptor } from './common-services/http-error-interceptor.interceptor';
// extra module for initial compoents
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { DaysAgoPipe } from './common-pipes/days-ago.pipe';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    DaysAgoPipe,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
