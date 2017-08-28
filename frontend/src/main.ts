import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AuthenticationService } from './app/authentication.service';

if (environment.production) {
  enableProdMode();
}


AuthenticationService.init({ onLoad: 'login-required', checkLoginIframeInterval: 1 })
  .then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule);
  })
  .catch((e: string) => {
    console.log('Error in ng2 bootstrap: ' + e);
  });
