import { Component, OnInit } from '@angular/core';
import { AnswerKind } from '../../../model/enum/answer-kind';
import { PollCreate } from '../../../model/poll-create';

@Component({
  selector: 'app-date-options',
  templateUrl: './date-options.component.html',
  styleUrls: ['./date-options.component.scss'],
})
export class DateOptionsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const poll: PollCreate = JSON.parse(sessionStorage.getItem('pollCreate'));
    poll.answerKind = AnswerKind.Date;
    sessionStorage.setItem('pollCreate', JSON.stringify(poll));
  }
}
