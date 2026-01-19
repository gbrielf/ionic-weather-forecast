import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PressurePipe } from "src/app/pressure-pipe";
import { ToSecondsPipe } from "src/app/to-seconds-pipe";
import { WeatherData } from "src/app/models/weather.models";


// WeatherCard (Filho): Tem "caixas" vazias esperando a informação (@Input() weatherData).
@Component({
    selector: 'app-weather-card',
    templateUrl: './WeatherCard.html', //usar sempre o caminho relativo em componentes
    standalone: true,
    imports: [CommonModule, PressurePipe, ToSecondsPipe]
})
export class WeatherCardComponent{
    @Input() weatherData! : WeatherData;
    @Input() cidadeNome: string = ''; //Recebe o nome da cidade para exibir no topo
}