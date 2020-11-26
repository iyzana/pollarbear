import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteRoutingModule } from './vote-routing.module';
import { VoteComponent } from './vote.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VoteComponent],
  imports: [CommonModule, ReactiveFormsModule, VoteRoutingModule],
})
export class VoteModule {}
