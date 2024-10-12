import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './services/employee.service';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator; //don't worry copy from angularmaterial use of mattable
  @ViewChild(MatSort) sort !: MatSort;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) { }
  ngOnInit(): void {
    this.getEmployeeList();
  }


  openAddEditEmpForm() {
    const DialogRef = this._dialog.open(EmpAddEditComponent); // const DialogRef = bcz of connect app to employee
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) { //if it is true it will refesh the list if it is false it will not refesh
          this.getEmployeeList();
        }
      },
    })
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res); //show data in table
        this.dataSource.sort = this.sort;   //show table
        this.dataSource.paginator = this.paginator; //show table
      },
      error: (err) => { //  this two line same as
        console.log(err); // error:console.log,
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); //copy from angular material bcz of show table
    }
  }
  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee Deleted', 'done');
        this.getEmployeeList(); //refresh the page and show data
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    const DialogRef = this._dialog.open(EmpAddEditComponent, {
      data: data
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    })

  }
}


