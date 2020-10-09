import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

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

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
        this.data[res.myBudget[i].title] = res.myBudget[i].budget;
      }
      this.createChart();
      // create_d3jsChart(data);
    });
  }
  createChart() {
      console.log(this.dataSource);
    var ctx = document.getElementById("myChart");
    console.log(ctx);

    var myPieChart = new Chart(ctx, {
      type: "pie",
      data: this.dataSource,
    });
    console.log(myPieChart);

  }
}
