import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AnswerKind } from '../../../model/enum/answer-kind';
import { PollCreate } from '../../../model/poll-create';

@Component({
  selector: 'app-simple-options',
  templateUrl: './simple-options.component.html',
  styleUrls: ['./simple-options.component.scss'],
})
export class SimpleOptionsComponent implements OnInit {
  form: FormGroup;
  poll: PollCreate;

  constructor() {}

  ngOnInit(): void {
    this.poll = {
      options: [],
      ...JSON.parse(localStorage.getItem('pollCreate')),
      answerKind: AnswerKind.Simple,
    };
    this.poll.options.push({ text: '' });

    this.form = new FormGroup({
      options: new FormArray(
        this.poll.options.map((option) => new FormControl(option.text)),
      ),
    });
    this.form.valueChanges.subscribe((newValues) => {
      const options = newValues.options;
      if (options[options.length - 1] !== '') {
        this.options.push(new FormControl(''));
      }
      if (
        options.length > 1 &&
        options[options.length - 2] === '' &&
        options[options.length - 1] === ''
      ) {
        this.options.removeAt(options.length - 1);
      }
    });
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }
}
