import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation';

import { WeatherCardComponent } from '../components/WeatherCard/WeatherCard';
import { WeatherService } from '../services/weather';
import { WeatherData } from '../models/weather.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WeatherCardComponent
  ],
  templateUrl: '/home.page.html',
  styleUrls: ['/home.page.scss'],
})
export class HomePage implements OnInit {
  cidades = [
    { nome: 'Natal', lat: -5.7945, lon: -35.211 },
    { nome: 'São Paulo', lat: -23.5505, lon: -46.6333 },
    { nome: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
    { nome: 'Lisboa', lat: 38.7223, lon: -9.1393 }
  ];

  dadosTempo!: WeatherData;
  cidadeSelecionada: any;
  carregado = false;

  constructor(private weather: WeatherService) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'ultimaCidade' });
    if (value) {
      this.cidadeSelecionada = JSON.parse(value);
      this.buscarTempo();
    }
  }

  async buscarTempo() {
    if (!this.cidadeSelecionada) return;

    this.carregado = false;

    await Preferences.set({
      key: 'ultimaCidade',
      value: JSON.stringify(this.cidadeSelecionada),
    });

    const { lat, lon } = this.cidadeSelecionada;

    this.weather.getWeather(lat, lon).subscribe({
      next: (res) => {
        this.dadosTempo = res;
        this.carregado = true;
      },
      error: () => {
        this.carregado = true;
      },
    });
  }
}
