/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'ng2-i18next': 'vendor/ng2-i18next',
  'ng2-modal': 'vendor/ng2-modal'
};

/** User packages configuration. */
const packages: any = {
  'vendor/ng2-i18next': {
    format: 'cjs',
    defaultExtension: 'js'
  },
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
