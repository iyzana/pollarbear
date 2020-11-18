import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerKind } from '../../model/enum/answer-kind';
import { CutoffKind } from '../../model/enum/cutoff-kind';
import { OptionKind } from '../../model/enum/option-kind';
import { SecrecyKind } from '../../model/enum/secrecy-kind';
import { SelectKind } from '../../model/enum/select-kind';
import { PollCreate } from '../../model/poll-create';
import { CreateService } from '../create.service';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
})
export class CreatePollComponent implements OnInit {
  now = new Date().toISOString().split('T')[0];

  form: FormGroup;
  advanced = false;

  constructor(private createService: CreateService) {}

  ngOnInit(): void {
    const restore = this.createService.getPollInCreation();

    this.form = new FormGroup({
      title: new FormControl(restore?.title || '', Validators.required),
      selectKind: new FormControl(restore?.selectKind || SelectKind.Single),
      secrecyKind: new FormControl(restore?.secrecyKind || SecrecyKind.Open),
      optionKind: new FormControl(restore?.optionKind || OptionKind.YesNo),
      summaryKind: new FormGroup({
        cutoffKind: new FormControl(
          restore?.summaryKind.cutoffKind || CutoffKind.Top,
        ),
        cutoffValueTop: new FormControl(
          restore === null || restore.summaryKind.cutoffKind !== CutoffKind.Top
            ? 3
            : restore.summaryKind.cutoffValue,
          [Validators.required, Validators.min(0)],
        ),
        cutoffValueTopPercent: new FormControl(
          restore === null ||
          restore.summaryKind.cutoffKind !== CutoffKind.TopPercent
            ? 90
            : restore.summaryKind.cutoffValue,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ),
      }),
      deadline: new FormControl(restore?.deadline),
    });

    this.form.valueChanges.subscribe(() => {
      this.createService.setPollInCreation(this.getPollCreate());
    });
  }

  getPollCreate(): PollCreate {
    const input = this.form.value;
    return {
      answerKind: AnswerKind.Simple,
      options: [],
      ...input,
      summaryKind: {
        cutoffKind: input.summaryKind.cutoffKind,
        cutoffValue:
          input.summaryKind.cutoffKind === 'Top'
            ? input.summaryKind.cutoffValueTop
            : input.summaryKind.cutoffValueTopPercent,
      },
    };
  }
}
