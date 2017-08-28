import { Component, OnInit } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  template: `
  <h1>
    {{title}}
  </h1>
  <p>
    <button *ngIf="authenticated" name="logoutBtn" (click)="logout()">Logout</button>
  </p>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'app works!';


  constructor(private http: Http, private authenticationService :AuthenticationService) { }

  get authenticated() :boolean {
    return this.authenticationService.authenticated();
  }

  ngOnInit(): void {
    this.http
      .get('api')
      .toPromise()
      .then(response => {
        this.title = response.text();
      }).catch(this.handleError);
  }

  logout() :void {
    this.authenticationService.logout();
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}
