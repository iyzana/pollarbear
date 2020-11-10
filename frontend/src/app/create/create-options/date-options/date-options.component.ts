import { Component, OnInit } from '@angular/core';
import { AnswerKind } from '../../../model/enum/answer-kind';
import { PollCreate } from '../../../model/poll-create';

@Component({
  selector: 'app-date-options',
  templateUrl: './date-options.component.html',
  styleUrls: ['./date-options.component.scss'],
})
export class DateOptionsComponent implements OnInit {
  poll: PollCreate;

  constructor() {}

  ngOnInit(): void {
    this.poll = {
      ...JSON.parse(localStorage.getItem('pollCreate')),
      answerKind: AnswerKind.Simple,
      options: [],
    };
  }
}
