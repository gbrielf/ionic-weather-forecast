import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.models';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl: string = environment.apiBaseUrl;
  private apiKey: string = environment.apiKeyOpenWeather;

  constructor(private http: HttpClient){}

  getWeather(lat: number, lon: number){  
    const url = `${this.apiUrl}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly&lang=pt_br&appid=${this.apiKey}`
    return this.http.get<WeatherData>(url);
  }
}
