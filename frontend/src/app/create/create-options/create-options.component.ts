import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerKind } from '../../model/enum/answer-kind';
import { CreateService } from '../create.service';

@Component({
  selector: 'app-create-options',
  templateUrl: './create-options.component.html',
  styleUrls: ['./create-options.component.scss'],
})
export class CreateOptionsComponent implements OnInit {
  title: string;

  constructor(public router: Router, private createService: CreateService) {}

  ngOnInit(): void {
    const poll = this.createService.getPollInCreation();
    if (poll.answerKind === AnswerKind.Date) {
      this.router.navigate(['create', 'options', 'date'], {
        skipLocationChange: true,
      });
    }
    this.title = poll.title;
  }
}
