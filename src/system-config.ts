/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'ng2-i18next': 'vendor/ng2-i18next',
  'i18next': 'vendor/i18next/i18next.min.js',
  'i18nextXHRBackend': 'vendor/i18next-xhr-backend/i18nextXHRBackend.min.js',
  'i18nextBrowserLanguageDetector': 'vendor/i18next-browser-languagedetector/i18nextBrowserLanguageDetector.min.js',
  'ng2-modal': 'vendor/ng2-modal'
};

/** User packages configuration. */
const packages: any = {
  'vendor/ng2-i18next': {
    format: 'cjs',
    defaultExtension: 'js'
  },
  'i18next': { format: 'global' },
  'i18nextXHRBackend': { format: 'global' },
  'i18nextBrowserLanguageDetector': { format: 'global' },
  'ng2-modal': {
    main: 'index.js',
    defaultExtension: 'js'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/square',
  'app/chrono',
  'app/menu',
  'app/menu-scores',
  'app/menu-leaderboards',
  'app/menu-about',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
