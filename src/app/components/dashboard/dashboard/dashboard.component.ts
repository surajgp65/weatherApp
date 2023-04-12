import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/common-services/http-request.service';

interface weatherCast {
  location: {
    name: string;
    region: string;
    localtime: Date;
    country: string;
  };
  current: {
    condition: {
      icon: string;
    };
    humidity: number;
    last_updated: Date;
    temp_c: number;
    temp_f: number;
    wind_dir: string;
    wind_kph: number;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  weatherData: weatherCast;
  isCelsius: boolean = true;
  cityName: string = 'Mumbai';
  foreCastData: any;

  constructor(private route: Router, private http: HttpRequestService) {}

  ngOnInit(): void {
    this.getWeatherDetails();
    this.getForeCastData();
  }

  submitDetails() {
    this.getWeatherDetails();
    this.getForeCastData();
  }

  // get initial data
  getWeatherDetails() {
    this.http
      .request('get', 'current.json', null, this.cityName, null)
      .subscribe(
        (res) => {
          this.weatherData = res;
        },
        (error) => {}
      );
  }

  getForeCastData() {
    this.http
      .request('get', 'forecast.json', null, this.cityName, '3')
      .subscribe(
        (res) => {
          this.foreCastData = res.forecast.forecastday;
          console.log(' this.foreCastData', this.foreCastData);
        },
        (error) => {}
      );
  }

  // chehck wheater is it celcius or not
  isCelsiusCheck(val: boolean) {
    if (val) {
      this.isCelsius = true;
    } else {
      this.isCelsius = false;
    }
  }

  // store the search data
  searInput(val: string) {
    this.cityName = val;
  }
}
