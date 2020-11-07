import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoiceRoutingModule } from './choice-routing.module';
import { ChoiceComponent } from './choice.component';

@NgModule({
  declarations: [ChoiceComponent],
  imports: [CommonModule, ChoiceRoutingModule],
})
export class ChoiceModule {}
