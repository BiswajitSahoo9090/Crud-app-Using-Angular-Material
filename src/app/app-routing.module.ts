import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';

const routes: Routes = [
  {
    path:'emp-add-edit',
    component:EmpAddEditComponent,title:'MEMBER-MASTER-LIST'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
