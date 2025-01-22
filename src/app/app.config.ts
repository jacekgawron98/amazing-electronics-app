import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';

const TOKEN = environment.API_KEY;

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideApollo(() => {
      const httpLink = inject(HttpLink);
      const http = httpLink.create({
        uri: environment.API_URL,
      });

      const middleware = new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${TOKEN || null}`,
          ),
        });
        return forward(operation);
      });

      const link = middleware.concat(http)

      return {
        link, 
        cache: new InMemoryCache(),
      };
    }), provideAnimationsAsync()]
};
