import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { RouteReuseStrategy } from "@angular/router";
import { IonicRouteStrategy } from "@ionic/angular";
import { routes } from './app/app.routes'
import { authInterceptor } from "./app/interceptors/auth.interceptor";


export const appConfig: ApplicationConfig = {
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        provideRouter(routes), //configuração das minhas rotas do arquivo app.route.ts
        provideHttpClient(
            withInterceptors([authInterceptor]) // Registro do "fiscal" de rotaso authInterceptor
        ),
    ],
};