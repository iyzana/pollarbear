import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerKind } from '../../model/enum/answer-kind';
import { PollCreate } from '../../model/poll-create';

@Component({
  selector: 'app-create-options',
  templateUrl: './create-options.component.html',
  styleUrls: ['./create-options.component.scss'],
})
export class CreateOptionsComponent implements OnInit {
  title: string;

  constructor(public router: Router) {}

  ngOnInit(): void {
    const pollJson = sessionStorage.getItem('pollCreate');
    if (!pollJson) {
      this.router.navigate(['/create']);
      return;
    }
    const poll: PollCreate = JSON.parse(pollJson);
    if (poll.answerKind === AnswerKind.Date) {
      this.router.navigate(['create', 'options', 'date'], {
        skipLocationChange: true,
      });
    }
    this.title = poll.title;
  }
}
