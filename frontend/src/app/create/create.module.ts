import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { CreateOptionsComponent } from './create-options/create-options.component';
import { SimpleOptionsComponent } from './create-options/simple-options/simple-options.component';
import { DateOptionsComponent } from './create-options/date-options/date-options.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreatePollComponent,
    CreateOptionsComponent,
    SimpleOptionsComponent,
    DateOptionsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, CreateRoutingModule],
})
export class CreateModule {}
