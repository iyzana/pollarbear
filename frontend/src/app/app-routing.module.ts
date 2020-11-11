import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'vote',
    loadChildren: () => import('./vote/vote.module').then((m) => m.VoteModule),
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./results/results.module').then((m) => m.ResultsModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
  },
  { path: '', redirectTo: 'create', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
