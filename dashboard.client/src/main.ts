import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Bootstrap the Angular application with the AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => {
    // Log any errors that occur during the bootstrap process
    console.error('Error during bootstrapping the app:', err);
  });
