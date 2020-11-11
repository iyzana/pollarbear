import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteRoutingModule } from './vote-routing.module';
import { VoteComponent } from './vote.component';

@NgModule({
  declarations: [VoteComponent],
  imports: [CommonModule, VoteRoutingModule],
})
export class VoteModule {}
