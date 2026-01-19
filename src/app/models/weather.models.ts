export interface WeatherData{
    current: {
        temp: number;
        feels_like: number;
        sunrise: number;
        sunset: number;
        humidity: number;
        pressure: number;
        wind_speed: number;
        wind_deg: number;
        uvi: number;
        weather: {description: string; icon: string}[];
    };
    hourly?: any[]; //Opcional, caso queira usar depois
}