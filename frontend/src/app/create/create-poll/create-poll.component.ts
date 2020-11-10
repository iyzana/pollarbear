import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PollCreate } from '../../model/poll-create';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
})
export class CreatePollComponent implements OnInit {
  now = new Date().toISOString().split('T')[0];

  form: FormGroup;
  advanced = false;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      selectKind: new FormControl('Single'),
      secrecyKind: new FormControl('Open'),
      optionKind: new FormControl('YesNo'),
      summaryKind: new FormGroup({
        cutoffKind: new FormControl('Top'),
        cutoffValueTop: new FormControl(3, [
          Validators.required,
          Validators.min(0),
        ]),
        cutoffValueTopPercent: new FormControl(90, [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ]),
      }),
      deadline: new FormControl(),
    });
  }

  next() {
    const input = this.form.value;
    const pollCreate: Partial<PollCreate> = {
      ...input,
      summaryKind: {
        cutoffKind: input.summaryKind.cutoffKind,
        cutoffValue:
          input.summaryKind.cutoffKind === 'Top'
            ? input.summaryKind.cutoffValueTop
            : input.summaryKind.cutoffValueTopPercent,
      },
    };
    localStorage.setItem('createPoll', JSON.stringify(pollCreate));
  }
}
