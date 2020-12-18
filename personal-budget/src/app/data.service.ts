import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { rejects } from 'assert';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Issue } from './models/issue';
import { Chart } from 'chart.js';

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
  public Chartdata = [];
  public TableData = [];
  public UserName;
  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private http: HttpClient, @Optional() private router?: Router) { }

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
          this.Chartdata = [];
          this.TableData = res.Chart1Data;
          this.UserName = res.UserName;
          // console.log(this.UserName);
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
          if (this.Chartdata.length == 0) {
            for (var i = 0; i < res.Chart1Data.length; i++) {
              var data1 = {};
              data1["key"] = res.Chart1Data[i].title;
              data1["value"] = res.Chart1Data[i].budget;
              this.Chartdata.push(data1);
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

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.http.get<Issue[]>("http://localhost:3000/budget").subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  addIssue(issue: Issue): void {
    this.dialogData = issue;
    var data = {
      title: issue.title,
      budget: issue.budget,
      color: issue.color,
      username: this.UserName,
      expense: issue.expense,
      month: issue.month
    }

    this.http.post('http://localhost:3000/budget/add', data)
      .subscribe((res: any) => {
        console.log("result:" + res);
      }, error => {
        console.log(error);
      });
  }

  updateIssue(issue: Issue): void {
    this.dialogData = issue;
    var data = {
      id: issue.id,
      title: issue.title,
      budget: issue.budget,
      color: issue.color,
      username: this.UserName,
      expense: issue.expense,
      month: issue.month
    }
    console.log(issue);

    this.http.post('http://localhost:3000/budget/update', data)
      .subscribe((res: any) => {
        console.log("result:" + res);
      }, error => {
        console.log(error);
      });
  }

  deleteIssue(id): void {
    console.log(id);
    this.http.post('http://localhost:3000/budget/delete', { id })
      .subscribe((res: any) => {
        console.log("result:" + res);
      }, error => {
        console.log(error);
      });
  }
}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:
    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }
    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/

