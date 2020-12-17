import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rejects } from 'assert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: ["#ffcd56",
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
          "#660066"],
      },
    ],
    labels: [],
  };
  public dataSourceChart2 = {
    datasets: [
      {
        label: "Total Expense",
        data: [],
        backgroundColor: "rgba(90,255,132)",
        borderColor: "rgba(90,255,132)",
        fill: false
      },
      {
        label: "Total Budget",
        data: [],
        backgroundColor: "rgba(255,99,132)",
        borderColor: "rgba(255,99,132)",
        fill: false
      }
    ],
    labels: [],
  };
  public data = [];

  constructor(private http: HttpClient, private router: Router) { }

  public GetBudgetData() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/budget')
        .subscribe((res: any) => {
          this.dataSource = {
            datasets: [
              {
                data: [],
                backgroundColor: ["#ffcd56",
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
                  "#660066"],
              },
            ],
            labels: [],
          };
          this.dataSourceChart2 = {
            datasets: [
              {
                label: "Total Expense",
                data: [],
                backgroundColor: "rgba(90,255,132)",
                borderColor: "rgba(90,255,132)",
                fill: false
              },
              {
                label: "Total Budget",
                data: [],
                backgroundColor: "rgba(255,99,132)",
                borderColor: "rgba(255,99,132)",
                fill: false
              }
            ],
            labels: [],
          };
          this.data = [];

          var allMonths = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
          res.Chart2Data.sort(function (a, b) {
            return allMonths.indexOf(a._id) - allMonths.indexOf(b._id);
          });
          // console.log(res);

          if (this.dataSource.datasets[0].data.length == 0) {
            for (var i = 0; i < res.Chart2Data.length; i++) {
              this.dataSource.datasets[0].data[i] = res.Chart2Data[i].totalExpense;
              this.dataSource.labels[i] = res.Chart2Data[i]._id;

              this.dataSourceChart2.datasets[0].data[i] = res.Chart2Data[i].totalExpense;
              this.dataSourceChart2.datasets[1].data[i] = res.Chart2Data[i].totalBudget;
              this.dataSourceChart2.labels[i] = res.Chart2Data[i]._id;
            }
            // console.log(this.dataSourceChart2);

          }
          if (this.data.length == 0) {
            for (var i = 0; i < res.Chart1Data.length; i++) {
              var data1 = {};
              data1["key"] = res.Chart1Data[i].title;
              data1["value"] = res.Chart1Data[i].budget;
              this.data.push(data1);
            }
          }
          resolve(this.dataSource);
          return this.dataSource;
        },
          err => {
            alert(err.error);
            this.router.navigate(['/login']);
          });
    })
  }
}
