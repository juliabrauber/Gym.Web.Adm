// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {  
  oauth: {
    basicAuthentication: {
      username: 'eventos@paycenter.oab.org.br',
      password: '4B-AD-AE-E5-7F-ED-56-10-01-2A-29-62-73-15-8F-5F'
    }
  },
  production: false,
  //serviceUrl: 'https://cs-paycenter-hom.oab.org.br',
  serviceUrl: 'http://localhost:5000'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
