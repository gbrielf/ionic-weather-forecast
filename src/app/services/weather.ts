import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  apiKey = 'e01c6ca40239db7b991e2e1e38541dcd';

  constructor(private http: HttpClient){}
  getWeather(lat: number, lon: number){
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly&lang=pt_br&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
