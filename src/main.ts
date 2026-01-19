import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app.config';

// com a criação do app.config.ts o main.ts tem a única função de dar "a partida" no sistema usando as definições do config
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Tal abordagem implica em:
// - Modularidade Funcional: não preciso mais declarar componentes aqui, se torna auto-gerenciável
// - Performance: Uma vez que o Angular remove do código final qualquer funcionalidade HttpClient não usada, pois o provideHttpClient é altamente otimizado
// - Clean Code: O mais.ts fica extremamente limpo, caso preciso adicionar bibliotecas globais elas vão para o app.config