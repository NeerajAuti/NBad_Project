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
        backgroundColor: [],
      },
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
                backgroundColor: [],
              },
            ],
            labels: [],
          };
          this.data = [];
          // console.log(res);
          if (this.dataSource.datasets[0].data.length == 0) {
            for (var i = 0; i < res.length; i++) {
              this.dataSource.datasets[0].data[i] = res[i].budget;
              this.dataSource.labels[i] = res[i].title;
              this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
            }
          }
          if (this.data.length == 0) {
            for (var i = 0; i < res.length; i++) {
              var data1 = {};
              data1["key"] = res[i].title;
              data1["value"] = res[i].budget;
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
