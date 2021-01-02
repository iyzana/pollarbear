import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ResultsComponent],
  imports: [CommonModule, ResultsRoutingModule, FontAwesomeModule],
})
export class ResultsModule {}
