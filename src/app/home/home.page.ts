import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation'; // Certifique-se que este import está aqui
import { 
  IonContent, IonSelect, IonSelectOption, 
  IonCardSubtitle, IonCardTitle,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherCardComponent } from '../components/WeatherCard/WeatherCard';
import { WeatherData } from '../models/weather.models';
import { WeatherService } from '../services/weather';


// HomePage (Pai): Tem a informação (dadosTempo).
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonSelect, IonSelectOption,  
    IonCardSubtitle, IonCardTitle, CommonModule, FormsModule,
    WeatherCardComponent
  ],
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
  carregado: boolean = false;

  constructor(private weather: WeatherService) {}

  async ngOnInit() {
    const { value } = await Preferences.get({ key: 'ultimaCidade' });
    if (value) {
      const salva = JSON.parse(value);
      this.cidadeSelecionada = this.cidades.find(c => c.nome === salva.nome) || salva;
      this.buscarTempo();
    }
  }

  async buscarLocalizacaoAtual() {
    try {
      this.carregado = false;

      // Tenta primeiro a API nativa do navegador se o Capacitor falhar silenciosamente
      if (!navigator.geolocation) {
        alert('Geolocalização não suportada pelo seu navegador.');
        return;
      }

      // No ambiente Web (browser), o Geolocation.requestPermissions() 
      // pode ser ignorado. Vamos usar a chamada direta:
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000 // 10 segundos para não travar
      });
      
      this.cidadeSelecionada = { 
        nome: 'Local Atual', 
        lat: coordinates.coords.latitude, 
        lon: coordinates.coords.longitude 
      };

      this.buscarTempo();
      
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      this.carregado = true;
      
      if (error.code === 1) { // Código 1 é "Permission Denied"
        alert('Permissão negada. Verifique se o GPS está ativo e se o site tem permissão nas configurações do Chrome.');
      } else {
        alert('Erro ao obter localização: ' + error.message);
      }
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
      next: (res: any) => {
        this.dadosTempo = res;
        // Se pegamos pelo GPS, a API nos diz o nome real da cidade
        if (this.cidadeSelecionada.nome === 'Local Atual') {
          this.cidadeSelecionada.nome = res.name || 'Localização Detectada';
        }
        this.carregado = true;
      },
      error: (err) => {
        console.error(err);
        this.carregado = true;
      }
    });
  }
}