import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PollResolver } from './poll-resolver';
import { VoteComponent } from './vote.component';

const routes: Routes = [
  { path: ':id', component: VoteComponent, resolve: { poll: PollResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteRoutingModule {}
