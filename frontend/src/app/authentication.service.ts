/// <reference path="../../node_modules/keycloak-js/dist/keycloak.d.ts"/>

import { Injectable } from '@angular/core';

declare var require: any;

var Keycloak = require('../../node_modules/keycloak-js/dist/keycloak');

type KeycloakClient = KeycloakModule.KeycloakClient;
type KeycloakPromise = KeycloakModule.Promise;

@Injectable()
export class AuthenticationService {

  static keycloak: KeycloakClient = Keycloak();

  static init(options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      AuthenticationService.keycloak.init(options)
        .success(() => {
          resolve();
        })
        .error((errorData: any) => {
          reject(errorData);
        });
    });
  }

  authenticated(): boolean {
    return AuthenticationService.keycloak.authenticated;
  }

  login(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      AuthenticationService.keycloak.login()
        .success(() => resolve(true))
        .error(() => reject(false));
    });
  }

  logout(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      AuthenticationService.keycloak.logout()
        .success(() => resolve(true))
        .error(() => reject(false));
    });
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (AuthenticationService.keycloak.token) {
        AuthenticationService.keycloak
          .updateToken(5)
          .success(() => {
            resolve(<string>AuthenticationService.keycloak.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not loggen in');
      }
    });
  }

}
