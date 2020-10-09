import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#ffcd56",
          "#ff6384",
          "#36a2eb",
          "#fd6b19",
          "#99ff33",
          "#ff9900",
          "#00ffcc",
          "#99ff99",
          "#cc66ff",
          "#cc6699",
          "#3366cc",
          "#660066",
        ],
      },
    ],
    labels: [],
  };
  public data = [];

  constructor() { }
}
