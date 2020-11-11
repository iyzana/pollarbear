import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOptionsComponent } from './create-options/create-options.component';
import { DateOptionsComponent } from './create-options/date-options/date-options.component';
import { SimpleOptionsComponent } from './create-options/simple-options/simple-options.component';
import { CreatePollComponent } from './create-poll/create-poll.component';

const routes: Routes = [
  { path: 'poll', component: CreatePollComponent },
  {
    path: 'options',
    component: CreateOptionsComponent,
    children: [
      { path: 'date', component: DateOptionsComponent },
      { path: '', component: SimpleOptionsComponent },
    ],
  },
  { path: '', redirectTo: 'poll', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRoutingModule {}
