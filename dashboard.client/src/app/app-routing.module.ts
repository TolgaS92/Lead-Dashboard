import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';

const routes: Routes = [
  { path: '', component: LeadListComponent },
  { path: 'lead/:id', component: LeadDetailComponent }  // This handles dynamic lead detail pages
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
