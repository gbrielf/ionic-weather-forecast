import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// A OpenWeather não aceita JWT no cabeçalho. Ela espera a chave apenas na URL (&appid=...).
// Quando você envia um cabeçalho customizado que a API não conhece, o navegador faz uma pergunta prévia (Preflight) que a OpenWeather rejeita, gerando o erro de CORS.

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Removido o clone com Headers para não causar erro de CORS na OpenWeather
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        alert('Chave da API inválida! Verifique o arquivo environment.');
      } else if (error.status === 0) {
        alert('Erro de CORS ou Conexão: O navegador bloqueou a requisição ou a API está fora.');
      }
      return throwError(() => error);
    })
  );
};

// Sem Headers Extras: Ao remover o Authorization, a requisição volta a ser uma chamada simples que a OpenWeather aceita sem travar no CORS.

// Quando eu fui executar primeira vez deu um erro de "Tratamento Global": um "Erro de Conexão" que veio justamente do catchError configurado. Ou seja: o Interceptor estava funcionando perfeitamente porém foi preciso tirar o "excesso de bagagem" (o token) que a API não entende.

// Interceptor na nova versão:
// - Possui o auth.interceptor.ts apenas com o catchError.
// - Verifique se a URL do WeatherService não tem barras duplas (ex: data/3.0//onecall). A imagem mostra 3.0//, o que também pode quebrar a rota.