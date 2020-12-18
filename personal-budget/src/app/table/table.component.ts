import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { AddComponent } from '../dialogs/add/add.component'
import { EditComponent } from '../dialogs/edit/edit.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { Issue } from '../models/issue';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pb-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns = ['title', 'budget', 'color', 'expense', 'month', 'actions'];
  // exampleDatabase: DataService | null;
  dataSource = this.dataService.TableData;
  index: number;
  id: string;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: DataService) {
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngOnInit(): void {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddComponent, {
      data: { issue: Issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.dataService.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, _id: string, title: string, budget: string, color: string, expense: string, month: string) {
    this.id = _id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(_id);
    const dialogRef = this.dialog.open(EditComponent, {
      data: { id: _id, title: title, budget: budget, color: color, expense: expense, month: month }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.dataService.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.dataService.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: string, title: string, budget: string, color: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { id: id, title: title, budget: budget, color: color }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.dataService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.dataService.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    // this.paginator._changePageSize(this.paginator.pageSize);
    this.loadData();
  }


  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/



  public loadData() {
    //   this.dataService = new DataService(this.httpClient);
    //   this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    //   fromEvent(this.filter.nativeElement, 'keyup')
    //     // .debounceTime(150)
    //     // .distinctUntilChanged()
    //     .subscribe(() => {
    //       if (!this.dataSource) {
    //         return;
    //       }
    //       this.dataSource.filter = this.filter.nativeElement.value;
    //     });
    // }

    this.dataService.GetBudgetData().then(res => {
      this.dataSource = this.dataService.TableData;
    });
  }
}

// export class ExampleDataSource extends DataSource<Issue> {
//   _filterChange = new BehaviorSubject('');

//   get filter(): string {
//     return this._filterChange.value;
//   }

//   set filter(filter: string) {
//     this._filterChange.next(filter);
//   }

//   filteredData: Issue[] = [];
//   renderedData: Issue[] = [];

//   constructor(public _exampleDatabase: DataService,
//     public _paginator: MatPaginator,
//     public _sort: MatSort) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<Issue[]> {
//     // Listen for any changes in the base data, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._sort.sortChange,
//       this._filterChange,
//       this._paginator.page
//     ];

//     this._exampleDatabase.getAllIssues();


//     return merge(...displayDataChanges).pipe(map(() => {
//       // Filter data
//       this.filteredData = this._exampleDatabase.data.slice().filter((issue: Issue) => {
//         const searchStr = (issue.id + issue.title + issue.month).toLowerCase();
//         return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//       });

//       // Sort filtered data
//       const sortedData = this.sortData(this.filteredData.slice());

//       // Grab the page's slice of the filtered sorted data.
//       const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//       this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
//       return this.renderedData;
//     }
//     ));
//   }

//   disconnect() { }


//   /** Returns a sorted copy of the database data. */
//   sortData(data: Issue[]): Issue[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';

//       switch (this._sort.active) {
//         case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
//         case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
//         case 'budget': [propertyA, propertyB] = [a.budget, b.budget]; break;
//         case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
//         case 'expense': [propertyA, propertyB] = [a.expense, b.expense]; break;
//         case 'month': [propertyA, propertyB] = [a.month, b.month]; break;
//       }

//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//       return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
//     });
//   }
// }

// this.dataService.getTableData()
//     .subscribe((res: any) => {
//       this.TABLE_DATA = res;
//       this.dataSource = new MatTableDataSource<TableData>(this.TABLE_DATA);
//     });
