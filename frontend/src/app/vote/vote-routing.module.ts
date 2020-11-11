import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteComponent } from './vote.component';

const routes: Routes = [{ path: ':id', component: VoteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteRoutingModule {}
