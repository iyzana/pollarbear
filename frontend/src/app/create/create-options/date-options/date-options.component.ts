import { Component, OnInit } from '@angular/core';
import { AnswerKind } from '../../../model/enum/answer-kind';
import { PollCreate } from '../../../model/poll-create';
import { CreateService } from '../../create.service';

@Component({
  selector: 'app-date-options',
  templateUrl: './date-options.component.html',
  styleUrls: ['./date-options.component.scss'],
})
export class DateOptionsComponent implements OnInit {
  constructor(private createService: CreateService) {}

  ngOnInit(): void {
    const pollCreate: PollCreate = this.createService.getPollInCreation();
    pollCreate.answerKind = AnswerKind.Date;
    this.createService.setPollInCreation(pollCreate);
  }
}
