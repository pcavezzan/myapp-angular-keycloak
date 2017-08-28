import { Injectable } from '@angular/core';
import { Http, Request, XHRBackend, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Rx';


/**
 * This provides a wrapper over the ng2 Http class that insures tokens are refreshed on each request.
 * 
 * Take from keycloak quickstart (https://github.com/keycloak/keycloak-quickstarts/blob/latest/app-angular2/src/main/webapp/app/keycloak-service/keycloak.http.ts)
 */
export class AppHttp extends Http {
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions, private _authenticationService: AuthenticationService) {
        super(_backend, _defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if (!this._authenticationService.authenticated()) return super.request(url, options);

        const tokenPromise: Promise<string> = this._authenticationService.getToken();
        const tokenObservable: Observable<string> = Observable.fromPromise(tokenPromise);

        if (typeof url === 'string') {
            return tokenObservable.map(token => {
                const authOptions = new RequestOptions({ headers: new Headers({ 'Authorization': 'Bearer ' + token }) });
                return new RequestOptions().merge(options).merge(authOptions);
            }).concatMap(opts => super.request(url, opts));
        } else if (url instanceof Request) {
            return tokenObservable.map(token => {
                url.headers.set('Authorization', 'Bearer ' + token);
                return url;
            }).concatMap(request => super.request(request));
        }
    }
}

export function appHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, authenticationService: AuthenticationService) {
    return new AppHttp(backend, defaultOptions, authenticationService);
}

export const APP_HTTP_PROVIDER = {
    provide: Http,
    useFactory: appHttpFactory,
    deps: [XHRBackend, RequestOptions, AuthenticationService]
};
