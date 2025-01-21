import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpHeaders, provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';

const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzczMTQ1NTUsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY202M2Jwb2hyMDFldjA3dzI3amsxeHFidi9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiNmY2OTdlYjItZGQ5YS00YWE1LTkxOWUtYWIxYjg1M2UyOGUyIiwianRpIjoiY202NDA4YWR2MHcwdTA3bDdjcGxzNWRoYSJ9.Wrmo043Pr9pMiG9iBW7RT_vLVBlcTXC-D_WsN8O3n-0Em3vAXfrUcbQdraDZgFQq2_FApBu-KpIPUyMwLq70To7fTtksQed09QBig2X0U9rsO78gWgBF0TS-yVsJLm_OuVyRMWxy2sT2BzTo7OP_w_LwThCtLxysPe3AMCVFNPVdud7V_zBfcan78n8Tm1LlR6BzER0fZxDAZADCGo1g1ln55IE9bTsDGCtb8APTagEnRYkIaldqYUA9TMztkV8xxB64abKwfKIhTAJHj0NIdGhJ7KCQzY-Dt-St8IuJLyoWNDhW9Y0s_ASD6Qcsm22d9-dHz0Z0JS1FHM5SRljld5Blzre82C-Iyy4Eer7rAKdHa5YHrWFfBR7SAA9YHJKOblCILJ0wE-5nwN8w0Hy5hJYa2j_oDTpGGHsxkgptqW5fc7zAbs8zXyBIs8Ir2uB78ilxyKKH6BQ85hoysrETV-pSMPiuTbUl2DOQ8peCuAefnnoTBrW0aID3m_hc_Dmw6nDlzskaRvCzldTg4P1ROj6UdIpFEBmkfYHUVSHATvNdtJL7LUt-2_PZRArDXAIGaLp8E_zDFsu_rM62JOQ_ZCSraxbo_klnX6rFB5dJY4MHB-UOfxcb_tcCnvUTqD8HP21LD5_7-aN3QSEs10WKZ8IE8ohf9sGaaeS2kqCRa7s';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideApollo(() => {
      const httpLink = inject(HttpLink);
      const http = httpLink.create({
        uri: 'https://eu-west-2.cdn.hygraph.com/content/cm63bpohr01ev07w27jk1xqbv/master',
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
    })]
};
