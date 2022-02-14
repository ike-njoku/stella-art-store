// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
//
export const environment = {
  apiBaseUrl: 'http://localhost:3000',
  authTokenUrl: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
  payUrl: 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
  paypalParams: 'QVp3TENOYnFDd2Q5aF9QeUd6Sk5SRkFYYkJuMVgyYVVVMWppOV9jUXdOOXFLRV9sbDVXMkQzaW1od08yTHk1czRuMlNOU09WQ19zMXJnWk86RVBZOWR5dlJUTEFlYXQwbzhfQ2RuYUJwT1B2S2RyRjM2eDdCSWlFaGFkclkwVWNqWTRVLXJYUUw5Zkc1SzA5QWgtbmViLUpIZjQ5R0I2eWY=',
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
