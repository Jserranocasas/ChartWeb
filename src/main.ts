import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'anychart/dist/js/anychart-base.min.js';
import 'anychart/dist/js/anychart-ui.min.js';
import 'anychart/dist/js/anychart-exports.min.js';
import 'anychart/dist/js/anychart-cartesian-3d.min.js';
import 'anychart/dist/themes/dark_provence.min.js';
import 'anychart/dist/themes/dark_glamour.min.js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
