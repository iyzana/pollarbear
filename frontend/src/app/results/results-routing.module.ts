import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollResolver } from '../poll-resolver';

import { ResultsComponent } from './results.component';

const routes: Routes = [
  { path: ':id', component: ResultsComponent, resolve: { poll: PollResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultsRoutingModule {}
