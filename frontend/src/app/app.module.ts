import { AuthenticationService } from './authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { APP_HTTP_PROVIDER } from './app-http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthenticationService,
    APP_HTTP_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
